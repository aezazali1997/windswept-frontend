export const getpercentage = (value) => {
  let result = value.slice(value.length - 4, value.length - 1);
  return parseInt(result);
};
