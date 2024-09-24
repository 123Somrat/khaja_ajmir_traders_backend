import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import asyncHandeler from "../../../../utils/asyncHandeler";


const createDue = asyncHandeler(
  async (req: Request, res: Response, next: NextFunction) => {
    // extract data from req body
    const duePaylode = req.body.data;
    
    // Call due Service for create a due
    const createdDueInfo = await dueService.createDue(duePaylode);
     
    // send a response with created data
    res.status(201).json({
      status: 201,
      code: "Created succesfully",
      message: "Due created successfully",
      data: createdDueInfo,
    });
  }
);
export default createDue;
