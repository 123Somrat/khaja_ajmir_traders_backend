import soldOutDueModel from "../../models/soldOutDue/soldOutDueSchema";
import HttpError from "../../utils/customError";


/**
 * 
 * @returns Sell Records
 */
const getAllSellRecords = async () => {
  try {

    // Retrived sell records and retur it
    const allSellRecords = await soldOutDueModel.find({});

    return allSellRecords;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "Unexpected error occcured"
    );
  }
};

export = { getAllSellRecords };
