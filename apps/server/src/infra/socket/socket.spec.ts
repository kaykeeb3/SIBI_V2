import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket } from "./socket";
import {
  checkOverdueSchedules,
  checkOverdueLoans,
} from "@/application/use-cases/notificationUseCase";

// Mock das dependências
jest.mock("socket.io");
jest.mock("@/application/use-cases/notificationUseCase");

describe("Socket Server", () => {
  let httpServer: HttpServer;
  let socketServer: ReturnType<typeof Socket>;
  let mockSocket: any;
  let mockIO: any;
  let connectionHandler: (socket: any) => void;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSocket = {
      id: "test-socket-id",
      on: jest.fn(),
    };

    mockIO = {
      on: jest.fn((event, handler) => {
        if (event === "connection") {
          connectionHandler = handler;
        }
      }),
      emit: jest.fn(),
      close: jest.fn(),
    };

    (SocketIOServer as unknown as jest.Mock).mockImplementation(() => mockIO);

    httpServer = new HttpServer();

    socketServer = Socket(httpServer);
  });

  afterEach(() => {
    socketServer.cleanup();
  });

  it("should initialize socket server with correct configuration", () => {
    expect(SocketIOServer).toHaveBeenCalledWith(httpServer, {
      cors: {
        origin: "*",
        methods: "*",
      },
    });
  });

  it("should handle client connection and setup notifications", () => {
    connectionHandler(mockSocket);

    expect(mockSocket.on).toHaveBeenCalledWith(
      "disconnect",
      expect.any(Function)
    );
    expect(checkOverdueSchedules).toHaveBeenCalled();
    expect(checkOverdueLoans).toHaveBeenCalled();
  });

  it("should emit overdue schedules notification when there are overdue items", async () => {
    const mockOverdueSchedules = [
      { id: 1, name: "Schedule 1" },
      { id: 2, name: "Schedule 2" },
    ];

    (checkOverdueSchedules as jest.Mock).mockResolvedValue(
      mockOverdueSchedules
    );

    connectionHandler(mockSocket);
    await Promise.resolve(); // Aguarda a resolução da promessa

    expect(mockIO.emit).toHaveBeenCalledWith(
      "overdueScheduleNotification",
      mockOverdueSchedules
    );
  });

  it("should emit overdue loans notification when there are overdue items", async () => {
    const mockOverdueLoans = [
      { id: 1, name: "Loan 1" },
      { id: 2, name: "Loan 2" },
    ];

    (checkOverdueLoans as jest.Mock).mockResolvedValue(mockOverdueLoans);

    connectionHandler(mockSocket);
    await Promise.resolve(); // Aguarda a resolução da promessa

    expect(mockIO.emit).toHaveBeenCalledWith(
      "overdueLoanNotification",
      mockOverdueLoans
    );
  });

  it("should handle errors in overdue schedules check", async () => {
    const error = new Error("Test error");

    (checkOverdueSchedules as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    connectionHandler(mockSocket);
    await Promise.resolve(); // Aguarda a resolução da promessa

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching overdue schedules:",
      error
    );
    consoleSpy.mockRestore();
  });

  it("should handle errors in overdue loans check", async () => {
    const error = new Error("Test error");

    (checkOverdueLoans as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    connectionHandler(mockSocket);
    await Promise.resolve(); // Aguarda a resolução da promessa

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching overdue loans:",
      error
    );
    consoleSpy.mockRestore();
  });

  it("should cleanup interval when server is closed", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    connectionHandler(mockSocket);
    socketServer.cleanup();

    expect(mockIO.close).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
