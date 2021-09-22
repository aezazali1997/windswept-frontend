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


export const getInputClasses = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "border-red-500";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "border-blue-500";
    }

    return "";
};
