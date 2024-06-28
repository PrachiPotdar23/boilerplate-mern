import { Request, Response } from 'express';
import { CommentService } from '../comment-service';
import { CommentSerializer } from './comment-serializer';
import { Types } from 'mongoose';

// Extend Request interface to include user property
interface AuthenticatedRequest extends Request {
  user: {
    _id: string; // or Types.ObjectId if you're using ObjectId for user ID
    username: string; // include other properties as needed
  };
}

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  public createComment = async (req: AuthenticatedRequest, res: Response) => {
    const { taskId, comment } = req.body;
    const userId = req.user._id; // Assuming user is added to request object by authentication middleware
    const createdComment = await this.commentService.createComment(new Types.ObjectId(taskId), new Types.ObjectId(userId), comment);
    res.status(201).json(CommentSerializer.serialize(createdComment));
  };

  public getCommentsByTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const comments = await this.commentService.getCommentsByTask(new Types.ObjectId(taskId));
    res.status(200).json(CommentSerializer.serializeMany(comments));
  };

  public updateComment = async (req: AuthenticatedRequest, res: Response) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const updatedComment = await this.commentService.updateComment(new Types.ObjectId(commentId), comment);
    res.status(200).json(CommentSerializer.serialize(updatedComment));
  };

  public deleteComment = async (req: AuthenticatedRequest, res: Response) => {
    const { commentId } = req.params;
    const deletedComment = await this.commentService.deleteComment(new Types.ObjectId(commentId));
    res.status(200).json(CommentSerializer.serialize(deletedComment));
  };
}
export default CommentController;