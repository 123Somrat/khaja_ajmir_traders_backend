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
     required:true,
     default:'user'
  }
});

const userModel = model<TUser>("user", User);

export default userModel;
