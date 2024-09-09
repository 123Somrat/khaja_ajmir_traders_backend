import asyncHandeler from "../../../../utils/asyncHandeler";

const getAllSellRecords = asyncHandeler(async (req, res, next) => {
  console.log("sell REcords path");
});

export default getAllSellRecords;
