import { Types } from "mongoose";
import expiredDueModel from "../../models/expiredDue.ts/expiredDueSchema";
import dueType from "../../types/types";
import HttpError from "../../utils/customError";
import { ObjectId } from "mongodb";

/**
 *
 * @param expiredDues
 * @returns expiredDues
 */
const expiredDues = async (expiredDues: dueType[] ) => {
  try {
    const expiredDue = await expiredDueModel.create(expiredDues);
     console.log('from expired due service',expiredDue)
    return expiredDue;
  } catch (err: any) {
    console.log('from expired dues error block',err)
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
    // Checking given id due exeist or not
    const isExeist = await expiredDueModel.findById(paylode.id);

    if (!isExeist) {
      throw new HttpError(404, "Not found", "No data found");
    }
   
    // Update expiredDue document
    const updatedExpiredDue =await expiredDueModel.updateOne({_id:new ObjectId(paylode.id)},{$set:{sellingPrice:paylode.sellingPrice}})
    
   

    if (updatedExpiredDue.modifiedCount === 0) {
      throw new HttpError(400, "Bad Request", "Document not updated");
    }


      //Todo have to dekete the document
     if(updatedExpiredDue.modifiedCount===1){
        return 'somrat'
     }

  } catch (err) {
    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    }
  }
};

export = { expiredDues, getAllExpiredDues, patchExpiredDues };
