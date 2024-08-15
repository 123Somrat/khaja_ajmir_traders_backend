import dayjs from "dayjs";
import z from "zod";
const dueValidationSchma = z.object({
  buyerName: z
    .string({
      required_error: "BuyerName is required",
      invalid_type_error: "BuyerName must be string type",
    })
    .min(1, "BuyName can not be empty"),
  sellerName: z
    .string({
      required_error: "SellerName is required",
      invalid_type_error: "SellerName must be a string",
    })
    .min(1, "Seller name can not empty"),
  buyingPrice: z
    .number({
      required_error: "Buying price is required",
      invalid_type_error: "Buying price must be a number",
    })
    .positive()
    .nonnegative("Buying price can not be negative"),
  buyingDate: z
    .string({
      required_error: "Buying date is required",
      invalid_type_error: "Buying date must be a string",
    })
    .date().refine((val)=>{
       const day = dayjs()
        console.log(day)  
    })
});


export default dueValidationSchma;
