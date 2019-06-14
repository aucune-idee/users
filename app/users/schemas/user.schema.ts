import { prop, Typegoose, pre, plugin } from 'typegoose';
import { IsString, IsInt } from 'class-validator';

import { AutoIncrement } from '../../shared/schemas/sequence-id';

import { EmailUtilsService } from "../../shared/services/email-utils/email-utils.service";

export const UserCollectionName = "User";

@pre<User>('save', async function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.searchUsername = this.username.toLocaleLowerCase();
  this.searchEmail = EmailUtilsService.sanitizeEmail(this.email);

  this._id = await AutoIncrement(UserCollectionName)
  next();
})
export class User extends Typegoose {
  @IsInt()
  @prop()
  _id: Number;
  @prop()
  createdAt: Date;
  
  @prop()
  email: String;
  
  @prop()
  username: String;
  
  @prop()
  activation: String;
  
  @prop()
  searchUsername: String;
  
  @prop()
  searchEmail: String;
  
  @prop()
  password: String;
  
  @prop()
  roles:[String];
  
  @prop()
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  };
  
  @prop()
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}

export interface IUser extends User{}

export type PrivateUser = Pick<IUser, '_id' | 'username' |'createdAt'>;

