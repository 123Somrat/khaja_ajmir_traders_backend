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
