import { Tpagination } from "../types/types";
import geneRateQueryString from "./queryStr";


/**
 *
 * @param param0
 * @returns pagination data
 */
const getPagination = ({ page, limit, totalItems }: Tpagination) => {

  console.log(page,limit,totalItems)
  const totalPage = Math.ceil(totalItems / limit);

  let next;
  let prev;

  const pagination: Tpagination = {
    page,
    limit,
    totalPage,
    totalItems,
    next,
    prev,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};





type Tlinks = {
  self: string;
  next?: string;
  prev?: string;
};

/**
 * 
 * @param param0 
 * @returns links
 */
const generateHateOsLinks = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  let next;
  let prev;
  const links: Tlinks = {
    self: url,
    next,
    prev,
  };

  if (hasNext) {
    const queryString = geneRateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryString}`;
  }

  if (hasPrev) {
    const queryString = geneRateQueryString({ ...query });
    links.prev = `${path}?${queryString}`;
  }

  return links;
};

export = { getPagination, generateHateOsLinks };
