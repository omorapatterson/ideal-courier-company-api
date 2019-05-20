import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Type } from '@nestjs/common';
import { validate, ValidatorOptions, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    private validatorOptions: ValidatorOptions;

    constructor(validatorOptions?: ValidatorOptions) {
        this.validatorOptions = validatorOptions;
    }

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object, this.validatorOptions);
        if (errors.length > 0) {
            const message = this.getErrorMessage(errors); // get one of errors messages!
            throw new BadRequestException({ message: message });
        }
        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }

    private getErrorMessage(errors: ValidationError[]): string {
        if(!errors && errors.length === 0 ) {
            return "Unknow error";
        }
        const error: ValidationError = errors[0];
        if(error.constraints) {            
            return error.constraints[Object.keys(error.constraints)[0]];
        }        
        return this.getErrorMessage(error.children);
    }
}