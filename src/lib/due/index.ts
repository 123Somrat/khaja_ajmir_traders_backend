import dueModel from "../../models/due/dueSchema";
import dueType from "../../models/due/dueTypes";
import HttpError from "../../utils/customError";

/**
 *
 * @param duePaylode \
 * @returns
 */
const createDue = async (duePaylode: dueType) => {
 
  try {
    const createdDueInfo = await dueModel.create(duePaylode);
 
    return createdDueInfo;
  } catch (err) {
   
    throw new HttpError(
      500,
      "Internal server error",
      "Opps something wrong on our side"
    );
  }
};

export = { createDue };
