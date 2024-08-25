
export type SortOrder = 1 | -1;

export type SortObject =  {
   [key: string]: SortOrder; // Any string key with a value of 1 or -1
 }