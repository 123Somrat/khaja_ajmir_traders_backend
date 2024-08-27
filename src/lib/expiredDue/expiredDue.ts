import expiredDueModel from "../../models/expiredDue.ts/expiredDueSchema";
import dueType from "../../types/types";

const expiredDues =async (expiredDues:dueType[]) =>{

     const expiredDue = await expiredDueModel.insertMany(expiredDues)
     


}