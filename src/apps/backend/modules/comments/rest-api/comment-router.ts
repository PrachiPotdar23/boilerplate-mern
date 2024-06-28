import { Router } from 'express';
import CommentController from './comment-controller';

class CommentRouter {
  public router: Router;
  private commentController: CommentController;

  constructor() {
    this.router = Router();
    this.commentController = new CommentController();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post('/', this.commentController.createComment);
    this.router.get('/task/:taskId', this.commentController.getCommentsByTask);
    this.router.put('/:commentId', this.commentController.updateComment);
    this.router.delete('/:commentId', this.commentController.deleteComment);
  }
}

export default CommentRouter;
