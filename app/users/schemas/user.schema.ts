import * as mongoose from "mongoose";

import { IUser } from '../interfaces/user.interface';

import { EmailUtilsService } from "../../shared/services/email-utils/email-utils.service";

export const UserCollectionName = "User";

export const UserSchema: mongoose.Schema = new mongoose.Schema({
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
})
.pre("save", async function(this:IUser, next){
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.searchUsername = this.username.toLocaleLowerCase();
  this.searchEmail = EmailUtilsService.sanitizeEmail(this.email);
  console.log(this);
  return next();
})
.post("save", function(doc){
  console.log("doc", doc);
})
//.plugin(AutoIncrement, {inc_field: '_id'});
 