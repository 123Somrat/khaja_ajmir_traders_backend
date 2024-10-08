import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import count from '../../../../utils/documentsCount'
import query from "../../../../utils/query";
import dueModel from "../../../../models/due/dueSchema";


const allDues = asyncHandeler(async (req: Request, res: Response, next: NextFunction) => {

  // destructure query params
  const { page, limit, sortType, sortBy, searchBy } = req.query;


  // created queryParams
  const queryParams = {
    page: Number(page) ?? 1,
    limit: Number(limit) ?? 5,
    sortType: (sortType as string) ?? "dsc",
    sortBy: (sortBy as string) ?? "expiredDate",
    searchBy: (searchBy as string) ?? "",
  };


  // Call allDues service for getting all dues from db
  const allDue = await dueService.allDues(queryParams);
  
  // Count total items depends on search for pagination

  console.time('count')
  const totalItems = await dueService.count(searchBy as string) as number;
  console.timeEnd('count')
  
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

  // send response
  res.status(200).json({
    status: 200,
    code: "OK",
    message: "Data retrived succesfully",
    data: allDue,
    meta: pagination,
    //hateOsLinks,
  });
});

export default allDues;
