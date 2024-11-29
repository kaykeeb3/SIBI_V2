import { GetFAQAnswer } from "@/application/use-cases/getFAQAnswerUseCase";
import { FAQRepository } from "@/infra/repositories/FAQRepository";
import { Request, Response, NextFunction } from "express";

const faqRepository = new FAQRepository();
const getFAQAnswer = new GetFAQAnswer(faqRepository);

export class FAQController {
  async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { question, answer } = req.body;

    if (!question || !answer) {
      res.status(400).json({ error: "Question and answer are required." });
      return;
    }

    try {
      const newFAQ = await faqRepository.storeFAQ(question, answer);
      res.status(201).json(newFAQ);
    } catch (error) {
      next(error);
    }
  }

  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const faqs = await faqRepository.fetchAllFAQs();
      res.json(faqs);
    } catch (error) {
      next(error);
    }
  }

  async modify(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (!question || !answer) {
      res.status(400).json({ error: "Question and answer are required." });
      return;
    }

    try {
      const updatedFAQ = await faqRepository.modifyFAQ(
        Number(id),
        question,
        answer
      );
      res.json(updatedFAQ);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const deletedFAQ = await faqRepository.removeFAQ(Number(id));
      res.json(deletedFAQ);
    } catch (error) {
      next(error);
    }
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ error: "Question is required." });
      return;
    }

    try {
      const answer = await getFAQAnswer.execute(question);
      res.json({ answer });
    } catch (error) {
      next(error);
    }
  }
}
