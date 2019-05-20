import { createParamDecorator } from '@nestjs/common';

/**
 * retrieve the current user with a decorator
 * example of a controller method:
 * @Post()
 * someMethod(@GetUser() user: User) {
 *   // do something with the user
 * }
 */
export const GetUser = createParamDecorator((data, req) => req.user);
