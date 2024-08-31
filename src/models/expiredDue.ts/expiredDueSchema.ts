
import { model, Schema } from "mongoose";
import dueType from "../../types/types";



const expiredDueSchema = new Schema<dueType
>({
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
  sellingPrice:{
    type:Number,
    required:true
 }

});

const expiredDueModel = model("expiredDues", expiredDueSchema);

export default expiredDueModel;
