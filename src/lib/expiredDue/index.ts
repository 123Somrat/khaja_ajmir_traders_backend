import { Types } from "mongoose";
import expiredDueModel from "../../models/expiredDue/expiredDueSchema";
import dueType from "../../types/types";
import HttpError from "../../utils/customError";
import { ObjectId } from "mongodb";

/**
 *
 * @param expiredDues
 * @returns expiredDues
 */
const expiredDues = async (expiredDues: dueType[]) => {
  try {
    const expiredDue = await expiredDueModel.create(expiredDues);
    console.log("from expired due service", expiredDue);
    return expiredDue;
  } catch (err: any) {
    console.log("from expired dues error block", err);
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

const patchExpiredDues = async (paylode: {
  id: string;
  sellingPrice: number;
}) => {
  try {
    // Update expiredDue document
    const updatedExpiredDue = await expiredDueModel.findOneAndUpdate(
      { _id: new ObjectId(paylode.id) },
      { $set: { sellingPrice: paylode.sellingPrice } },
      {
        returnDocument: "after", // Ensure this is set to "after" to get the updated document
        returnOriginal: false, // For older versions of MongoDB, use this option
        upsert: false, // Optional: set to true if you want to insert the document if it doesn't exist
      }
    );

    // If due not found throw not found error
    if (!updatedExpiredDue) {
      throw new HttpError(404, "Not found", "No data found");
    }

    // Throw bad request error
    if (!updatedExpiredDue) {
      throw new HttpError(400, "Bad Request", "Document not updated");
    }

    // If due updated succesfully then delete iot from expired due
    if (updatedExpiredDue) {
      const deletedSoldDue = await deleteAexpiredDue(paylode.id);
    }
  } catch (err) {
    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    }
  }
};

/**
 *
 * @param id
 * !return deleted due
 */
const deleteAexpiredDue = async (id: string) => {
  try {
    const isExiest = expiredDueModel.findById(id);

    if (!isExiest) {
      throw new HttpError(404, "Not found", "No data found");
    }

    const deletedSoldDue = expiredDueModel.findByIdAndDelete(id);

    return deletedSoldDue;
  } catch (err) {
    console.log(err);
  }
};

export = { expiredDues, getAllExpiredDues, patchExpiredDues };
