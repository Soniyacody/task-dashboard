const getMinDate = () => {
  return new Date().toISOString().split("T")[0];
};
const getMaxDate = () => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);
  return maxDate.toISOString().split("T")[0];
};

export { getMinDate, getMaxDate };
