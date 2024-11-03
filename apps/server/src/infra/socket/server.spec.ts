import { Server } from "socket.io";
import { notifyClients, initializeSocket } from "./server";

// Mock da classe Server
jest.mock("socket.io", () => {
  const onMock = jest.fn();
  const emitMock = jest.fn();

  return {
    Server: jest.fn().mockImplementation(() => ({
      on: onMock,
      emit: emitMock,
    })),
  };
});

describe("Socket Notifications", () => {
  let mockIO: InstanceType<typeof Server>;

  beforeEach(() => {
    // Configurar o mock da classe Server
    mockIO = new (jest.requireMock("socket.io").Server as jest.Mock)();
    initializeSocket(mockIO);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should emit events to clients", () => {
    const event = "testEvent";
    const data = { message: "Hello, clients!" };

    // Simula a chamada da função notifyClients
    notifyClients(event, data);

    // Verifica se o emit foi chamado corretamente
    expect(mockIO.emit).toHaveBeenCalledWith(event, data);
    expect(mockIO.emit).toHaveBeenCalledTimes(1);
  });
});
