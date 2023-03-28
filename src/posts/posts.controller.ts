import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post as Publish } from './entities/post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiTags('Publicaciones')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Publish[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Publish> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Publish> {
    return this.postsService.create(createPostDto, user);
  }

  @Patch(':id')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ): Promise<Publish> {
    return this.postsService.update(updatePostDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Publish> {
    return this.postsService.remove(id);
  }
}
