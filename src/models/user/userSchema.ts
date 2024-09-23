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
  confirmPassword: {
    type: String,
    required: true,
  }
});

const userModel = model<TUser>("user", User);

export default userModel;
