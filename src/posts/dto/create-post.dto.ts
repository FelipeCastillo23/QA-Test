import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  title: string;

  @IsNotEmpty({ message: 'content no debería estar vacío' })
  content: string;
}
