import { RequestHandler } from "express";
import expiredDueService from "../../../../lib/expiredDue";
import asyncHandeler from "../../../../utils/asyncHandeler";

const patchExpiredDues: RequestHandler = asyncHandeler(
  async (req, res, next) => {
    // Extract expiredDyes id
    const patchExpiredDuesId = req.params.id;
    const sellingPrice = Number(req.body.data.sellingPrice);
    const sellingDate = req.body.data.sellingDate;

    // call expiredDueService
    const dueUpdated = await expiredDueService.patchExpiredDues({
      id: patchExpiredDuesId,
      sellingPrice: sellingPrice,
      sellingDate: sellingDate,
    });

   
    // Send the response
    res.status(200).json({
      status: 200,
      code: "Ok",
      message: "Due soldOut successfully",
      data: dueUpdated,
    });
  }
);

export default patchExpiredDues;
