import * as mongoose  from 'mongoose';
import { prop, Typegoose, pre, plugin, InstanceType } from 'typegoose';
import { IsString, IsInt } from 'class-validator';

class SequenceId extends Typegoose{
    @prop({required: true })
    _id:String
    @prop({ required: true, default:1 })
    n: number
}


export const AutoIncrement = async function(collectionName:String):Promise<Number>{
    
    const SequenceIdModel = new SequenceId().getModelForClass(SequenceId,{
        existingConnection: (mongoose as any).connections[1]
    });
    
    let counter:InstanceType<SequenceId> = await SequenceIdModel.findOne({_id:collectionName});
    console.log("counter", counter)
        
    if(counter === undefined || counter === null){
        counter = new SequenceIdModel({
            _id : collectionName
        });
    }
    let id:number = counter.n++;
    
    await counter.save();
    
    return id;
}