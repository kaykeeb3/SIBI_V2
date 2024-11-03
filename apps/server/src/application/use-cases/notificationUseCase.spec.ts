import {
  checkOverdueSchedules,
  checkOverdueLoans,
} from "@/application/use-cases/notificationUseCase";
import { ScheduleRepository } from "@/infra/repositories/scheduleRepository";
import { LoanRepository } from "@/infra/repositories/loanRepository";
import { Schedule } from "@/core/domain/entities/scheduleEntity";
import { Loan } from "@/core/domain/entities/loanEntity";

jest.mock("@/infra/repositories/scheduleRepository");
jest.mock("@/infra/repositories/loanRepository");

describe("NotificationUseCase", () => {
  const mockScheduleRepository = ScheduleRepository as jest.MockedClass<
    typeof ScheduleRepository
  >;
  const mockLoanRepository = LoanRepository as jest.MockedClass<
    typeof LoanRepository
  >;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return overdue schedules", async () => {
    const overdueSchedules: Schedule[] = [
      new Schedule(
        1,
        "Agendamento 1",
        5,
        new Date(),
        new Date(),
        "Monday",
        1,
        false
      ),
      new Schedule(
        2,
        "Agendamento 2",
        3,
        new Date(),
        new Date(),
        "Tuesday",
        2,
        false
      ),
    ];

    mockScheduleRepository.prototype.getOverdueSchedules.mockResolvedValue(
      overdueSchedules
    );

    const result = await checkOverdueSchedules();
    expect(result).toEqual(overdueSchedules);
    expect(
      mockScheduleRepository.prototype.getOverdueSchedules
    ).toHaveBeenCalled();
  });

  it("should return overdue loans", async () => {
    const overdueLoans: Loan[] = [
      new Loan(
        1,
        "Empréstimo 1",
        "8th Grade",
        new Date(),
        new Date(),
        false,
        1
      ),
      new Loan(
        2,
        "Empréstimo 2",
        "9th Grade",
        new Date(),
        new Date(),
        false,
        2
      ),
    ];

    mockLoanRepository.prototype.getOverdueLoans.mockResolvedValue(
      overdueLoans
    );

    const result = await checkOverdueLoans();
    expect(result).toEqual(overdueLoans);
    expect(mockLoanRepository.prototype.getOverdueLoans).toHaveBeenCalled();
  });
});
