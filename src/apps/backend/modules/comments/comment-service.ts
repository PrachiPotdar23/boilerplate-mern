import { CommentRepository } from './internal/store/comment-repository';
import { Types } from 'mongoose';
import { CommentDB } from './internal/store/comment-db';

export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  public async createComment(taskId: Types.ObjectId, userId: Types.ObjectId, comment: string): Promise<CommentDB> {
    return await this.commentRepository.create({ task: taskId, user: userId, comment, active: true });
  }

  public async getCommentsByTask(taskId: Types.ObjectId): Promise<CommentDB[]> {
    return await this.commentRepository.findByTaskId(taskId);
  }

  public async updateComment(commentId: Types.ObjectId, comment: string): Promise<CommentDB | null> {
    return await this.commentRepository.update(commentId, { comment });
  }

  public async deleteComment(commentId: Types.ObjectId): Promise<CommentDB | null> {
    return await this.commentRepository.softDelete(commentId);
  }
}
export default CommentService;
