import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import count from "../../../../utils/documentsCount";
import query from "../../../../utils/query";
import dueModel from "../../../../models/due/dueSchema";

const allDues = asyncHandeler(
  async (req: Request, res: Response, next: NextFunction) => {
    // destructure query params
    const { page, limit, sortType, sortBy, searchBy } = req.query;

    
    // created queryParams
    const queryParams = {
      page: (typeof(page)==='undefined') ? 1 : Number(page),
      limit:(typeof(limit)==='undefined') ? 5 : Number(limit),
      sortType: (sortType as string) ?? "dsc",
      sortBy: (sortBy as string) ?? "expiredDate",
      searchBy: (searchBy as string) ?? "",
    };

    // Call allDues service for getting all dues from db
    const allDue = await dueService.allDues(queryParams);

    // Count total items depends on search for pagination
    const totalItems = (await dueService.count(searchBy as string)) as number;

    //const totalItems = await count(dueModel,searchBy as string) as number

    // get pagination data
    const pagination = query.getPagination({
      page: queryParams.page,
      limit: queryParams.limit,
      totalItems,
    });

    // getHateOs links
    const hateOsLinks = query.generateHateOsLinks({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });

    // Set Cache-Control header to cache the response for 60  seconds
    res.set({
      "Cache-Control": "public ,max-age=60",
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
    });
    console.log('api called')
    // Send response
    res.status(200).json({
      status: 200,
      code: "OK",
      message: "Data retrived succesfully",
      data: allDue,
      meta: pagination,
      hateOsLinks,
    });
    console.log('api called after response')
  }
);

export default allDues;
