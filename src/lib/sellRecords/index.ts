import dayjs from "dayjs";
import soldOutDueModel from "../../models/soldOutDue/soldOutDueSchema";
import { TQueryParams } from "../../types/types";
import HttpError from "../../utils/customError";

/**
 *
 * @returns Sell Records
 */
const getAllSellRecords = async ({
  page,
  limit,
  sortBy,
  sortType,
  searchBy,
}: TQueryParams) => {
  // Search by MOnth or Year
  const searchByMonthOrYears =
    searchBy.split("-").length === 2
      ? dayjs(searchBy).format("YYYY-MM")
      : dayjs(searchBy).format("YYYY");

  // filter data
  const filter = searchBy
    ? { sellingDate: { $regex: searchByMonthOrYears, $options: "i" } }
    : {};

  try {
    // Retrived sell records and retur it
    const allSellRecords = await soldOutDueModel
      .find(filter)
      .sort(sortBy)
      .skip(page * limit - limit)
      .limit(5);

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
