import { Types } from "mongoose";
import expiredDueModel from "../../models/expiredDue/expiredDueSchema";
import dueType from "../../types/types";
import HttpError from "../../utils/customError";
import { ObjectId } from "mongodb";
import soldOutDueService from "../soldOutDue";
import dueService from "../due";
/**
 *
 * @param expiredDues
 * @returns expiredDues
 */
const expiredDues = async (expiredDues: dueType[]) => {
  try {
    const expiredDue = await expiredDueModel.create(expiredDues);

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
    const expiredDues = await expiredDueModel.find({});
   
    return expiredDues;
  } catch (err) {
    console.log("from expired dues error block", err);
    throw new HttpError(
      500,
      "Internal server error",
      "An unexpected error occured"
    );
  }
};


/**
 * 
 * @param id updatedBuyingPrice updatedExpiredDueDate
 * @returns newCreatedDue
 */

const updateExpiredDueDates = async ({
  id,
  updatedBuyingPrice,
  updatedExpiredDueDate,
}: {
  id: string;
  updatedBuyingPrice: string;
  updatedExpiredDueDate: string;
}) => {
  try {

     // Checking data exiest or not
    const isDueExeist = await expiredDueModel.findById(id);

 
    // Throwing error
    if (!isDueExeist) {
      console.log('inside not fund')
      throw new HttpError(404, "Not Found", "Not exeist");
    }
   

    // formatted newDue object
    const newDue = isDueExeist && {
      buyerName: isDueExeist?.buyerName,
      sellerName: isDueExeist?.sellerName,
      buyingPrice: Number(updatedBuyingPrice),
      buyingDate: isDueExeist?.buyingDate,
      expiredDate: updatedExpiredDueDate,
      sellingPrice: 0,
    };

    // Delete oldDueFromExpiredDueModal afetr insert in dueModel
    const newCreatedDue = await dueService.createDue(newDue);

    if (newCreatedDue) {
      const deletedOldDue = await expiredDueModel.findByIdAndDelete(id);
    }

    return newCreatedDue;

    
  } catch (err) {

    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    } else {
   
      throw new HttpError(
        500,
        "Internal server error",
        "An unexpected error occurred"
      );
    }
  }
};

/**
 *
 * @param paylode
 * * Updated the expired due selling price
 * * After updated succesfully then insert the expired due into SoldOut due
 * * After succesfully insert the due into sold out due then delete it from expired dues
 */
const patchExpiredDues = async (paylode: {
  id: string;
  sellingPrice: number;
  sellingDate: string;
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
    // If due updated succesfully then insert The due into soldOur due scchema
    if (updatedExpiredDue) {
      const soldOutDue = await soldOutDueService.soldOutDues({
        buyerName: updatedExpiredDue.buyerName,
        sellerName: updatedExpiredDue.sellerName,
        buyingPrice: updatedExpiredDue.buyingPrice,
        sellingPrice: updatedExpiredDue.sellingPrice,
        buyingDate: updatedExpiredDue.buyingDate,
        expiredDate: updatedExpiredDue.expiredDate,
        sellingDate: paylode.sellingDate,
      });

      //After insert the due into soldOut due schema then Deleted dues from expired dues
      if (soldOutDue) {
        const deletedSoldDue = await deleteAexpiredDue(paylode.id);

        return deletedSoldDue;
      }
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

export = {
  expiredDues,
  getAllExpiredDues,
  updateExpiredDueDates,
  patchExpiredDues,
};
