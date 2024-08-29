import { Types } from "mongoose";
import expiredDueModel from "../../models/expiredDue.ts/expiredDueSchema";
import dueType from "../../types/types";
import HttpError from "../../utils/customError";

/**
 *
 * @param expiredDues
 * @returns expiredDues
 */
const expiredDues = async (expiredDues: dueType[]) => {
  try {
    const expiredDue = await expiredDueModel.insertMany(expiredDues);

    return expiredDue;
  } catch (err: any) {
    if (err.code === 11000) {
      throw new HttpError(11000, "Dulicate key error", "item already exeist");
    }
  }
};

/* 
 * @returns allEXpiredDues
 */
const getAllExpiredDues = async () => {
  try {
    const expiredDues = await expiredDueModel.find();

    return expiredDues;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "An unexpected error occured"
    );
  }
};

export = { expiredDues, getAllExpiredDues };
