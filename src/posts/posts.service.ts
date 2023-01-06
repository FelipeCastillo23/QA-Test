import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post as PostRepository } from 'src/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { QueryParamsDto } from './dto/query.params.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: Repository<PostRepository>,
  ) {}

  async create({ content, title, userId }: CreatePostDto) {
    const post = this.postRepository.create({
      text: content,
      title,
      user: {
        id: userId,
      },
    });

    await this.postRepository.save(post);
    return {
      message: 'Post created successfully',
      post,
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: ['id', 'title', 'text', 'createdAt', 'updatedAt', 'user'],
    });

    if (!post) throw new NotFoundException('Message not found');

    return {
      post,
      message: 'Message found successfully',
    };
  }

  async findAll({ dateFilter, search, owner }: QueryParamsDto, userId: string) {
    let where = {},
      posts: PostRepository[] = [];

    if (search) {
      where = [
        { title: ILike(`%${search}%`) },
        { text: ILike(`%${search}%`) },
        { user: { username: ILike(`%${search}%`) } },
        { user: { fullName: ILike(`%${search}%`) } },
      ];
    }

    posts = await this.postRepository.find({
      where,
      relations: ['user'],
      select: ['id', 'title', 'text', 'createdAt', 'updatedAt', 'user'],
    });
    if (dateFilter){
      posts = posts.filter(post => new Date(post.createdAt).getDate() === new Date(dateFilter).getDate());
    }
    
    if (owner) {
      posts = posts.filter(post => post.user.id === userId);
    }

    if (!posts || posts.length === 0)
      throw new NotFoundException('There is no posts available');

    return {
      posts,
      count: posts.length,
      message: "posts found successfully",
    }
  }

  async update(id: number, { content, title, userId }: UpdatePostDto) {
    const { post } = await this.findOne(id)

    if (post.user.id !== userId) throw new NotFoundException('Message not found');
    await this.postRepository.update(id, {
      text: content,
      title,
    });
    return {
      message: 'Post updated successfully',
      post: {
        ...post,
        text: content,
        title,
      }
    }
  }

  async remove(id: number) {
    const { post } = await this.findOne(id)

    if (!post) throw new NotFoundException('Message not found');
    await this.postRepository.delete(id);
    return {
      message: 'Post deleted successfully',
    }
  }
}
