import { ScheduleRepository } from "@/infra/repositories/scheduleRepository";
import { Schedule } from "@/core/domain/entities/scheduleEntity";
import { LoanRepository } from "@/infra/repositories/loanRepository";
import { Loan } from "@/core/domain/entities/loanEntity";

const scheduleRepository = new ScheduleRepository();
const loanRepository = new LoanRepository();

export async function checkOverdueSchedules(): Promise<Schedule[]> {
  return await scheduleRepository.getOverdueSchedules();
}

export async function checkOverdueLoans(): Promise<Loan[]> {
  return await loanRepository.getOverdueLoans();
}
