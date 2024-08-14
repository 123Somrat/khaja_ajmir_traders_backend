import dueModel from "../../models/due/dueSchema";
import dueType from "../../models/due/dueTypes";
import HttpError from "../../utils/customError";


const addDue =async (duePaylode:dueType)=>{

   try{
     const data = await dueModel.create(duePaylode);
    return data
   }catch(err){
      throw new HttpError(500,'Internal server error', "Opps something wrong on our side")
   }
   
   

}

export ={addDue}