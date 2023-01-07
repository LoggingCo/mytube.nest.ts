import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    const existUser = await this.findOne(createUserDTO.email);
    if (existUser)
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');

    await this.cryptPassword(createUserDTO);
    return await this.usersRepository.save(createUserDTO);
  }

  async findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async cryptPassword(user: CreateUserDTO): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
