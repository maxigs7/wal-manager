import { AppConfigService } from '@config';
import { Injectable, Logger as BaseLogger, Scope } from '@nestjs/common';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends BaseLogger {
  constructor(private readonly config: AppConfigService) {
    super('');
  }

  public log(message: unknown, context?: string): void {
    this.config.isProduction
      ? console.log(this.prefix(context), message)
      : super.log(message, this.prefix(context));
  }

  public error(message: unknown, trace?: string, context?: string): void {
    this.config.isProduction
      ? console.error(this.prefix(context), message, '\n', trace)
      : super.error(message, trace, this.prefix(context));
  }

  private prefix(context?: string): string {
    // dayjs().format('YYYY-MM-DD HH:mm:ss');
    let prefix = new Date().toLocaleString();

    if (context) {
      prefix += ` [${context}]`;
    }

    return prefix;
  }
}
