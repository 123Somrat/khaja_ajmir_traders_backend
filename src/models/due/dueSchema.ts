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
    buyingDate: {
      type: String,
      required: true,
    },
    expiredDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const due = model<dueType>("dueModel", dueSchema);

export default due;
