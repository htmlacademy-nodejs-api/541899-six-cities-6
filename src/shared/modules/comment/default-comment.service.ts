import { inject, injectable } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { COMMENT } from '../../constants/comment.constants.js';
import { CommentService } from './index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { SortOrder } from '../../models/sort-type.enum.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  async createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  async findCommentsByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortOrder.Desc })
      .limit(COMMENT.LIMIT)
      .populate('userId');
  }

  async deleteCommentByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({offerId}).exec();
    return result.deletedCount;
  }
}
