export const createFilter = (search) => {
    let filter = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    
    return filter;
  };
  
  export const createPaginationInfo = (page, limit, totalData) => ({
    currentPage: page,
    totalPages: Math.ceil(totalData / limit),
    totalData,
    hasNextPage: page * limit < totalData,
    hasPrevPage: page > 1,
  });