type Tpagination = {
  page: number;
  limit: number;
  totalPage?: number;
  totalItems: number;
  next?: number;
  prev?: number;
};



/**
 * 
 * @param param0 
 * @returns pagination data
 */
const getPagination = ({ page, limit, totalItems }: Tpagination) => {
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

export = { getPagination };
