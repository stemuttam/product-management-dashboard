export const paginateData = (data, page, limit) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return data.slice(start, end);
};
