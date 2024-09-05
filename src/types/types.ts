import { ObjectId, Types } from "mongoose";

export type SortOrder = 1 | -1;

export type SortObject =  {
   [key: string]: SortOrder; // Any string key with a value of 1 or -1
 }

 type dueType = {
  buyerName: string;
  sellerName: string;
  buyingDate: string;
  sellingPrice:number;
  expiredDate: string;
  buyingPrice: number;
  sellingDate?:string
};
export default dueType;
