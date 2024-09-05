import cron from "node-cron";
import dueModel from "../../models/due/dueSchema";
import dayjs from "dayjs";
import expiredDueService from "../expiredDue";
import dueService from "../due";
import mongoose from "mongoose";
import HttpError from "../../utils/customError";
import dueType from "../../types/types";

/**
 * * Run after every 6 hours
 * * Automatically Insert the expired due in expiredDue model
 * ! Delete the expired due from due model
 */

cron.schedule(
  "0 */6 * * *",
  async () => {
    // Create a seassion
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const today = dayjs().format("YYYY-MM-DD");

      // retrive the expired due from db
      const expiredDue = await dueModel
        .find({ expiredDate: { $lt: today } })
        .session(session);



      // Create a id array to which due have to delete
      const haveToDeleteDueFromDueModle = expiredDue.map((due) => due._id);

      //Formated data like expiredDue sche,a
      const formatedDataLikeExpiredDueSchema: dueType[] = expiredDue.map(
        ({ buyerName, sellerName, buyingPrice, buyingDate, expiredDate }) => {
          return {
            buyerName: buyerName,
            sellerName: sellerName,
            buyingPrice: buyingPrice,
            sellingPrice: 0,
            buyingDate: buyingDate,
            expiredDate: expiredDate,
          };
        }
      );

      // Insert and delete due
      if (expiredDue.length > 0) {
        // Called expiredDue service
        const insertedExpiredDue = await expiredDueService.expiredDues(
          formatedDataLikeExpiredDueSchema
        );

        // Delete thoses document if expiredDues add succesfully
        if ((insertedExpiredDue?.length as number) > 0) {
          // call the deleteDueService
          const deletedExpiredDueFromDueModel = await dueService.deleteDue(
            haveToDeleteDueFromDueModle
          );
        }
      }
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      throw new HttpError(err.status, err.code, err.message);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);
