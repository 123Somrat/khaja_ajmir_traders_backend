import { optional } from 'zod';
import { model, Schema } from "mongoose";
import dueType from "./dueTypes";

const dueSchema = new Schema<dueType>(
  {
    buyerName: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
    buyingDate: {
      type: String,
      required: true,
    },
    expiredDate: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);
// Create an index on the 'expiredDate' field for efficient querying
dueSchema.index({sellerName : 1 , expiredDate : 1})

// Create due Model useing schema
const dueModel = model<dueType>("due", dueSchema);

export default dueModel;
