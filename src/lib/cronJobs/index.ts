import cron from "node-cron";
import dueModel from "../../models/due/dueSchema";
import dayjs from "dayjs";
import expiredDueModel from "../../models/expiredDue.ts/expiredDueSchema";

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
        const insertedExpiredDue = await expiredDueModel.insertMany(expiredDue);
       
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
