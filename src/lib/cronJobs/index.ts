import cron from "node-cron";
import dueModel from "../../models/due/dueSchema";
import dayjs from "dayjs";
import expiredDueService from '../expiredDue'
import dueService from '../due'



/**
 * * Run after every 6 hours
 * * Automatically Insert the expired due in expiredDue model
 * ! Delete the expired due from due model
 */

cron.schedule(
  "* */6 * * *",
  async () => {
    console.log("Cron jobs running");

    try {
      const today = dayjs();
      // retrive the expired due from db
      const expiredDue = await dueModel.find({ ecpiredDate: { $lt: today } });
      // Create a id array to which due have to delete
      const haveToDeleteDueFromDueModle = expiredDue.map((due) => due._id);

      // Insert and delete due
      if (expiredDue.length > 0) {
        // Called expiredDue service
        const insertedExpiredDue = await expiredDueService.expiredDues(expiredDue)
  
         // call the deleteDueService
        const deletedExpiredDueFromDueModel = await dueService.deleteDue(haveToDeleteDueFromDueModle)
      }
    } catch (error) {
      console.error("Error executing cron job:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);
