import cron from "node-cron";
import dueModel from "../../models/due/dueSchema";
import dayjs from "dayjs";
import expiredDueService from "../expiredDue";
import dueService from "../due";
import mongoose from "mongoose";
import HttpError from "../../utils/customError";

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
      const today = dayjs();
      console.log("inside try block");
      // retrive the expired due from db
      const expiredDue = await dueModel
        .find({ ecpiredDate: { $lt: today } })
        .session(session);
      // Create a id array to which due have to delete
      const haveToDeleteDueFromDueModle = expiredDue.map((due) => due._id);

      // Insert and delete due
      if (expiredDue.length > 0) {
        // Called expiredDue service
        const insertedExpiredDue = await expiredDueService.expiredDues(
          expiredDue
        );

        // call the deleteDueService
        const deletedExpiredDueFromDueModel = await dueService.deleteDue(
          haveToDeleteDueFromDueModle
        );
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
