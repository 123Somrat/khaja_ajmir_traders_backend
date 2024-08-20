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


/**
 * 
 * @param page 
 * @param limit 
 * @param sortType 
 * @param sortBy 
 * @param searchBy 
 * @returns Created due
 */
const allDues = async (
  page: number,
  limit: number,
  sortType: string,
  sortBy: string,
  searchBy: string
) => {
  // Retriveing data depends on search by
  const filter = searchBy
    ? { sellerName: { $regex: searchBy, $options: "i" } }
    : {};

  try {
    // retriveing all dues from db
    const allDues = await dueModel
      .find(filter)
      .sort(sortType)
      .skip(page * limit - limit)
      .limit(limit);

    return allDues;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "Opps something wrong on our side"
    );
  }
};


/**
 * 
 * @param searchBy 
 * @returns totalItems
 */
const count =async (searchBy:string)=>{
 const filter = {sellerName:{$regex:searchBy,$options:'i'}}
 const totalItems=await dueModel.countDocuments(filter)
 return totalItems

}




export = { createDue, allDues , count };
