import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { ObjectIdUtils } from '../../../src/apps/backend/modules/database';
import CommentService from '../../../src/apps/backend/modules/comments/comment-service';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

chai.use(chaiHttp);

describe('Comment API', () => {
  let account: Account;
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());
  });

  describe('POST /comments', () => {
    it('should be able to create a new comment', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task
      const commentText = 'This is a test comment';

      const res = await chai
        .request(app)
        .post('/api/comments')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          taskId: taskId,
          comment: commentText,
        });

      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('task');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('comment');
      expect(res.body.task).to.eq(taskId);
      expect(res.body.account._id).to.eq(account.id); // Adjusted line
      expect(res.body.comment).to.eq(commentText);
    });
  });

  describe('GET /comments/:taskId', () => {
    it('should return a list of comments for the task', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task

      await CommentService.createComment({
        taskId: taskId,
        accountId: account.id,
        comment: 'First comment',
      });

      await CommentService.createComment({
        taskId: taskId,
        accountId: account.id,
        comment: 'Second comment',
      });

      const res = await chai
        .request(app)
        .get(`/api/comments/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);
      expect(res.body[0]).to.have.property('task');
      expect(res.body[0]).to.have.property('account');
      expect(res.body[0]).to.have.property('comment');
      expect(res.body[1]).to.have.property('task');
      expect(res.body[1]).to.have.property('account');
      expect(res.body[1]).to.have.property('comment');
    });

    it('should return an empty list if there are no comments for the task', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task

      const res = await chai
        .request(app)
        .get(`/api/comments/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(0);
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update an existing comment', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task
      const initialComment = 'Initial comment';
      const updatedComment = 'Updated comment';

      const comment = await CommentService.createComment({
        taskId: taskId,
        accountId: account.id,
        comment: initialComment,
      });

      const res = await chai
        .request(app)
        .put(`/api/comments/${comment.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          taskId: taskId,
          comment: updatedComment,
        });

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('task');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('comment');
      expect(res.body.task).to.eq(taskId);
      expect(res.body.account._id).to.eq(account.id); // Adjusted line
      expect(res.body.comment).to.eq(updatedComment);
    });
  });

  describe('DELETE /comments/:id', () => {
    it('should delete an existing comment', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task
      const commentText = 'Comment to be deleted';

      const comment = await CommentService.createComment({
        taskId: taskId,
        accountId: account.id,
        comment: commentText,
      });

      const res = await chai
        .request(app)
        .delete(`/api/comments/${comment.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(204);
    });
  });
});
