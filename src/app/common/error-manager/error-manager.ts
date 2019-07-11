import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ErrorCode } from './error-codes';
import {
  BadRequestResult,
  ErrorResult,
  ForbiddenResult,
  InternalServerErrorResult,
  NotFoundResult,
} from './errors';

export class ErrorManager {

  public static manageErrorResult(error: ErrorResult) {
    if (error instanceof NotFoundResult) {
      return ErrorManager.notFound(error.code, error.description);
    }

    if (error instanceof ForbiddenResult) {
      return ErrorManager.forbidden(error.code, error.description);
    }

    if (error instanceof BadRequestResult) {
      return ErrorManager.badRequest(error.code, error.description);
    }

    return ErrorManager.internalServerError();
  }

  public static notFound(code: string, description: string) {
    const errorResult: NotFoundResult = new NotFoundResult(code, description);
    throw new NotFoundException(errorResult);
  }

  public static forbidden(code: string, description: string) {
    const errorResult: ForbiddenResult = new ForbiddenResult(code, description);
    throw new ForbiddenException(errorResult);
  }

  public static badRequest(code: string, description: string) {
    const errorResult: BadRequestResult = new BadRequestResult(code, description);
    throw new BadRequestException(errorResult);
  }

  public static internalServerError(/*error: Error, */) {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
    throw new InternalServerErrorException(errorResult);
  }

}
