import { model, Schema } from "mongoose";
import TUser from "./userType";


const User = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
     type:String,
     enum : ['user','admin'],
     required:true,
     default:'user'
  },
  faildLoginAttempts:{
     type:Number,
     default:0
  },
  lockUntil:{
     type : Date,
     default : null
  }
});

const userModel = model<TUser>("user", User);

export default userModel;
