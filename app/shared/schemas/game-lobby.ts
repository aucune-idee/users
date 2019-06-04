import { GameType, Armies, enum2Array } from '../enums';

export var  GameLobbySchema = {
    _id: Number,
    name:String,
    searchName:String,
    owner:Number,
    type:{
      type:String,
      enum: enum2Array(GameType)
    },
    members:[{
      _userId:Number,
      army:{
        type:String,
        enum: enum2Array(Armies)
      }
    }]
  };