import { Schema, Document } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

import { IUser } from '../interfaces/user.interface';

import { EmailUtilsService } from "../../shared/services/email-utils/email-utils.service";

export const UserCollectionName = "User";

export const UserSchema: Schema = new Schema({
  _id: Number,
  createdAt: Date,
  email: String,
  username: String,
  activation: String,
  searchUsername: String,
  searchEmail: String,
  password: String,
  roles:[String],
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

UserSchema.pre("save", function(this:IUser, next){
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.searchUsername = this.username.toLocaleLowerCase();
  this.searchEmail = EmailUtilsService.sanitizeEmail(this.email);
  next();
});

UserSchema.plugin(MongooseAutoIncrementID.plugin, {modelName:UserCollectionName});
