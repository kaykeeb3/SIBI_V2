import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Ou um tipo mais específico se você souber o formato do payload
    }
  }
}
