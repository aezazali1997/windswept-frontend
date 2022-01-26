export const updateValues = (originalArray, name, value, index) => {
    let abc = originalArray.map((item, i) => {
        if (i !== index) return item;
        item[name] = value;
        return item;
    })
    return abc
}


export const updateErrors = (originalArray, name, value, index) => {
    let abc = originalArray.map((item, i) => {
        if (i !== index) return item;
        item[name] = value;
        return item;
    })
    return abc
}

export const deserializeItems = (items,lineItemUnitPrice,lineItemUnitCost)=>{
    
    let itemDetails=[]
    for (let i=0; i<items.length; i++){
        let sumQuantity=0;
        let product_refcode = items[i].product;
        let material = items[i].material;
        let backing = items[i].backing;
        let percentage_embroidery = items[i].pe;
        let border = items[i].border;
        let shape = items[i].cut;
        let packaging = items[i].packaging;
        items[i].setQty.forEach((quantity) => {
          sumQuantity += Number(quantity.value);
        });
        let quantity = sumQuantity;
        let optional_item = items[i].optionalItem;
        let customer_markup = items[i].markup;
        let width = items[i].wCenter;
        let height = items[i].hCenter;
        let size = items[i].size;
        let colors = items[i].colors;

        // this needs to be optimise
        let unit_cost = '2.333 USD';
        let unit_price = '3.3333 USD';
        let line_item_id = items[i].line_item_id;
        itemDetails.push({
          product_refcode,
          material,
          backing,
          percentage_embroidery,
          border,
          shape,
          packaging,
          quantity,
          optional_item,
          customer_markup,
          width,
          height,
          size,
          colors,
          unit_cost,
          unit_price,
          line_item_id,
        });

    }
    return itemDetails;

}
// const deserializeImages= (images) =>{
//     let formData = new FormData();
//     for (let i=0; i<images.length; i++){
//     formData.append(`image${i}`,images[i]);
//     }
//     return JSON.stringify(formData);
// }
export const getInputClasses = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "border-red-500";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "border-blue-500";
    }

    return "";
};
