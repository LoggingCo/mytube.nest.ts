import { IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
