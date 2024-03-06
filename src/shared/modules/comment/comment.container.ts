import { Container } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { CommentService, CommentEntity, CommentModel, DefaultCommentService } from './index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(COMPONENT.COMMENT_SERVICE).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(COMPONENT.COMMENT_MODEL).toConstantValue(CommentModel);

  return commentContainer;
}
