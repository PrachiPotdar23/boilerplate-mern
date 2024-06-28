import { CommentModel, CommentDB } from './comment-db';
import { Types } from 'mongoose';

export class CommentRepository {
  public async create(comment: Partial<CommentDB>): Promise<CommentDB> {
    return await CommentModel.create(comment);
  }

  public async findByTaskId(taskId: Types.ObjectId): Promise<CommentDB[]> {
    return await CommentModel.find({ task: taskId, active: true }).populate('user').exec();
  }

  public async findById(commentId: Types.ObjectId): Promise<CommentDB | null> {
    return await CommentModel.findById(commentId).populate('user').exec();
  }

  public async update(commentId: Types.ObjectId, comment: Partial<CommentDB>): Promise<CommentDB | null> {
    return await CommentModel.findByIdAndUpdate(commentId, comment, { new: true }).exec();
  }

  public async softDelete(commentId: Types.ObjectId): Promise<CommentDB | null> {
    return await CommentModel.findByIdAndUpdate(commentId, { active: false }, { new: true }).exec();
  }
}
