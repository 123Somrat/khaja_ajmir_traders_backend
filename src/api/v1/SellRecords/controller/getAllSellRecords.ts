import asyncHandeler from "../../../../utils/asyncHandeler";
import sellRecordsService from '../../../../lib/sellRecords'
import dayjs from "dayjs";
const getAllSellRecords = asyncHandeler(async (req, res, next) => {


    const currentMonth = dayjs().format('YYYY-MM')
        
      const {page,limit,sortBy,sortType,searchBy} = req.query;
      const queryParams = {
         page:Number(page) | 1,
         limit:Number(limit) | 5,
         sortBy:sortBy as string ?? 'sellingPrice',
         sortType:sortType as string ?? 'dsc',
         searchBy:searchBy as string ?? currentMonth
      }


       // Call sellRecords service
       const allSellRecords = await sellRecordsService.getAllSellRecords(queryParams)
       

       // Send all sell record as response
      res.status(200).json({
        status:200,
        code:'Ok',
        message:'Sell records retrive successfully',
        data:allSellRecords
      })



});

export default getAllSellRecords;
