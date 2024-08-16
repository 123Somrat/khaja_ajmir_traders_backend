import dayjs from "dayjs";
import z from "zod";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dueValidationSchma = z
  .object({
    buyerName: z
      .string({
        required_error: "BuyerName is required",
        invalid_type_error: "BuyerName must be a string",
      })
      .min(5, "BuyerName Must be 5 or more characters long"),
    sellerName: z
      .string({
        required_error: "SellerName is required",
        invalid_type_error: "SellerName must be a string",
      })
      .min(5, "SellerName Must be 5 or more characters long"),
    buyingPrice: z.coerce
      .number({
        required_error: "Buying price is required",
        invalid_type_error: "Buying price must be a number",
      })
      .positive()
      .nonnegative("Buying price can not negative"),
    buyingDate: z
      .string({
        required_error: "Expired date is required",
        invalid_type_error: "Expired date must be a date",
      })
      .date("Buying Date is required")
      .refine(
        (val) => {
          const today = Date.parse(dayjs().format("YYYY-MM-DD"));
          const buyingDate = Date.parse(
            dayjs(val, "YYYY-MM-DD", true).format("YYYY-MM-DD")
          );
          // Checking buying date is greter then today or not
          if (today > buyingDate) {
            return false;
          }
          return true;
        },
        {
          message: "Buying date must be greter then today",
          path: ["buyingDate"],
        }
      ),
    expiredDate: z
      .string({
        required_error: "Expired date is required",
        invalid_type_error: "Expired date must be a date",
      })
      .date("Expired Date is required")
      .refine(
        (val) => {
          const today = Date.parse(dayjs().format("YYYY-MM-DD"));
          const expiredDate = Date.parse(
            dayjs(val, "YYYY-MM-DD", true).format("YYYY-MM-DD")
          );

          // Checking expiredDate date is greter then today or not
          if (today > expiredDate) {
            return false;
          }

          return true;
        },
        {
          message: "Expired date can not be smaller then today",
          path: ["expiredDate"],
        }
      ),
  })
  .refine(
    (data) => {
      const buyingDate = Date.parse(
        dayjs(data.buyingDate, "YYYY-MM-DD", true).format("YYYY-MM-DD")
      );
      const expiredDate = Date.parse(
        dayjs(data.expiredDate, "YYYY-MM-DD", true).format("YYYY-MM-DD")
      );

      // Checking expiredDate  is greter then buyingDate or not
      if (buyingDate > expiredDate) {
        return false;
      }
      return true;
    },
    {
      message: "Expired date must be later than buying date",
      path: ["expiredDate"],
    }
  );

export default dueValidationSchma;
