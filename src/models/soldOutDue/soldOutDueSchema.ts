import { Schema , model} from "mongoose";
import dueType from "../../types/types";


const soldOutDueSchema = new Schema<dueType>({
     buyerName:{
         type:String,
         required:true
     },
     sellerName:{
         type:String,
         required:true
     },
     buyingPrice:{
         type:Number,
         required:true
     },
     sellingPrice:{
        type:Number,
        required:true
     },
     buyingDate:{
         type :String,
         required:true
     },
     expiredDate:{
         type:String,
         required:true
     }

})

const soldOutDueModel = model<dueType>('soldOutDue',soldOutDueSchema);


export default soldOutDueModel;