import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post: Post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save({ user, ...post });
  }

  async update(updatePostDto: UpdatePostDto, id: string): Promise<Post> {
    const post: Post = await this.findOne(id);
    return this.postsRepository.save({ ...post, ...updatePostDto });
  }

  async remove(id: string): Promise<Post> {
    const post: Post = await this.findOne(id);
    return this.postsRepository.softRemove(post);
  }
}
