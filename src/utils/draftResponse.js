import { arrayGenerator } from './arrayGenerator';
export const deserializeDraftResponse = (items) => {
  let allItems = [];

  for (let i = 0; i < items.length; i++) {
    let item_id = items[i]['id'];
    let backing = items[i]['backing'] !== null ? items[i]['backing'] : '';
    let border = items[i]['border'] !== null ? items[i]['border'] : '';
    let colors = items[i]['colors'] !== null ? items[i]['colors'] : '';
    let cut = items[i]['shape'] !== null ? items[i]['shape'] : '';
    let hCenter = items[i]['height'] !== null ? items[i]['height'] : '';
    let wCenter = items[i]['width'] !== null ? items[i]['width'] : '';
    let material = items[i]['material'] !== null ? items[i]['material'] : '';
    let optionalItem = items[i]['optional_item'] !== null ? items[i]['optional_item'] : '';
    let packaging = items[i]['packaging'] !== null ? items[i]['packaging'] : '';
    let pe = items[i]['percentage_embroidery'] !== null ? items[i]['percentage_embroidery'] : '';
    let product = items[i]['product'] !== null ? items[i]['product'] : '';
    let quantitySum = items[i]['quantity'] !== null ? items[i]['quantity'] : '';
    let markup = items[i]['markup'] !== null ? items[i]['markup'] : '';
    let setQty = arrayGenerator(quantitySum);
    let size = items[i]['size'] !== null ? items[i]['size'] : '';
    let images = items[i]['images'] !== null ? items[i]['images'] : '';

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
      images,
      item_id
    };

    allItems.push(data);
  }
  return allItems;
};
