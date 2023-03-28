import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment: Comment = this.commentsRepository.create(createCommentDto);
    return this.commentsRepository.save({ user, ...comment });
  }

  private findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<Comment> {
    return await this.findOne(id);
  }
}
