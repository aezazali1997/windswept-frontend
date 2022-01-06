import { multiQty } from '../utils/consts';
export const arrayGenerator = (sum) => {
  let setQty = [];
  let i = multiQty.length - 1;
  while (sum !== 0) {
    if (multiQty[i].value <= sum) {
      setQty.push(multiQty[i]);
      sum -= multiQty[i].value;
    }
    i--;
  }
  return setQty;
};
