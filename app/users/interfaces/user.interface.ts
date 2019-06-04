import { Document } from "mongoose";


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

export interface IPrivateUser{
  _id:IUser["id"]
  username: IUser["username"];
  createdAt: IUser["createdAt"];
}