import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async userExists(username: string, email?: string): Promise<User> {
    const query = `SELECT * FROM public.user WHERE email = '${email}' or username = '${username}' LIMIT 1`
    return await this.userRepository.query(query)[0]
  }

  async validateUser(
    username: string,
    password: string,
    email?: string,
  ): Promise<User> {
    const user = await this.userExists(username, email);
    if (!user) throw new UnauthorizedException(`User ${user} was not found`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async validateByUserId(userId: string) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async validateJwt(token: string) {
    return await this.jwtService.verify(token);
  }

  async createJwt(user: User) {
    const payload: IPayload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get('JWT_EXPIRES_IN'),
      message: 'Successfully logged in',
      ok: true,
    };
  }

  async login(user: LoginDto) {
    const { username, password } = user;
    const userValidated = await this.validateUser(username, password);

    return await this.createJwt(userValidated);
  }

  async register(user: RegisterDto) {
    const { username, password, email, fullName } = user;
    const userExists = await this.userExists(username, email);
    if (userExists) throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      id: uuidv4(),
      username,
      email,
      fullName,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return {
      message: 'User created successfully',
      ok: true,
    };
  }
}
