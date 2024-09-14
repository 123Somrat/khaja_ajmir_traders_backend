import dayjs from "dayjs";
import soldOutDueModel from "../../models/soldOutDue/soldOutDueSchema";
import { SortObject, TQueryParams } from "../../types/types";
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
  // format the search field
  const formatedSearchBy = searchBy.split(" ").join("-");
  const currentmonth = dayjs().month() + 1;
  const currentYear = dayjs().year();

  // Search by MOnth or Year
  const searchByMonthOrYears = dayjs(
    formatedSearchBy,
    "YYYY-MMMM",
    true
  ).isValid()
    ? dayjs(searchBy).format("YYYY-MM")
    : dayjs(searchBy).format("YYYY");

  // filter data
  const filter = searchBy
    ? { sellingDate: { $regex: searchByMonthOrYears, $options: "i" } }
    : {
        sellingDate: {
          $regex: `${currentYear}-0${currentmonth}`,
          $options: "i",
        },
      };

  // Sorting pattern
  const sort: SortObject = {};
  sort[sortBy] = sortType === "asc" ? 1 : -1;

  try {
    // Retrived sell records and retur it
    const allSellRecords = await soldOutDueModel
      .find(filter)
      .sort(sort)
      .skip(page * limit - limit)
      .limit(limit);

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
