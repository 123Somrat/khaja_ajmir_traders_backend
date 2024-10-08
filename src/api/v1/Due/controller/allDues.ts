import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import query from "../../../../utils/query";


const allDues = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const sortType = (req.query.sortType as string) || "dsc";
  const sortBy = (req.query.sortBy as string) || "expiredDate";
  const searchBy = (req.query.searchBy as string) || "";

  // Call allDues service for getting all dues from db
  console.time('response')
  const allDue = await dueService.allDues(
    page,
    limit,
    sortType,
    sortBy,
    searchBy
  );

  console.timeEnd('response')



console.time('times')
  // Count total items depends on search for pagination
  const totalItems = await dueService.count(searchBy);
 console.timeEnd('times')
  console.time('pagination')
  // get pagination data
  const pagination = query.getPagination({ page, limit, totalItems });
 console.timeEnd('pagination')

 console.time('hate')
  // getHateOs links
  const hateOsLinks = query.generateHateOsLinks({
    url: req.url,
    path: req.path,
    query: req.query,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
  });
 console.timeEnd('hate')
  // send response
  res.status(200).json({
    status: 200,
    code: "OK",
    message: "Data retrived succesfully",
    data: allDue,
    meta: pagination,
    hateOsLinks,
  });
  console.log('response done')
  

};

export default allDues;
