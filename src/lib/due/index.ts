import dayjs from "dayjs";
import dueModel from "../../models/due/dueSchema";
import HttpError from "../../utils/customError";
import dueType, { SortObject } from "../../types/types";
import { Types } from "mongoose";

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
  const today = dayjs().format("YYYY-MM-DD");

  const filter = searchBy
    ? { sellerName: { $regex: searchBy, $options: "i" } }
    : { expiredDate: { $gt: today } };

  // Construct sort object
  const sort: SortObject = {};
  sort[sortBy] = sortType === "asc" ? 1 : -1;

  try {
    // retriveing all dues from db
    const allDues = await dueModel
      .find(filter)
      .sort(sort)
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
 *
 * @param searchBy
 * @returns totalItems
 */
const count = async (searchBy: string) => {
  const filter = { sellerName: { $regex: searchBy, $options: "i" } };
  const totalItems = await dueModel.countDocuments(filter);
  return totalItems;
};

export = { allDues, createDue, getSingleDue, count };
