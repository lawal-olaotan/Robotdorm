import {Document, model, Model, Schema} from 'mongoose';

export interface Users extends Document{

    email: string,
    fullName: string

}


const UserSchema: Schema = new Schema({

    email:{
        type:String,
        required:true
    }, 
    name:{
        type:String
    },
    emailVerified: {
        type: Date
    }, 
    id:{
        type: String
    }

})

export const User: Model<Users> = model('User',UserSchema); 