import { Request, Response } from "express";
import * as scheduleService from "@/application/use-cases/scheduleUseCase";

export class ScheduleController {
  async create(req: Request, res: Response) {
    try {
      const schedule = await scheduleService.createSchedule(req.body);
      res.status(201).json(schedule);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const schedules = await scheduleService.getAllSchedules();
      res.json(schedules);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const schedule = await scheduleService.getScheduleById(
        Number(req.params.id)
      );
      if (!schedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }
      res.json(schedule);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const schedule = await scheduleService.updateSchedule(
        Number(req.params.id),
        req.body
      );
      res.json(schedule);
    } catch (error: any) {
      res.status(404).json({ error: "Schedule not found" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const schedule = await scheduleService.deleteSchedule(
        Number(req.params.id)
      );
      res.json(schedule);
    } catch (error: any) {
      res.status(404).json({ error: "Schedule not found" });
    }
  }
}
