import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket } from "./socket";
import {
  checkOverdueSchedules,
  checkOverdueLoans,
} from "@/application/use-cases/notificationUseCase";

jest.mock("socket.io");
jest.mock("@/application/use-cases/notificationUseCase");

describe("Socket Server", () => {
  let httpServer: HttpServer;
  let socketServer: ReturnType<typeof Socket>;
  let mockSocket: any;
  let mockIO: any;
  let connectionHandler: (socket: any) => void;

  beforeEach(() => {
    jest.useFakeTimers();

    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});

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
    // Limpa todos os timers pendentes:
    jest.clearAllTimers();
    socketServer.cleanup();
    jest.restoreAllMocks();
  });

  it("should initialize socket server with correct configuration", () => {
    expect(SocketIOServer).toHaveBeenCalledWith(httpServer, {
      cors: {
        origin: "*",
        methods: "*",
      },
    });
  });

  it("should handle client connection without sending notifications immediately", () => {
    connectionHandler(mockSocket);

    expect(checkOverdueSchedules).not.toHaveBeenCalled();
    expect(checkOverdueLoans).not.toHaveBeenCalled();
  });

  it("should emit overdue schedules notification after 24 hours", async () => {
    const mockOverdueSchedules = [
      { id: 1, name: "Schedule 1" },
      { id: 2, name: "Schedule 2" },
    ];

    (checkOverdueSchedules as jest.Mock).mockResolvedValue(
      mockOverdueSchedules
    );

    connectionHandler(mockSocket);

    jest.advanceTimersByTime(86400000); // 24 horas

    await Promise.resolve();
    await Promise.resolve();

    expect(checkOverdueSchedules).toHaveBeenCalled();
    expect(mockIO.emit).toHaveBeenCalledWith(
      "overdueScheduleNotification",
      mockOverdueSchedules
    );
  });

  it("should emit overdue loans notification after 24 hours", async () => {
    const mockOverdueLoans = [
      { id: 1, name: "Loan 1" },
      { id: 2, name: "Loan 2" },
    ];

    (checkOverdueLoans as jest.Mock).mockResolvedValue(mockOverdueLoans);

    connectionHandler(mockSocket);

    jest.advanceTimersByTime(86400000);

    await Promise.resolve();
    await Promise.resolve();

    expect(checkOverdueLoans).toHaveBeenCalled();
    expect(mockIO.emit).toHaveBeenCalledWith(
      "overdueLoanNotification",
      mockOverdueLoans
    );
  });

  it("should handle errors in overdue schedules check", async () => {
    const error = new Error("Test error");
    const consoleSpy = jest.spyOn(console, "error");

    (checkOverdueSchedules as jest.Mock).mockRejectedValue(error);

    connectionHandler(mockSocket);

    jest.advanceTimersByTime(86400000);

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching overdue schedules:",
      error
    );
  });

  it("should handle errors in overdue loans check", async () => {
    const error = new Error("Test error");
    const consoleSpy = jest.spyOn(console, "error");

    (checkOverdueLoans as jest.Mock).mockRejectedValue(error);

    connectionHandler(mockSocket);

    jest.advanceTimersByTime(86400000);

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching overdue loans:",
      error
    );
  });

  it("should cleanup interval when server is closed", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    connectionHandler(mockSocket);

    socketServer.cleanup();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(mockIO.close).toHaveBeenCalled();
  });
});
