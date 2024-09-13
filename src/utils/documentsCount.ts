import dayjs from "dayjs";




/**
 * 
 * @param documentsCountByModel 
 * @param searchBy 
 * @returns totalItems
 */
const count=async (documentsCountByModel:any,searchBy:string)=>{
  
     try{
        // formated date
         const formattedDate = dayjs(searchBy).format('YYYY-MM');
          
         // Filter 
        const filter = searchBy ? {sellingDate:{$regex:formattedDate,$options:'i'}} :{}
           
        // Count documents from db
        const totalItems = await documentsCountByModel.countDocuments(filter) as number;
         
        return totalItems ;
     }catch(err){
         console.log(err)
     }


};

export default count