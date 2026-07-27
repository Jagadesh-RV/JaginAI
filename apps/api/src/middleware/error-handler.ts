import { Request, Response, NextFunction } from 'express';
import { logger } from '@jagin/logger';
import { ApiResponse } from '@jagin/types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({ err }, err.message || 'Unhandled server error');

  const response: ApiResponse<null> = {
    status: 500,
    error: err.message || 'Internal Server Error',
  };

  res.status(500).json(response);
};
