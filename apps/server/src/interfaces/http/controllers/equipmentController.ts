import { Request, Response } from "express";
import * as equipmentService from "@/application/use-cases/equipmentUseCase";

export class EquipmentController {
  async create(req: Request, res: Response) {
    try {
      const equipment = await equipmentService.createEquipment(req.body);
      res.status(201).json(equipment);
    } catch (error: any) {
      if (error.message === "Equipment with this number already exists.") {
        res.status(400).json({ error: error.message }); // Erro de requisição ruim
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const equipments = await equipmentService.getAllEquipments();
      res.json(equipments);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const equipment = await equipmentService.getEquipmentById(
        Number(req.params.id)
      );
      if (!equipment) {
        res.status(404).json({ error: "Equipment not found" });
        return;
      }
      res.json(equipment);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const equipment = await equipmentService.updateEquipment(
        Number(req.params.id),
        req.body
      );
      res.json(equipment);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const equipment = await equipmentService.deleteEquipment(
        Number(req.params.id)
      );
      res.json({ message: "Equipment deleted", id: equipment.id });
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
