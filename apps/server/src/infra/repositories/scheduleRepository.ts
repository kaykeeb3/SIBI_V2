import prisma from "@/infra/prisma/client";
import { Schedule } from "@/core/domain/entities/scheduleEntity";
import { ScheduleDTO } from "@/application/dtos/scheduleDTO";
import { notifyClients } from "@/infra/socket/server"; // Importar função para notificar via socket

export class ScheduleRepository {
  async createSchedule(data: ScheduleDTO): Promise<Schedule> {
    if (!data.name) {
      throw new Error("Schedule name cannot be empty.");
    }

    const isAvailable = await this.checkEquipmentAvailability(
      data.equipmentId,
      data.quantity
    );
    if (!isAvailable) {
      throw new Error(
        "Insufficient equipment quantity available for scheduling."
      );
    }

    const schedule = await prisma.schedule.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        startDate: data.startDate,
        returnDate: data.returnDate,
        weekDay: data.weekDay,
        equipmentId: data.equipmentId,
        returned: data.returned,
        type: data.type,
      },
    });

    await this.updateEquipmentQuantity(data.equipmentId, -data.quantity);

    return new Schedule(
      schedule.id,
      schedule.name,
      schedule.quantity,
      schedule.startDate,
      schedule.returnDate,
      schedule.weekDay,
      schedule.equipmentId,
      schedule.returned,
      schedule.type || undefined
    );
  }

  async updateSchedule(
    id: number,
    data: Partial<ScheduleDTO>
  ): Promise<Schedule> {
    const existingSchedule = await this.getScheduleById(id);

    // Verifica se o agendamento já foi devolvido
    if (existingSchedule.returned && data.returned) {
      throw new Error("This schedule has already been returned.");
    }

    // Se o agendamento está sendo marcado como devolvido
    if (data.returned) {
      // Atualiza a quantidade do equipamento disponível
      await this.updateEquipmentQuantity(
        existingSchedule.equipmentId,
        existingSchedule.quantity
      );

      // Exclui o agendamento do banco de dados
      await this.deleteSchedule(id);

      // Notifica os clientes via socket sobre a devolução
      notifyClients("scheduleReturned", existingSchedule);

      return existingSchedule;
    }

    // Atualiza o agendamento, se não estiver sendo devolvido
    const schedule = await prisma.schedule.update({ where: { id }, data });

    return new Schedule(
      schedule.id,
      schedule.name,
      schedule.quantity,
      schedule.startDate,
      schedule.returnDate,
      schedule.weekDay,
      schedule.equipmentId,
      schedule.returned,
      schedule.type || undefined
    );
  }

  async checkEquipmentAvailability(
    equipmentId: number,
    quantity: number
  ): Promise<boolean> {
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
    });
    return equipment ? equipment.quantity >= quantity : false;
  }

  async updateEquipmentQuantity(
    equipmentId: number,
    quantityChange: number
  ): Promise<void> {
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: { quantity: { increment: quantityChange } },
    });
  }

  async getAllSchedules(): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany();
    return schedules.map(
      (s) =>
        new Schedule(
          s.id,
          s.name,
          s.quantity,
          s.startDate,
          s.returnDate,
          s.weekDay,
          s.equipmentId,
          s.returned,
          s.type || undefined
        )
    );
  }

  async getScheduleById(id: number): Promise<Schedule> {
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    if (!schedule) throw new Error("Schedule not found");

    return new Schedule(
      schedule.id,
      schedule.name,
      schedule.quantity,
      schedule.startDate,
      schedule.returnDate,
      schedule.weekDay,
      schedule.equipmentId,
      schedule.returned,
      schedule.type || undefined
    );
  }

  async deleteSchedule(id: number): Promise<Schedule> {
    const schedule = await prisma.schedule.delete({ where: { id } });
    return new Schedule(
      schedule.id,
      schedule.name,
      schedule.quantity,
      schedule.startDate,
      schedule.returnDate,
      schedule.weekDay,
      schedule.equipmentId,
      schedule.returned,
      schedule.type || undefined
    );
  }

  async getOverdueSchedules(): Promise<Schedule[]> {
    const currentDate = new Date();
    const schedules = await prisma.schedule.findMany({
      where: {
        returned: false,
        returnDate: {
          lt: currentDate,
        },
      },
    });

    return schedules.map(
      (s) =>
        new Schedule(
          s.id,
          s.name,
          s.quantity,
          s.startDate,
          s.returnDate,
          s.weekDay,
          s.equipmentId,
          s.returned,
          s.type || undefined
        )
    );
  }
}
