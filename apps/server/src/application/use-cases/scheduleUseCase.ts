import { ScheduleRepository } from "@/infra/repositories/scheduleRepository";
import { Schedule } from "@/core/domain/entities/scheduleEntity";
import { ScheduleDTO } from "@/application/dtos/scheduleDTO";

const scheduleRepository = new ScheduleRepository();

export async function createSchedule(data: ScheduleDTO): Promise<Schedule> {
  const schedule = await scheduleRepository.createSchedule(data);
  return schedule; // Retorna o agendamento criado
}

export async function getAllSchedules(): Promise<Schedule[]> {
  return await scheduleRepository.getAllSchedules();
}

export async function getScheduleById(id: number): Promise<Schedule> {
  return await scheduleRepository.getScheduleById(id);
}

export async function updateSchedule(
  id: number,
  data: Partial<Omit<Schedule, "id">>
): Promise<Schedule> {
  return await scheduleRepository.updateSchedule(id, data);
}

export async function deleteSchedule(id: number): Promise<Schedule> {
  return await scheduleRepository.deleteSchedule(id);
}
