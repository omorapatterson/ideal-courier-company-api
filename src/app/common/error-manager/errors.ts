// class BaseError {
//   constructor () {
//       Error.apply(this, arguments);
//   }
// }

// BaseError.prototype = new Error();

export abstract class ErrorResult/* extends BaseError*/ {
    constructor(public code: string, public description: string) {

    }
}

export class BadRequestResult extends ErrorResult { }

export class ForbiddenResult extends ErrorResult { }

export class InternalServerErrorResult extends ErrorResult { }

export class NotFoundResult extends ErrorResult { }
