import { Equipment } from "@/core/domain/entities/equipmentEntity";

import { EquipmentRepository } from "@/infra/repositories/equipmentRepository";
import { EquipmentDTO } from "@/application/dtos/equipmentDTO";

const equipmentRepository = new EquipmentRepository();

export async function createEquipment(data: EquipmentDTO): Promise<Equipment> {
  return await equipmentRepository.createEquipment(data);
}

export async function getAllEquipments(): Promise<Equipment[]> {
  return await equipmentRepository.getAllEquipments();
}

export async function getEquipmentById(id: number): Promise<Equipment> {
  return await equipmentRepository.getEquipmentById(id);
}

export async function updateEquipment(
  id: number,
  data: Partial<EquipmentDTO>
): Promise<Equipment> {
  return await equipmentRepository.updateEquipment(id, data);
}

export async function deleteEquipment(id: number): Promise<Equipment> {
  return await equipmentRepository.deleteEquipment(id);
}
