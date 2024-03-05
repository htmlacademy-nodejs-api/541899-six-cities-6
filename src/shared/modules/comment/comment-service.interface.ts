import { CreateCommentDto } from './dto/create-comment.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findCommentsByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]>;
  deleteCommentByOfferId(offerId: string): Promise<number | null>;
}
