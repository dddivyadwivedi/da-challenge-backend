import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAfterStartDate(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfterStartDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const startDate = (args.object as any)[property]; 
          return typeof value === 'string' && typeof startDate === 'string' && new Date(value) > new Date(startDate);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be after ${property}`;
        },
      },
    });
  };
}
