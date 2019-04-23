import { Document, Schema, Model, model} from "mongoose";
import { sanitizeEmail } from "../utils/email.utils";

export interface IUser extends Document {
  createdAt: Date,
  email: String;
  username: String;
  activation: String;

  searchUsername: String;
  searchEmail: String;
}

export var UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  username: String,
  activation: String,
  searchUsername: String,
  searchEmail: String
});
UserSchema.pre("save", function(this:IUser, next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.searchUsername = this.username.toLocaleLowerCase();
  this.searchEmail = sanitizeEmail(this.email);
  next();
});



export const User: Model<IUser> = model<IUser>("User", UserSchema);