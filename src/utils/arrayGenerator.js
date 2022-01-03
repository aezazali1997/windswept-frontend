import { multiQty } from '../utils/consts';
export const arrayGenerator = (sum) => {
  let setQty = [];
  switch (sum) {
    // single selected cases
    case 50:
      setQty.push(multiQty[0]);
      break;
    case 100:
      setQty.push(multiQty[1]);
      break;
    case 200:
      setQty.push(multiQty[2]);
      break;

    case 300:
      setQty.push(multiQty[3]);
      break;
    case 500:
      setQty.push(multiQty[4]);
      break;
    case 1000:
      setQty.push(multiQty[5]);
      break;
    case 2000:
      setQty.push(multiQty[6]);
      break;
    case 3000:
      setQty.push(multiQty[7]);
      break;
    case 5000:
      setQty.push(multiQty[8]);
      break;

    // 2 comb mul cases
    case 150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      break;
    case 250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      break;

    case 350:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      break;
    case 550:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[4]);
      break;
    case 1050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[5]);
      break;
    case 2050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[6]);
      break;
    case 3050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[7]);
      break;
    case 5050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[8]);
      break;
    case 400:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      break;
    case 600:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      break;
    case 1100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[5]);
      break;
    case 2100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[6]);
      break;
    case 3100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[7]);
      break;
    case 5100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[8]);
      break;
    case 700:
      setQty.push(multiQty[2]);
      setQty.push(multiQty[4]);
      break;
    case 1200:
      setQty.push(multiQty[2]);
      setQty.push(multiQty[5]);
      break;
    case 2200:
      setQty.push(multiQty[2]);
      setQty.push(multiQty[6]);
      break;
    case 3200:
      setQty.push(multiQty[2]);
      setQty.push(multiQty[7]);
      break;
    case 5200:
      setQty.push(multiQty[2]);
      setQty.push(multiQty[8]);
      break;
    case 800:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      break;
    case 1300:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[5]);
      break;
    case 2300:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[6]);
      break;
    case 3300:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[7]);
      break;
    case 5300:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[8]);
      break;
    case 1500:
      setQty.push(multiQty[4]);
      setQty.push(multiQty[5]);
      break;
    case 2500:
      setQty.push(multiQty[4]);
      setQty.push(multiQty[6]);
      break;
    case 3500:
      setQty.push(multiQty[4]);
      setQty.push(multiQty[7]);
      break;
    case 5500:
      setQty.push(multiQty[4]);
      setQty.push(multiQty[8]);
      break;
    case 4000:
      setQty.push(multiQty[5]);
      setQty.push(multiQty[7]);
      break;
    case 6000:
      setQty.push(multiQty[5]);
      setQty.push(multiQty[8]);
      break;
    case 7000:
      setQty.push(multiQty[6]);
      setQty.push(multiQty[8]);
      break;
    case 8000:
      setQty.push(multiQty[7]);
      setQty.push(multiQty[8]);
      break;
    // 3 COMB CASES
    case 450:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      break;
    case 650:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      break;
    case 1150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[5]);
      break;
    case 2150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[6]);
      break;
    case 3150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[7]);
      break;
    case 5150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[8]);
      break;
    case 750:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[4]);
      break;
    case 1250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[5]);
      break;
    case 2250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[6]);
      break;
    case 3250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[7]);
      break;
    case 5250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[8]);
      break;
    case 5250:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[8]);
      break;
    case 850:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      break;
    case 1350:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[5]);
      break;
    case 2350:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[6]);
      break;
    case 3350:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[7]);
      break;
    case 5350:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[8]);
      break;
    case 1550:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[5]);
      break;
    case 2550:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[6]);
      break;
    case 3550:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[7]);
      break;
    case 5550:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[8]);
      break;
    case 3050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[6]);
      break;
    case 4050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[7]);
      break;
    case 6050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[8]);
      break;
    case 7050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[6]);
      setQty.push(multiQty[8]);
      break;
    case 8050:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[7]);
      setQty.push(multiQty[8]);
      break;
    case 900:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      break;
    case 1400:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[5]);
      break;
    case 2400:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[6]);
      break;
    case 3400:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[7]);
      break;
    case 5400:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[8]);
      break;
    case 1600:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[5]);
      break;
    case 2600:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[6]);
      break;
    case 3600:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[6]);
      break;
    case 5600:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[8]);
      break;
    case 4100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[7]);
      break;
    case 6100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[8]);
      break;
    case 7100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[6]);
      setQty.push(multiQty[8]);
      break;
    case 8100:
      setQty.push(multiQty[1]);
      setQty.push(multiQty[7]);
      setQty.push(multiQty[8]);
      break;
    case 1800:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[5]);
      break;
    case 2800:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[6]);
      break;
    case 3800:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[7]);
      break;
    case 5800:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[8]);
      break;
    case 4500:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[7]);
      break;
    case 6500:
      setQty.push(multiQty[3]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[8]);
      break;
    //3  needs a recheck
    case 12150:
      setQty.push(multiQty[0]);
      setQty.push(multiQty[1]);
      setQty.push(multiQty[2]);
      setQty.push(multiQty[3]);
      setQty.push(multiQty[4]);
      setQty.push(multiQty[5]);
      setQty.push(multiQty[6]);
      setQty.push(multiQty[7]);
      setQty.push(multiQty[8]);
  }
  return setQty;
};
