import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username: username.toLowerCase() })
      .getOne();
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    const passwordHashed = user ? await bcrypt.hash(password, user.salt) : null;
    if (user && user.password === passwordHashed) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', {
        username: createUserDto.username.toLowerCase(),
      })
      .orWhere('users.email = :email', {
        email: createUserDto.email.toLowerCase(),
      })
      .getOne();
    if (userFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Usuario o correo ya registrado en el sistema',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }
}
