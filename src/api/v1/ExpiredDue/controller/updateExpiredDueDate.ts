import asyncHandeler from "../../../../utils/asyncHandeler";
import expiredDueService from "../../../../lib/expiredDue";
const updateExpiredDueDate = asyncHandeler(async (req, res, next) => {
  // Gettign id and data from req
  const id = req.params.id;
  const updatedBuyingPrice = req.body.data.updatedBuyingPrice;
  const updatedExpiredDueDate = req.body.data.updatedExpiredDate;

 

  // Call updateExpiredDue service for update expiredDate
  const updatedDue = await expiredDueService.updateExpiredDueDates({
    id,
    updatedBuyingPrice,
    updatedExpiredDueDate,
  });


  // Send updated due as a response
  res.status(200).json({
    status: 200,
    code: "Ok",
    message: "Due updated succesfully",
    data: updatedDue,
  });
});

export default updateExpiredDueDate;
