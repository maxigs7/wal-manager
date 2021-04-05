import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

import { Logger } from '../providers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  public use(req: Request, res: Response, next: () => void): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const user = req.user?.userId || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `${method} ${originalUrl} - ${statusCode} ${getReasonPhrase(
          statusCode,
        )} - ${userAgent} ${ip.replace('::ffff:', '')} ${user}`,
        '',
      );
    });

    next();
  }
}
