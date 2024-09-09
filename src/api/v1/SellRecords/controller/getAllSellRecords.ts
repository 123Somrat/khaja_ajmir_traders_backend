import asyncHandeler from "../../../../utils/asyncHandeler";
import sellRecordsService from '../../../../lib/sellRecords'
const getAllSellRecords = asyncHandeler(async (req, res, next) => {

       // Call sellRecords service
       const allSellRecords = await sellRecordsService.getAllSellRecords()


       // Send all sell record as response
      res.status(200).json({
        status:200,
        code:'Ok',
        message:'Sell records retrive successfully',
        data:allSellRecords
      })



});

export default getAllSellRecords;
