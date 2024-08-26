
export type SortOrder = 1 | -1;

export type SortObject =  {
   [key: string]: SortOrder; // Any string key with a value of 1 or -1
 }

 type dueType = {
  _id:string;
  buyerName: string;
  sellerName: string;
  buyingDate: string;
  expiredDate: string;
  buyingPrice: number;
};
export default dueType;
