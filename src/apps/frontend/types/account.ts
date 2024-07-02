import { JsonObject } from './common-types';

export class Account {
  accountId: string;
  firstName: string;
  lastName: string;
  username: string;

  constructor(json: JsonObject) {
<<<<<<< HEAD
    
=======
   
>>>>>>> 419afc9b9a4a511c993e6cc442f48c69a4108ea1
    this.accountId = json.id as string;
    this.firstName = json.firstName as string;
    this.lastName = json.lastName as string;
    this.username = json.username as string;
  }

  displayName(): string {
    return (`${this.firstName} ${this.lastName}`).trim();
  }
}


