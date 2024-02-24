import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { MAX_COMMENTS_QUANTITY } from '../../constants/comment.constants.js';
import { CommentService } from './index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { SortOrder } from '../../models/sort-type.enum.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  async createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  async findCommentsByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortOrder.Desc })
      .limit(MAX_COMMENTS_QUANTITY)
      .populate('userId');
  }
}
