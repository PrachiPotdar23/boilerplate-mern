import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { ObjectIdUtils } from '../../../src/apps/backend/modules/database';
import ShareTaskService from '../../../src/apps/backend/modules/share-tasks/share-task-service';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

chai.use(chaiHttp);

describe('Shared Task API', () => {
  let account: Account;
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());
  });

  describe('POST /shared-tasks', () => {
    it('should be able to share a new task', async () => {
      const taskId = ObjectIdUtils.createNew(); // Generate a new ObjectId for the task

      const res = await chai
        .request(app)
        .post('/api/tasks/shared-tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          taskId: taskId,
          accountId: account.id,
        });

      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('task');
      expect(res.body).to.have.property('account');
      expect(res.body.task).to.eq(taskId);
      expect(res.body.account).to.eq(account.id);
    });
  });

  describe('GET /tasks/shared-tasks/:accountId', () => {
    it('should be able to return list of shared tasks for the account', async () => {
      const taskId1 = ObjectIdUtils.createNew(); // Generate a new ObjectId for the first task
      const taskId2 = ObjectIdUtils.createNew(); // Generate a new ObjectId for the second task

      await ShareTaskService.shareTask({
        taskId: taskId1,
        accountId: account.id,
      });

      await ShareTaskService.shareTask({
        taskId: taskId2,
        accountId: account.id,
      });

      const res = await chai
        .request(app)
        .get(`/api/tasks/shared-tasks/${account.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);
      expect(res.body[0]).to.have.property('task');
      expect(res.body[0]).to.have.property('account');
      expect(res.body[1]).to.have.property('task');
      expect(res.body[1]).to.have.property('account');
    });

    it('should return an empty list if there are no shared tasks for the account', async () => {
      const res = await chai
        .request(app)
        .get(`/api/tasks/shared-tasks/${account.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(0);
    });
  });
});
