import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import asyncHandeler from "../../../../utils/asyncHandeler";

const addDue = asyncHandeler(
  async (req: Request, res: Response, next: NextFunction) => {
    // extract data from req body
    const duePaylode = req.body.dueData;

    // Call due Service for create a due
    const dueCreatedInfo = await dueService.addDue(duePaylode);

    // send a response with created data
    res.status(201).json({
      status: 201,
      code: "Ok",
      message: "Due created successfully",
      data: dueCreatedInfo,
    });
  }
);
export default addDue;
