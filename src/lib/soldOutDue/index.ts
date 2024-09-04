import soldOutDueModel from "../../models/soldOutDue/soldOutDueSchema";
import dueType from "../../types/types";
import HttpError from "../../utils/customError";

/**
 * 
 * @param paylode 
 * * return soldOut due
 * 
 */

const soldOutDues =async (paylode:dueType)=>{
  try{
    const soldOutDue = await soldOutDueModel.create(paylode);
     if(!soldOutDue){
         throw new HttpError(400,'Bad Request','Bad Request')
     }
     return soldOutDue
  }catch(err){
     if(err instanceof HttpError){
         throw new HttpError(err.status,err.code,err
            .message
         )
     }
  } 

}



export = {soldOutDues}