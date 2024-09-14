import asyncHandeler from "../../../../utils/asyncHandeler";
import sellRecordsService from "../../../../lib/sellRecords";
import dayjs from "dayjs";
import soldOutDueModel from "../../../../models/soldOutDue/soldOutDueSchema";
import count from "../../../../utils/documentsCount";
import query from "../../../../utils/query";

const getAllSellRecords = asyncHandeler(async (req, res, next) => {
  const currentMonth = dayjs().format("YYYY-MMMM");

  const { page, limit, sortBy, sortType, searchBy } = req.query;

  const queryParams = {
    page: typeof page == "undefined" ? 1 : (Number(page) as number),
    limit: typeof limit == "undefined" ? 5 : (Number(limit) as number),
    sortBy: (sortBy as string) ?? "sellingPrice",
    sortType: (sortType as string) ?? "dsc",
    searchBy: (searchBy as string) ?? currentMonth,
  };

  // Call sellRecords service
  const allSellRecords = await sellRecordsService.getAllSellRecords(
    queryParams
  );

  //soldOutDueModel: mongoose.Model<dueType, {}, {}, {}, mongoose.Document<unknown, {}, dueType> & dueType & { _id: Types.ObjectId; }, any>, searchBy: unknown,
  // Counting documents from db depends on search
  const totalItems = (await count(
    soldOutDueModel,
    searchBy as string
  )) as number;

  const pagination = query.getPagination({
    page: queryParams.page,
    limit: queryParams.limit,
    totalItems,
  });

  // Send all sell record as response
  res.status(200).json({
    status: 200,
    code: "Ok",
    message: "Sell records retrive successfully",
    data: allSellRecords,
    meta: pagination,
  });
});

export default getAllSellRecords;
