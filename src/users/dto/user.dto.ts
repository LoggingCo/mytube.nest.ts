import { IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
