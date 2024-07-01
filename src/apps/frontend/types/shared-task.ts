import { JsonObject } from './common-types';
import { Task } from './task';
import { Account } from './account';
export class SharedTask {
  id: string;
  task: Task;
  account: Account;
  sharedAt: Date;
  sharedBy: Account;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.task = json.task ? new Task(json.task as JsonObject) : {} as Task; // Add check
    this.account = json.account ? new Account(json.account as JsonObject) : {} as Account; // Add check
    this.sharedAt = json.sharedAt ? new Date(json.sharedAt as string) : new Date();
    this.sharedBy = json.sharedBy ? new Account(json.sharedBy as JsonObject) : {} as Account; // Add check
  }
}
