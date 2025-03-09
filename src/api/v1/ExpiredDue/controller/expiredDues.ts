import { RequestHandler } from "express";
import asyncHandeler from "../../../../utils/asyncHandeler";
import expiredDueService from "../../../../lib/expiredDue";
const allExpiredDues: RequestHandler = asyncHandeler(async (req, res, next) => {

  console.log('expired dues controller call')
  // Call getAllExpiredDues service
  const expiredDues = await expiredDueService.getAllExpiredDues();

  res.status(200).json({
    status: 200,
    code: "Ok",
    messege: "ExpiredDues retrived succesfully",
    data: expiredDues,
  });
});

export default allExpiredDues;
