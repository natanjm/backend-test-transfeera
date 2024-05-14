import { Request, Response } from 'express';

export const contentType = (req: Request, res: Response, next: NewableFunction): void => {
  res.type('json')
  next();
}