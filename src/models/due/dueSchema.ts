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

const dueModel = model<dueType>("due", dueSchema);

export default dueModel;
