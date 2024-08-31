import { Types } from "mongoose";

export type SortOrder = 1 | -1;

export type SortObject =  {
   [key: string]: SortOrder; // Any string key with a value of 1 or -1
 }

 type dueType = {
  _id:string | Types.ObjectId;
  buyerName: string;
  sellerName: string;
  buyingDate: string;
  sellingPrice:number;
  expiredDate: string;
  buyingPrice: number;
};
export default dueType;
