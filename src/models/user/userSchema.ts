import { model, Schema } from "mongoose";
import { TUser, TUserMethods, UserModel } from "./userType";
import HttpError from "../../utils/customError";
import dayjs from "dayjs";

type UpdatesObject = {
  $inc?: { faildLoginAttempts: number };
  $set?: { lockUntil?: number };
};

const User = new Schema<TUser, UserModel, TUserMethods>({
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
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  faildLoginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
    default: null,
  },
});


// Add Method for lock user after 3 failed lohin attempts
User.method("incrementFaildLogin", async function incrementFaildLogin() {
  const lockOutTime = 3 * 60 * 1000;

  const updatedUserObj: UpdatesObject = {};

  if (
    this.lockUntil !== null &&
    (this.lockUntil as Date).getTime() > Date.now()
  ) {
    throw new HttpError(
      401,
      "Unauthorized",
      "You account is blocked pls try again after 3 minutes"
    );
  }

  if ((this.faildLoginAttempts as number) === 3) {
    updatedUserObj.$set = { lockUntil: Date.now() + lockOutTime };
  }

  if ((this.faildLoginAttempts as number) < 3) {
    updatedUserObj.$inc = { faildLoginAttempts: 1 };
  }

  const data = await this.updateOne(updatedUserObj).exec();
});

const userModel = model<TUser, UserModel>("user", User);

export default userModel;
