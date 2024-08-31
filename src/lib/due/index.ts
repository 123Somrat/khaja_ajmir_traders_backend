import dayjs from "dayjs";
import dueModel from "../../models/due/dueSchema";
import HttpError from "../../utils/customError";
import dueType, { SortObject } from "../../types/types";
import mongoose, { Types } from "mongoose";
import expireDueService from "../expiredDue";

/**
 ** Create a due
 * @param duePaylode \
 * @returns
 */
const createDue = async (duePaylode: dueType) => {
  try {
    const createdDueInfo = await dueModel.create({...duePaylode,sellingPrice:''});

    return createdDueInfo;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "An unexpected error occurred"
    );
  }
};

/**
 * * Get all dues
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
  // Create a seassion
  const session = await mongoose.startSession();
  session.startTransaction();

  // get today Date
  const today = dayjs().format("YYYY-MM-DD");

  // Query for filter
  const filter = searchBy
    ? { sellerName: { $regex: searchBy, $options: "i" } }
    : {};

  // Construct sort object
  const sort: SortObject = {};
  sort[sortBy] = sortType === "asc" ? 1 : -1;

  try {
    // retriveing all dues from db
    const allDues = await dueModel
      .find(filter)
      .sort(sort)
      .skip(page * limit - limit)
      .limit(limit)
      .session(session);

    // filtering due dependes on date because i will insert the expired due in db
    const haveTimeDues = allDues.filter((due) => due.expiredDate > today);

    return haveTimeDues;
  } catch (err: any) {
    throw new HttpError(err.status, err.code, err.message);
  }
};

/**
 * * Get a single due
 * @param dueId
 * @returns due
 */
const getSingleDue = async (dueId: string) => {
  try {
    const due = await dueModel.findById(dueId);

    if (!due) {
      throw new HttpError(404, "Not found ", "No data found");
    }

    return due;
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
 * ! Delete due
 * @param dueIds
 */

const deleteDue = async (dueIds: Types.ObjectId[] | string) => {
  const deletedInfo = await dueModel.deleteMany({ _id: { $in: dueIds } });
  return deletedInfo;
};

/**
 * * Count the document depends on search query
 * @param searchBy
 * @returns totalItems
 */
const count = async (searchBy: string) => {
  // get today Date
  const today = dayjs().format("YYYY-MM-DD");

  // filter query
  const filter = searchBy
    ? { sellerName: { $regex: searchBy, $options: "i" } }
    : { expiredDate: { $gt: today } };

  // Counting item depends on filter query
  const totalItems = await dueModel.countDocuments(filter);

  return totalItems;
};

export = { allDues, createDue, getSingleDue, deleteDue, count };
