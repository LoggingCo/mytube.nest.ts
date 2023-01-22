import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body() createUserDTO: CreateUserDTO, @Res() res: Response) {
    try {
      this.userService.create(createUserDTO);
      res.status(HttpStatus.CREATED).json({
        message: '회원가입이 완료되었습니다.',
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
