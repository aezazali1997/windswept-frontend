export const singleArray = (array)=>{
  const tempArr=[];
  for (let i=0; i<array.length; i++){
    tempArr.push(Number(array[i].value))
  }
  return tempArr;
}