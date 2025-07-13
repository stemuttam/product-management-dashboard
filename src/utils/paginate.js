export const paginateData = (data, page, limit = 10) => {
  const start = (page - 1) * limit;
  return data.slice(start, start + limit);
};
