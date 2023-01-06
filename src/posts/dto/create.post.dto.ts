import { IsString } from "class-validator";

export class CreatePostDto {
  title: string;
  content: string;
  userId: string;
}