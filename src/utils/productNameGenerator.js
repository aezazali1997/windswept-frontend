export const productName = (name) => {
  switch (name) {
    case 'EMB':
      return 'Emblems';
    // can be embed with other values
    default:
      return name;
  }
};
