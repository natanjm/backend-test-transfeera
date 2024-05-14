import { Request, Response } from 'express';

export const cors = (req: Request, res: Response, next: NewableFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next();
}