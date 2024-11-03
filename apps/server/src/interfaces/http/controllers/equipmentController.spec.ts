import { EquipmentController } from "@/interfaces/http/controllers/equipmentController";
import * as equipmentService from "@/application/use-cases/equipmentUseCase";
import { Request, Response } from "express";

jest.mock("@/application/use-cases/equipmentUseCase");

describe("Equipment Controller", () => {
  let equipmentController: EquipmentController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    equipmentController = new EquipmentController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  const equipmentData = {
    name: "Projector",
    type: "Electronics",
    quantity: 10,
  };

  const equipmentEntity = { id: 1, ...equipmentData };

  it("should create an equipment", async () => {
    (equipmentService.createEquipment as jest.Mock).mockResolvedValue(
      equipmentEntity
    );

    req.body = equipmentData;

    await equipmentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(equipmentEntity);
  });

  it("should return an error when equipment already exists", async () => {
    (equipmentService.createEquipment as jest.Mock).mockRejectedValue(
      new Error("Equipment with this number already exists.")
    );

    req.body = equipmentData;

    await equipmentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Equipment with this number already exists.",
    });
  });

  it("should return an error when creating an equipment fails", async () => {
    (equipmentService.createEquipment as jest.Mock).mockRejectedValue(
      new Error("Failed to create equipment")
    );

    req.body = equipmentData;

    await equipmentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should get all equipments", async () => {
    (equipmentService.getAllEquipments as jest.Mock).mockResolvedValue([
      equipmentEntity,
    ]);

    await equipmentController.getAll(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith([equipmentEntity]);
  });

  it("should return an error when getting all equipments fails", async () => {
    (equipmentService.getAllEquipments as jest.Mock).mockRejectedValue(
      new Error("Failed to get equipments")
    );

    await equipmentController.getAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should get equipment by id", async () => {
    (equipmentService.getEquipmentById as jest.Mock).mockResolvedValue(
      equipmentEntity
    );

    req.params = { id: "1" };

    await equipmentController.getById(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(equipmentEntity);
  });

  it("should return a 404 error when equipment is not found", async () => {
    (equipmentService.getEquipmentById as jest.Mock).mockResolvedValue(null);

    req.params = { id: "1" };

    await equipmentController.getById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Equipment not found" });
  });

  it("should return an error when getting equipment by id fails", async () => {
    (equipmentService.getEquipmentById as jest.Mock).mockRejectedValue(
      new Error("Failed to get equipment")
    );

    req.params = { id: "1" };

    await equipmentController.getById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should update an equipment", async () => {
    const updatedData = {
      name: "Updated Projector",
      type: "Updated Electronics",
      quantity: 5,
    };
    const updatedEntity = { id: 1, ...updatedData };

    (equipmentService.updateEquipment as jest.Mock).mockResolvedValue(
      updatedEntity
    );

    req.params = { id: "1" };
    req.body = updatedData;

    await equipmentController.update(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(updatedEntity);
  });

  it("should return an error when updating an equipment fails", async () => {
    (equipmentService.updateEquipment as jest.Mock).mockRejectedValue(
      new Error("Failed to update equipment")
    );

    req.params = { id: "1" };
    req.body = { name: "Updated Projector" };

    await equipmentController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should delete an equipment", async () => {
    const deletedEntity = { id: 1 };

    (equipmentService.deleteEquipment as jest.Mock).mockResolvedValue(
      deletedEntity
    );

    req.params = { id: "1" };

    await equipmentController.remove(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      message: "Equipment deleted",
      id: deletedEntity.id,
    });
  });

  it("should return an error when deleting an equipment fails", async () => {
    (equipmentService.deleteEquipment as jest.Mock).mockRejectedValue(
      new Error("Failed to delete equipment")
    );

    req.params = { id: "1" };

    await equipmentController.remove(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
