export const getQuantitySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += Number(array[i].value);
  }
  return sum;
};
