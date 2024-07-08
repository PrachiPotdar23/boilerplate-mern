import { JsonObject } from './common-types';
import { Task } from './task';
import { Account } from './account';

export class Comment {
  id: string;
  task:any;
  account:any;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.comment = json.text as string;
    this.task = json.task ? new Task(json.task as JsonObject) : {} as Task; // Initialize task
    this.createdAt = json.createdAt ? new Date(json.createdAt as string) : new Date();
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt as string) : new Date();
    this.account = json.author ? new Account(json.author as JsonObject) : {} as Account;
  }
}