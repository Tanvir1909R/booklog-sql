["limit", "page", "sortBy", "sortOrder"];
type iOption = {
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
};
type iOptionsReturn = {
  limit: number;
  page: number;
  skip:number;
  sortBy: string;
  sortOrder: string;
};

const paginationHelper = (options: iOption):iOptionsReturn => {
  const limit = +(options.limit || 10);
  const page = +(options.page || 1);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return{
    limit,
    page,
    skip,
    sortBy,
    sortOrder
  }
};

export default paginationHelper;
