import { Model } from "mongoose";

type TUser = {
  name: string;
  email: string;
  password: string;
  role?: string;
  confirmPassword?: string;
  faildLoginAttempts?: number;
  lockUntil?: Date;
};

type TUserMethods = {
  incrementFaildLogin(): Promise<TUser>;
  resetLoginAttempts(): Promise<TUser>;
};

type UserModel = Model<TUser, {}, TUserMethods>;

export { TUser, TUserMethods, UserModel };
