import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username no debería estar vacío' })
  username: string;

  @IsNotEmpty({ message: 'email no debería estar vacío' })
  email: string;

  @IsNotEmpty({ message: 'password no debería estar vacío' })
  @MinLength(6, { message: 'password debe ser mayor o igual a 8 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'fullname no debería estar vacío' })
  fullname: string;
}
