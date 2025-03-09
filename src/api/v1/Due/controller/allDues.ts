import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request, Response, NextFunction } from "express";
import dueService from "../../../../lib/due";
import count from "../../../../utils/documentsCount";
import query from "../../../../utils/query";
import dueModel from "../../../../models/due/dueSchema";
import successDto from "../../../../utils/successDto";

const allDues = asyncHandeler(
  async (req: Request, res: Response, next: NextFunction) => {
    // destructure query params
    const { page, limit, sortType, sortBy, searchBy } = req.query;

    // created queryParams
    const queryParams = {
      page:
        page === undefined || isNaN(Number(page)) || Number(page) < 1
          ? 1
          : Number(page),
      limit:
        limit === undefined || isNaN(Number(limit)) || Number(limit) < 1
          ? 5
          : Number(limit),
      sortType:
        sortType === undefined ||
        sortType === "" ||
        (sortType !== "asc" && sortType !== "dsc")
          ? "asc"
          : sortType,
      sortBy:
        sortBy === undefined || sortBy === "" || sortBy !== "expiredDate"
          ? "expiredDate"
          : sortBy,
      searchBy:
        searchBy === undefined || searchBy === "" || searchBy !== "sellerName"
          ? "sellerName"
          : searchBy,
    };

    // Call allDues service for getting all dues from db
    const allDue = await dueService.allDues(queryParams);

   console.log(allDue)

    // Count total items depends on search for pagination
    const totalItems = (await dueService.count(searchBy as string)) as number;

    // get pagination data
    const pagination = query.getPagination({
      page: queryParams.page,
      limit: queryParams.limit,
      totalItems,
    });

    // getHateOs links
    const hateOsLinks = query.generateHateOsLinks({
      url: req.url.split("?")[0],
      path: req.path,
      query: queryParams,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });

    //successDto(res,200,"OK","Data retrived succesfully",allDue,pagination,hateOsLinks)

    // Send response
    res.status(200).json({
      status: 200,
      code: "OK",
      message: "Data retrived succesfully",
      data: allDue,
      meta: pagination,
      hateOsLinks,
    });
  }
);

export default allDues;
