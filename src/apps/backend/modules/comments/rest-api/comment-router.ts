import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { CommentController } from './comment-controller';

export default class CommentRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const commentController = new CommentController();

    router.use(accessAuthMiddleware);

    router.post('/', commentController.createComment);
    router.put('/:commentId', commentController.editComment);
    router.delete('/:commentId', commentController.deleteComment);
    router.get('/', commentController.getComments);
    router.post('/reply', commentController.replyToComment);
  }
}
