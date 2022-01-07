import { arrayGenerator } from './arrayGenerator';
export const deserializeDraftResponse = (items) => {
  let allItems = [];

  for (let i = 0; i < items.length; i++) {
    let item_id = items[i]['id'];
    let backing = items[i]['backing'];
    let border = items[i]['border'];
    let colors = JSON.parse(items[i]['colors']);
    let cut = items[i]['shape'];
    let hCenter = items[i]['height'];
    let wCenter = items[i]['width'];
    let material = items[i]['material'];
    let optionalItem = items[i]['optional_item'];
    let packaging = items[i]['packaging'];
    let pe = items[i]['percentage_embroidery'];
    let product = items[i]['product'];
    let quantitySum = items[i]['quantity'];
    let markup = items[i]['markup'];
    let setQty = arrayGenerator(quantitySum);
    let size = items[i]['size'];
    let data = {
      backing,
      border,
      colors,
      cut,
      hCenter,
      wCenter,
      material,
      optionalItem,
      packaging,
      pe,
      product,
      setQty,
      size,
      markup,
      item_id
    };

    allItems.push(data);
  }
  return allItems;
};
