import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { now } from "mongoose";

export type UserDocument = HydratedDocument<User> 

@Schema({versionKey: false, timestamps: true})
export class User {
   
    @Prop({required: true})
    password: string;

    @Prop({default:null})
    email: string;

    

}

export const UserSchema = SchemaFactory.createForClass(User);