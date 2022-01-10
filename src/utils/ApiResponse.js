import { arrayGenerator } from './arrayGenerator';
export const deserializeApiResponse = (items) => {
  let allItems = [];

  for (let i = 0; i < items.length; i++) {
    let line_item_id = items[i]['object_ref']['line_item_id'];
    let backing = items[i]['object_ref']['backing'];
    let border = items[i]['object_ref']['border'];
    let colors = items[i]['object_ref']['colors'];
    let cut = items[i]['object_ref']['shape'];
    let hCenter = items[i]['object_ref']['height'];
    let wCenter = items[i]['object_ref']['width'];
    let material = items[i]['object_ref']['material'];
    let optionalItem = items[i]['object_ref']['optional_item'];
    let packaging = items[i]['object_ref']['packaging'];
    let pe = items[i]['object_ref']['percentage_embroidery'];
    let product = items[i]['object_ref']['product'];
    let quantitySum = items[i]['object_ref']['unit_quantity'];
    let markup = items[i]['object_ref']['markup'];
    let setQty = arrayGenerator(quantitySum);
    let size = items[i]['object_ref']['cf_opportunity_line_item_size'];
    let data = {
      line_item_id,
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
      markup
    };
    allItems.push(data);
  }
  return allItems;
};
