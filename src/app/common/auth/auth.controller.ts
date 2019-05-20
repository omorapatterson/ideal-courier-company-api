import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ILogin } from './interfaces/login.interface';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ErrorResult } from '../error-manager/errors';
import { ErrorManager } from '../error-manager/error-manager';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UsePipes(new ValidationPipe())
    signIn(@Body() loginDto: LoginDto) {
        const email: string = loginDto.email;
        const password: string = loginDto.password;
        return this.authService.signIn(email, password)
            .then((result: ILogin) => {
                return result;
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }
}
