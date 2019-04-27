import { Document, Schema, Model, model} from "mongoose";
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';
import { sanitizeEmail } from "../utils/email.utils";

export interface IUser extends Document {
  _id:number;
  createdAt: Date,
  email: String;
  username: String;
  activation: String;

  searchUsername: String;
  searchEmail: String;
  
  password: String;
  
  roles:[
    {
      type: String,
      enum: ["admin", "moderator"]
    }
  ]

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  };
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}

export var UserSchema: Schema = new Schema({
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
UserSchema.pre("save", function(this:IUser, next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  this.searchUsername = this.username.toLocaleLowerCase();
  this.searchEmail = sanitizeEmail(this.email);
  next();
});

UserSchema.plugin(MongooseAutoIncrementID.plugin, {modelName:'User'});

export const User: Model<IUser> = model<IUser>("User", UserSchema);