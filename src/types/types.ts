

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


export type TQueryParams = {
  page: number,
  limit: number,
  sortBy: string,
  sortType:string,
  searchBy: string
}


export type Tpagination = {
  page: number;
  limit: number;
  totalPage?: number;
  totalItems: number;
  next?: number;
  prev?: number;
};






export default dueType