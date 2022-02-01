import { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { isEmptyArray, useFormik } from 'formik';
import { isEmpty } from 'lodash';
import store from '../store';
import { storeOrderCache } from '../actions';
import { updateErrors, updateValues } from '../utils/helpers';
import axiosInstance from '../APIs/axiosInstance';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import imgPlaceHolder from '../assets/place.png'

// import { useHistory } from 'react-router-dom';
import { OrderFormSchema } from '../utils/validation_schema';
import { useLocation } from 'react-router-dom';
import { Error,ERROR,ITEM,Item } from '../constants/Order.constants';
import { deserializeApiResponse } from '../utils/ApiResponse';
import { deserializeDraftResponse } from '../utils/draftResponse';
import { getQuantitySum } from '../utils/arraySum';
import {singleArray } from '../utils/singleArray'
import '../styles/custom-style.css';
import { getpercentage } from '../utils/percentageCalculator';
import { arrayGenerator } from '../utils/arrayGenerator';

// let fileArray = [];
// let serverImages=[];
let fileObj = null;

const UseFetchNewOrder = ({ selectedOrder, readOnly,setReadOnly,showQuantityModal,setShowQuantityModal,setShowCustomOrderModel,showCustomOrderModel }) => {
  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  // const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [canAddAnother, setCanAnother] = useState(true);
  const [orderNo, setOrderNo] = useState(0);
  const [date, setDate] = useState('');
  const [week, setWeek] = useState(36);

  const [images, setImages] = useState([]);
  // const [ImageFiles, setImageFiles] = useState([]);
  const [orderImages, setOrderImages] = useState('');
  const [selected, setSelected] = useState([]);
  const [color, setColor] = useState('');
  const [notes, setNotes] = useState('');
  const [values, setValues] = useState([Item]);
  const [errors, setErrors] = useState([Error]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [gTotalWithMarkup, setGrandTotalWithMarkup] = useState(0);
  const [lineItemUnitCost,setLineItemUnitCost]=useState(0);
  const [lineItemUnitPrice,setLineItemUnitPrice]=useState(0);
  const [apiError, setAPIError] = useState('');
  const [showPMSModal, setShowPMSModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [draftId,setDraftId]=useState(0);
  
  useEffect(() => {
    if (selectedOrder) {
      let [date, notes] = ['', ''];
      let items = [];
      if (selectedOrder['object_ref']) {
        let { document_date, cf_opportunity_portal_notes, opp_line_items } =
          selectedOrder['object_ref'];
        items = opp_line_items;
         for (let i=1; i<items.length; i++){
              let tmp=errors
              tmp.push({...Error})
              setErrors([...tmp])
          }

        date = document_date;
        notes = cf_opportunity_portal_notes;
        // setOrderImages(selectedOrder?.object_ref?.purchase_order_image);
      } else {
        items = selectedOrder.items;
         for (let i=1; i<items.length; i++){
              let tmp=errors
              tmp.push({...Error})
              setErrors([...tmp])
          }
        

        // for (let i = 0; i < items.length; i++) {
        //   items[i] = items[i];
        // //   // JSON.parse(items[i]);
          
        // }
        if(query.get('active')==='saved-as-draft'){
          setDraftId(selectedOrder.id);
        }
        date = selectedOrder.in_hands_date ? selectedOrder.in_hands_date : selectedOrder.date;
        notes = selectedOrder.customer_notes;

      }
      if (!isEmptyArray(items)) {
        let [product, material, backing, pe, setQty] = ['', '', '', '', ''];
        if (items[0]['object_ref']) {
          items.map((item,index) => {
           
            item = item['object_ref'];
            
            product = item['product'];
            if(!isEmpty(product)){
            let updatedErrorArray = updateErrors([...errors], 'product', false, index);
              setErrors([...updatedErrorArray]);
            }
            material = item['material'];
            if(!isEmpty(material)){
              let updatedErrorArray = updateErrors([...errors], 'material', false, index);
              setErrors([...updatedErrorArray]);
            }
            backing = item['backing'];
            if(!isEmpty(backing)){
              let updatedErrorArray = updateErrors([...errors], 'backing', false, index);
              setErrors([...updatedErrorArray]);
            }
            pe = item['percentage_embroidery'];
            if(!isEmpty(pe)){
              let updatedErrorArray = updateErrors([...errors], 'pe', false, index);
              setErrors([...updatedErrorArray]);
            }
            setQty = item['unit_quantity'];
            if(setQty > 0){
              let updatedErrorArray = updateErrors([...errors], 'qty', false, index);
              setErrors([...updatedErrorArray]);
            }
            if (product === '' || material === '' || backing === '' || pe === '' || setQty === '') {
              DisableAddAnother();
            } else {
              EnableAddAnother();
            }
            setDate(date);
            
          });
          items = deserializeApiResponse(items);
          for (let i = 0; i < items.length; i++) {
            setSelected([...items[i].setQty]);
          }
         
        } else {
    
          items.map((item) => {
            product = item.product;
            if(!isEmpty(product)){
            let updatedErrorArray = updateErrors([...errors], 'product', false, orderNo);
              setErrors([...updatedErrorArray]);
            }
            material = item.material;
            if(!isEmpty(material)){
            let updatedErrorArray = updateErrors([...errors], 'material', false, orderNo);
              setErrors([...updatedErrorArray]);
            }
            backing = item.backing;
            if(!isEmpty(backing)){
            let updatedErrorArray = updateErrors([...errors], 'backing', false, orderNo);
              setErrors([...updatedErrorArray]);
            }
            pe = item.percentage_embroidery;
            if(!isEmpty(pe)){
            let updatedErrorArray = updateErrors([...errors], 'pe', false, orderNo);
              setErrors([...updatedErrorArray]);
            }
            setQty = item.quantity;
            if(setQty > 0){
              let updatedErrorArray = updateErrors([...errors], 'qty', false, orderNo);
              setErrors([...updatedErrorArray]);
            }
            if (product === '' || material === '' || backing === '' || pe === '' || setQty === '') {
              DisableAddAnother();
              let error = JSON.parse(JSON.stringify(Error));
              
            } else {
              EnableAddAnother();
            }
            setDate(date);
          });
          items = deserializeDraftResponse(items);
        }
        

        setValues(items);
        setNotes(notes);
        setWeek(week);
      
          
        if(selectedOrder && values){
          callAPI(selectedOrder);
        }
        
        // setData([items]);
      }
    }
  }, []);
  useEffect(()=>{
    callAPI();
  },[orderNo])
  useEffect(() => {
    //  in case of open orders and closed orders. it created an issue which needs to be resolved
    _Total();
    return ()=> setTotal(0);
  }, [data]);

  
    useEffect(()=>{
    _grandTotal();
    return ()=>setGrandTotal(0);
  },[total,week])
  useEffect(()=>{
 _GrandTotalWithMarkup();
 return ()=>setGrandTotalWithMarkup(0);
  },[grandTotal,week,values[orderNo].markup])

     
  

  const initialValues = {
    title: selectedOrder?.object_ref?.cf_opportunity_item_name || selectedOrder?.title || selectedOrder?.name || '',
    reference: selectedOrder?.object_ref?.customer_ref || selectedOrder?.reference || selectedOrder?.customer_ref ||  '',
    date: date || '',
    shipAddress:
      selectedOrder?.object_ref?.cf_opportunity_ship_to_address || selectedOrder?.shipAdress || selectedOrder?.ship_to_address ||  '',
    customerNote: notes || ''
  };

  let upload = useRef();

  const quanityChangeModelPopUp =() =>{
    // 
     Swal.fire({
          text:"You have changed something in this order therefore Windswept will review this and get back to you via email",
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton:
              'w-96 inline-flex bg-red-600 justify-center border border-red-600 hover:bg-transparent  hover:text-red-600 px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        })
    setShowQuantityModal(false);
  }
  let onChangeFile = (event) => {
    
    let imageFiles = [];
    let blobImagesArray=[];
    fileObj = event.target.files;
    for (let i = 0; i < fileObj.length; i++) {
      imageFiles.push(fileObj[i]);
      blobImagesArray.push(URL.createObjectURL(fileObj[i]));
    }
    let tmpValues = [...values]
    tmpValues[orderNo].images= [...imageFiles] 
    tmpValues[orderNo].blobImages=[...blobImagesArray]
     setValues([...tmpValues])
    // setImageFiles([...imageFiles]);
    // setImages([...fileArray]);
  };

  let handleClick = () => {
    upload.current.click();
  };

  let handleRemoveImg = (index,orderIndex) => {
    if (!readOnly) {
      let tmpValues = [...values];
      tmpValues[orderIndex].blobImages.splice(index, 1)
      tmpValues[orderIndex].images.splice(index, 1)
      // CopyOriginal.splice(index,1);
      // fileArray.splice(index, 1);
      // setImages(CopyOriginal);
      setValues([...tmpValues]);
    }
  };
  let orderUpload = useRef();

  let onChangeOrderFile = (event) => {
    const { files } = event.target;
    setOrderImages(files[0]); /// if you want to upload latter
  };

  let OrderUploadClick = () => {
    orderUpload.current.click();
  };

  let handleRemoveOrderImg = (index) => {
    if (!readOnly) {
      setOrderImages((orderImages) => (orderImages = ''));
    }
  };

  const handleNotes = (value) => {
    setNotes((notes) => (notes = value));
    const { title, reference } = initialValues;
    const data = [
      {
        title,
        reference,
        date,
        images,
        purchaseOrders: orderImages,
        value,
        items: [...values],
        errors: [...errors]
      }
    ];
    store.dispatch(storeOrderCache(data));
  };

  const _HandleChange = (e, index) => {
    

    const { name, value, checked } = e.target;
    const NewArray = [...values];
    const NewErrors = [...errors];
    let updatedErrorArray = [];
    let updatedArray = [];

    if (name === 'product' || name === 'material' || name === 'pe' || name === 'backing') {
      if (value === '') {
        updatedErrorArray = updateErrors(NewErrors, name, true, index);
        updatedArray = updateValues(NewArray, name, value, index);
        setErrors([...updatedErrorArray]);

        setValues([...updatedArray]);
      } else {
        updatedErrorArray = updateErrors(NewErrors, name, false, index);
        updatedArray = updateValues(NewArray, name, value, index);
        setErrors([...updatedErrorArray]);
        setValues([...updatedArray]);
        
        
        callAPI();
      }
      const { product, material, backing, pe, setQty } = updatedArray[orderNo];
      if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
        DisableAddAnother();
      } else {
        EnableAddAnother();
      }
    } else if (name === 'discountApply') {
      let updatedArray = updateValues(NewArray, name, checked, index);
      setValues([...updatedArray]);
    } else if (name === 'date') {

      let now = moment(new Date()); //todays date
      let end = moment(value); // end date
      let weeks = end.diff(now, 'weeks');
      setDate(value);
      setWeek(weeks);
      // setTotal(0);
      // setGrandTotal(0);
    } else {
      let updatedArray = updateValues(NewArray, name, value, index);
      setValues([...updatedArray]);
    }
    if(name==='wRight' || name==='wLeft' || name==='hRight' || name==='hLeft')
   {
    handleSize(orderNo);
   }
     
  };

  let handleSize = (orderNo) => {
    // seperate the logic of height and width
    let [hLeft, hRight, HResult, wRight, WResult, wLeft] = [0, 0, 0, 0, 0, 0];

    if (values[orderNo].hLeft && values[orderNo].hRight) {
      hLeft = values[orderNo].hLeft;
      hRight = values[orderNo].hRight;
      if (hRight !== '0') {
        let newHeightCenter = hRight.split('/');
        let HeightNum = parseInt(newHeightCenter[0]);
        let HeightDen = parseInt(newHeightCenter[1]);
        HResult = HeightNum / HeightDen;
      }
    }
    if (values[orderNo].wLeft && values[orderNo].wRight) {
      wLeft = values[orderNo].wLeft;
      wRight = values[orderNo].wRight;
      if (wRight !== '0') {
        let newWidthCenter = wRight.split('/');
        let WidthNum = parseInt(newWidthCenter[0]);
        let WidthDen = parseInt(newWidthCenter[1]);
        WResult = WidthNum / WidthDen;
      }
    }

    let size = (parseInt(wLeft) + WResult + (parseInt(hLeft) + HResult)) / 2;
    let roundedhalf = Math.round(size * 2) / 2;

    let CopyOriginal = [...values];

    let UpdateArray = CopyOriginal.map((item, i) => {
      if (i !== orderNo) return item;
      item.wCenter = WResult;
      item.hCenter = HResult;
      item.size = roundedhalf;
      return item;
    });
    setValues([...UpdateArray]);
    callAPI();
  };
  let callAPI = async (selectedOrder) => {
    let [product,material,backing,size,pe,colors,setQty]=[null];
    if(selectedOrder?.object_ref?.opp_line_items){
      product=selectedOrder.object_ref.opp_line_items[orderNo].object_ref.product;
      material = selectedOrder.object_ref.opp_line_items[orderNo].object_ref.material;
      backing = selectedOrder.object_ref.opp_line_items[orderNo].object_ref.backing;
      size = selectedOrder.object_ref.opp_line_items[orderNo].object_ref.cf_opportunity_line_item_size;
      pe = selectedOrder.object_ref.opp_line_items[orderNo].object_ref.percentage_embroidery;
      colors= selectedOrder.object_ref.opp_line_items[orderNo].object_ref.colors;
      setQty = arrayGenerator(selectedOrder.object_ref.opp_line_items[orderNo].object_ref.unit_quantity); 
    }
    else{
      product=values[orderNo].product;
      material = values[orderNo].material;
      backing = values[orderNo].backing;
      size = values[orderNo].size;
      pe = values[orderNo].pe;
      colors= values[orderNo].colors;
      setQty =values[orderNo].setQty;
 
    }
    // if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
    //   swal({
    //     text: 'Fill Mandatory Fields',
    //     icon: 'error',
    //     dangerMode: true,
    //     buttons: false,
    //     timer: 3000
    //   });
    // } else {
    if (product !== '' && material !== '' && backing !== '' && pe !== '' && !isEmpty(setQty)) {
      const data = {
        product: product,
        material: material,
        backing: backing,
        size: size,
        pc: getpercentage(pe),
        selectedQuantity:singleArray(setQty),
        addColor: colors?.length,
        markup: Number(localStorage.getItem('markup'))
      };
      try {
        let res= await axiosInstance.ordereEstimate(data)
          if( res.data[0].error){
          if(showCustomOrderModel){
            swal({
              text: 'Custom Quote will be given in 1-2 days',
              icon: 'info',
              dangerMode: true,
              buttons: false,
              timer: 3000
            });
            setTotal(0);
            setGrandTotal(0);
            setGrandTotal(0);
            setData([]);
          }
          setAPIError('Custom Quote will be given in 1-2 days');
          setShowCustomOrderModel(false); 
      } 
      else {
        setAPIError('');
            setData(res.data);
            for (let i=0; i<values.length; i++){
              values[i].data=res.data
            }
            let unit_cost=0;
            let unit_price=0;
            for (let i=0; i< res.data.length; i++){
              unit_price+=Number(res.data[i].unitPrice)
              unit_cost+=Number(res.data[i].unitCost)
            }
            setLineItemUnitCost(Number(unit_cost.toFixed(4)));
            setLineItemUnitPrice(Number(unit_price.toFixed(4)))
            // values.forEach((value)=>{
            //   value.data=res.data
            // })
            _Total();
            // _grandTotal();
            
      }
      } catch (error) {
          if (apiError==='Custom Quote will be given in 1-2 days'){
            return;
          }
            setAPIError('');
            setData([]);
        console.log(error);
      }   
    }
  };

  let filterOptions = (options, filter) => {
    if (!filter) {
      return options;
    }
    return options.filter(({ label }) => label && label.includes(filter));
  };
  const deleteFromDraft = async (id) => {
    try {
       await axiosInstance.deleteFromDraft(id);
    } catch (error) {
      console.log(error);
    }
  };
  let handleQty = (argValues, index) => {
     if ( query.get('active')==='closed-order' && values[orderNo].line_item_id){
      showQuantityModal && quanityChangeModelPopUp()
      setShowQuantityModal(false)

     }
    const NewErrors = [...errors];
    let updatedErrorArray = [];

    if (isEmpty(argValues) === true) {
      updatedErrorArray = updateErrors(NewErrors, 'qty', true, orderNo);
      setErrors([...updatedErrorArray]);
    } else {
      updatedErrorArray = updateErrors(NewErrors, 'qty', false, orderNo);
      setErrors([...updatedErrorArray]);
    }
    // let value = argValues.filter(({ value }) => value);
    setSelected(argValues);
    let updatedArray = updateValues(values, 'setQty', argValues, orderNo);
    const { product, material, backing, pe, setQty } = updatedArray[orderNo];
    if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
      DisableAddAnother();
    } else {
      EnableAddAnother();
    }
    setValues([...updatedArray]);
    callAPI();
   
  };

  let handleColors = () => {
    if (color !== '') {
      let CopyOriginal = [...values];
      let updatedColorArray = CopyOriginal.map((item, i) => {
        if (i !== orderNo) return item;

        if (color.includes('(') && color.includes('PMS')) {
          item.colors.push(color);
        } else if (color.includes('PMS')) {
          item.colors.push(color);
          if(!item?.line_item_id){
            item.pmsColors.push(color);
          }
        } else {
          item.colors.push(`PMS ${color}`);
          if(!item?.line_item_id){
            item.pmsColors.push(color);
          }
        }
        return item;
      });
      setValues([...updatedColorArray]);
      setColor('');
    }
    handleSize(orderNo);
  };

  let removeColor = (index) => {
    if (!readOnly) {
      let CopyOriginal = [...values];
      let colors = CopyOriginal[orderNo].colors;
      colors.splice(index,1);
      let updatedArray = updateValues(CopyOriginal, 'colors', colors, orderNo);
      setValues(updatedArray);
      // handleSize(orderNo);
    }
  };

  let handlePMSModal = () => {
    setShowPMSModal((showPMSModal) => !showPMSModal);
  };
  let handleThreadModal = () => {
    setShowThreadModal((showThreadModal) => !showThreadModal);
  };

  let addAnother = () => {
    if (query.get('active')==='closed-order'){
      setReadOnly(false);
    }
  
    let CopyOriginalValues = JSON.parse(JSON.stringify(values));
    let Item= JSON.parse(JSON.stringify(ITEM)); 
    // [...values];
    let CopyOriginalErrors = JSON.parse(JSON.stringify(errors));
    //  [...errors];
    let err =  JSON.parse(JSON.stringify(ERROR));
  
    let newValueArray = [...CopyOriginalValues, {...Item}];
    let newErrorArray = [...CopyOriginalErrors, {...err}];
    setOrderNo(orderNo + 1);
    setErrors(newErrorArray);
    setValues(newValueArray);
    DisableAddAnother();
   

      // DNRC
    // setImageFiles([]);
    // setImages([]);
    
    // this working
    // upload.current.files=null
    // fileArray=[];
    // serverImages=[]
    
    
  };

  let removeItem = (index) => {
    if (!readOnly) {
      // (values.length < 2 && errors.length < 2)
      if (values.length < 2 || errors.length < 2) {
        return;
      }
      Swal.fire({
      title: `Are you sure you want to remove item ${index+1}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style hover:text-red-600 hover:bg-transparent hover:border-red-600',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline cursor-pointer px-4 py-2 text-sm font-medium text-gray-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:underline hover:text-red-500',   
        }
    }).then((res)=>{
      if(res.isConfirmed){
        
        let currValues = [...values];
        let currErrors = [...errors];
        currValues.splice(index, 1);
        currErrors.splice(index, 1);
        currValues.map(({ product, material, backing, pe, setQty }) => {
          if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
          DisableAddAnother();
        } else {
          EnableAddAnother();
        }
      });
      setOrderNo((currentValue) => currentValue - 1);
      setErrors(currErrors);
      setValues(currValues);
      }
    });
    }
    if(query.get('active')==='closed-order' && values[index-1]?.line_item_id){
      setReadOnly(true);
    }
  };
 

  let onCancleOrder = () => {
    if (query.get('active')==='closed-order'){
  Swal.fire({
      title: 'Do you want to clear all the Closed order line items?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        }
    }).then((result)=>{
      if(result.isConfirmed){
      if (!readOnly) {
        setOrderNo(0);
        
        setValues([ITEM]);
        // need to Optimise it with Error as Error are false which needs to be true
        setErrors([ERROR]);
        DisableAddAnother();    
    }
      }
    })
    }
    else if (query.get('active')==='open-order')
    {  Swal.fire({
      title: 'Do you want to clear all the Open order line items?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        }
    }).then((result)=>{
      if(result.isConfirmed){
      if (!readOnly) {
        setOrderNo(0);
        setValues([ITEM]);
        // need to Optimise it with Error as Error are false which needs to be true
        setErrors([ERROR]);
        DisableAddAnother();    
    }
      }
    })

    }
    else if (query.get('active')==='save-as-order')
    {
        Swal.fire({
      title: 'Do you want to clear all the Draft`s line items?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        }
    }).then((result)=>{
      if(result.isConfirmed){
      if (!readOnly) {
        setOrderNo(0);
        setValues([ITEM]);
        // need to Optimise it with Error as Error are false which needs to be true
        setErrors([ERROR]);
        DisableAddAnother();    
    }
      }
    })
    }
    else{
      Swal.fire({
      title: 'Do you want to clear all the line items?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        }
    }).then((result)=>{
      if(result.isConfirmed){
      if (!readOnly) {
        setOrderNo(0);
        setValues([ITEM]);
        // need to Optimise it with Error as Error are false which needs to be true
        setErrors([ERROR]);
        DisableAddAnother();    
    }
      }
    })
      

    }
    // setDefaultErrors();
  
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const EnableAddAnother = () => {
    setCanAnother(false);
  };

  const DisableAddAnother = () => {
    setCanAnother(true);
  };


  const updateData = async (data) => {
     Swal.fire({
      title: `Are you sure you want to update`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style hover:text-red-600 hover:bg-transparent hover:border-red-600',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline cursor-pointer px-4 py-2 text-sm font-medium text-gray-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:underline hover:text-red-500',   
        }
    }).then(async(res)=>{
      if(res.isConfirmed){
        enableLoading();
        try {
             await axiosInstance.updateOrder(
              data,
              selectedOrder['object_ref']['opportunity_id'],
              selectedOrder['object_ref']['id']
            );
    } catch (error) {
      console.log(error);
    }
    disableLoading();
      }
    });
  };




  const ConfirmSubmit = async (data) => {
    if (query.get('active')==='closed-order'){
      Swal.fire({
      title: 'Do you want to current images to be carried out?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, Reorder',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm  custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
          title:'md:text-md'
        }
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Your order will be submitted and reviewed later',
          text: 'You can find your order in open orders',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton:
              'w-96 inline-flex bg-red-600 justify-center border border-red-600 hover:bg-transparent  hover:text-red-600 px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        }).then(async (result) => {
             

          if (result.isConfirmed) {
            // history.push('/dashboard?active=open-order')
          }
        });
        enableLoading();
        try {
          await axiosInstance.postOrder(data,lineItemUnitPrice,lineItemUnitCost);
          if(query.get('active')!=='closed-order'){
          clearAllFormData();

          }
       

        } catch (error) {
          console.log(error);
        }
        disableLoading();
      }
      else if (result.isDismissed) {
        let img_container= document.getElementById('image-container');
        img_container.scrollIntoView({
          behavious:"smooth",
          block:'center'
        })
        img_container.classList.add('border-red-600')
        setTimeout(()=>{
        img_container.classList.remove('border-red-600')
        },1500)

      } 
    });

    }
    else{
      Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: query.get('active') === 'new-order' ? true : false,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      denyButtonText: `Save as draft`,
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style hover:bg-transparent hover:text-red-600',
        cancelButton:
          'mt-3 w-96 inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        denyButton:
          'w-full inline-flex justify-center  border border-red-600 px-4 py-2 btn  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm custom-btn-style bg-red-600 hover:bg-transparent hover:text-red-600'
      }
    }).then(async (result) => {
       
          
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Your order will be submitted and reviewed later',
          text: 'You can find your order in open orders',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton:
              'w-96 inline-flex justify-center  border border-red-600 btn px-4 py-2  text-base font-medium text-white hover:text-red-600 hover:bg-transparent focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            // history.push('/dashboard?active=open-order')
          }
        });
        enableLoading();
        try {
          await axiosInstance.postOrder(data);
          if (query.get('active') === 'saved-as-draft') {
            deleteFromDraft(draftId);
            setSelected(null);
          }
          clearAllFormData();
          
          
        } catch (error) {}
        disableLoading();
      } else if (result.isDenied) {
        Swal.fire({
          text: 'Your order is saved in drafts, waiting for your submission',
          icon: 'info',
          buttonsStyling: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton:
              'w-96 inline-flex justify-center border border-red-600 btn px-4 py-2  text-base font-medium text-white hover:text-red-600 hover:bg-transparent focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        });
          saveAsDraft();
      }
    });

    }    
  };
  const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

  function dataURLtoFile(dataurl, filename) {
     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
     while(n--){
     u8arr[n] = bstr.charCodeAt(n);
     }
   return new File([u8arr], filename, {type:mime});
  }
  const updateDraft = async () => {
    let DataUrl=null;
    let file=null;
      let url = 'https://res.cloudinary.com/portfoliov1mushaaf/image/upload/v1643627467/windswept/place-holder_q2ksof.png'
    const data = {
      title: formik.values.title,
      reference: formik.values.reference,
      date,
      notes: formik.values.customerNote,
      shipAddress: formik.values.shipAddress,
      items: [],
    };

    if (orderImages===''){
      const dataUrl=await toDataURL(url)
      DataUrl=dataUrl
      file = dataURLtoFile(dataUrl, "default.jpg");
      data.purchaseOrders=file
    }
    else{
      data.purchaseOrders=orderImages
    }
    
        for (let i = 0; i < values.length; i++) {
      let item = {
        item_id: values[i].item_id,
        product: values[i].product,
        material: values[i].material,
        backing: values[i].backing,
        percentage_embroidery: values[i].pe,
        border: values[i].border,
        shape: values[i].cut,
        quantity: getQuantitySum(values[i].setQty),
        optional_item: values[i].optionalItem,
        markup: values[i].markup,
        width: values[i].wCenter,
        height: values[i].hCenter,
        size: values[i].size,
        colors: values[i].colors,
        images:values[i].images
      };
      data.items.push(item);
    }
      
    try {
      await axiosInstance.updatadeDraft(data, selectedOrder.id);
      Swal.fire({
        text: 'Your draft is updated.',
        icon: 'info',
        timer: 3000,
        buttonsStyling: false,
        showCancelButton: false,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: 'error',
        timer: 2000,
        buttonsStyling: false,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  };
  const clearAllFormData = ()=> {
    const copyValues={...Item}
          const copyErrors={...Error}
          setValues([copyValues]);
          setErrors([copyErrors]);
          setDate('')
          setOrderImages('')
          setOrderNo(0);
          formik.resetForm();
          DisableAddAnother();
  }
  const saveAsDraft = async () => {
    let {pe,backing,material,product,setQty}=values[orderNo];
    if (pe==='' || backing==='' || product=='' || material==='' || setQty.length===0 || date===''){
      Swal.fire({
              text: 'Fill mandatory Fields',
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton:
                  'w-96 inline-flex justify-center px-4 py-2 btn  text-base font-medium text-white hover:text-red-600 border border-red-600 hover:bg-transparent focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
              }
            });
            return;
    }
      let DataUrl=null;
    let file=null;
      let url = 'https://res.cloudinary.com/portfoliov1mushaaf/image/upload/v1643627467/windswept/place-holder_q2ksof.png'
      const data = {
        title: formik.values.title,
        reference: formik.values.reference,
        date,
        notes: formik.values.customerNote,
        shipAddress: formik.values.shipAddress,
        items: []
      };
     if (orderImages===''){
      const dataUrl=await toDataURL(url)
      DataUrl=dataUrl
      file = dataURLtoFile(dataUrl, "default.jpg");
      data.purchaseOrders=file
    }
    else{
      data.purchaseOrders=orderImages
    }

      for (let i = 0; i < values.length; i++) {
        let item = {
          product: values[i].product,
          material: values[i].material,
          backing: values[i].backing,
          percentage_embroidery: values[i].pe,
          border: values[i].border,
          shape: values[i].cut,
          quantity: getQuantitySum(values[i].setQty),
          optional_item: values[i].optionalItem,
          markup: values[i].markup,
          width: values[i].wCenter,
          height: values[i].hCenter,
          size: values[i].size,
          colors: values[i].colors,
          images: values[i].images
        };
        data.items.push(item);
      }

      try {
        await axiosInstance.createDraft(data);
        clearAllFormData();
        Swal.fire({
      text: 'Your order is saved in drafts, waiting for your submission',
      icon: 'info',
      buttonsStyling: false,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600 btn px-4 py-2  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style'
      }
    })
      } catch (error) {}
  };
  
  const formik = useFormik({
    enableReinitialize: selectedOrder ? true : false,
    initialValues,
    validationSchema: OrderFormSchema,
    validateOnBlur: true,
    onSubmit: ({ title, reference, shipAddress, customerNote }, { setSubmitting }) => {
      setSubmitting(true);
      const data = {
        title,
        reference,
        date,
        week,
        notes: customerNote,
        purchaseOrders: orderImages,
        shipAddress,
        items: [...values],
        errors: [...errors]
      };
      // when selected order is draft's order
      if (selectedOrder?.order_id) {
        data.id = selectedOrder.order_id;
      }
      if(query.get('active')==='closed-order'){
        data.reorder=true;
      }
      if (values.length === 1) {
        const { product, material, backing, pe, setQty } = values[0];

        if (
          product === '' ||
          product === null ||
          product === undefined ||
          material === '' ||
          material === null ||
          material === undefined ||
          backing === '' ||
          backing === null ||
          backing === undefined ||
          pe === '' ||
          pe === null ||
          pe === undefined ||
          isEmpty(setQty)
        ) {
          Swal.fire({
            text: 'Select atleast one item to submit order',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton:
                'w-96 inline-flex justify-center border border-red-600 hover:bg-transparent hover:text-red-600 px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
            }
          });
        } else {
          (query.get('active') === 'new-order' || query.get('active') === 'saved-as-draft' || query.get('active') === 'closed-order') &&
            ConfirmSubmit(data);
          query.get('active') === 'open-order' && updateData(data);
        }
      } else if (values.length > 1) {
        let empty = false;
        values.map((item) => {
          const { product, material, backing, pe, setQty } = item;
          if (product === '' && material === '' && backing === '' && pe === '' && isEmpty(setQty)) {
            empty = true;
          }
        });
        empty
          ? Swal.fire({
              text: 'Fill mandatory fields of all items',
              icon: 'info',
              showCancelButton: false,
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton:
                  'w-96 inline-flex justify-center rounded-md border-none px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
              }
            })
          : query.get('active') === 'new-order' || query.get('active') === 'saved-as-draft' || query.get('active') === 'closed-order'
          ? ConfirmSubmit(data)
          : updateData(data);
      }
    }
  });

  let showFormDetails = (index) => {
    // serverImages=[];
    // fileArray=[];
    // setData([]);
    if (query.get('active')==='closed-order' ){
      if( values[index]?.line_item_id){
      setReadOnly(true);
      }
      else{
      setReadOnly(false)
      }
    }
    if (values?.length === 1) {
      const { product, material, backing, pe, setQty } = values[index];
      if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
        DisableAddAnother();
      } else {
        EnableAddAnother();
      }
    } 
    setOrderNo(index);

    // _Total();
    // _grandTotal();
    // _GrandTotalWithMarkup();
      
  };

  let _onFocus = (e) => {
    e.currentTarget.type = 'date';
    e.currentTarget.min = new Date().toISOString().split('T')[0];
    e.currentTarget.value = date;
  };

  let _onBlur = (e) => {
    if (date === '') {
      e.currentTarget.type = 'text';
      e.currentTarget.placeholder = 'In hands date';
    }
  };

  let _Total = () => {
    const copyOriginal =  [...values];
    let Total = 0;
    if(copyOriginal?.length){
    for (let i=0; i< copyOriginal.length; i++){
      if(copyOriginal[i]?.data?.length){
      for (let j=0; j<copyOriginal[i].data.length; j++){
        Total +=(copyOriginal[i].data[j].count*copyOriginal[i].data[j].unitPrice)
        }
      }   
    }
    setTotal((total)=>total=Total);
    
    }
    // return Total;
  };
  let _grandTotal = () => {
    let GrandTotal = total;
        if (week < 1) {
          GrandTotal = GrandTotal + GrandTotal * 0.75;
        } else if (week >= 1 && week < 2) {
          GrandTotal = GrandTotal + GrandTotal * 0.5;
        } else if (week >= 2 && week < 3) {
          GrandTotal = GrandTotal + GrandTotal * 0.3;
        } else {
          GrandTotal = GrandTotal
        }
    setGrandTotal(GrandTotal);
    // CopyOriginal.map((item, i) =>
    //   item.data.map(({ unitPrice, count }) => {
    //     if (week < 1) {
    //       GrandTotal = GrandTotal + (unitPrice * count).toFixed(3) * 0.75;
    //     } else if (week >= 1 && week < 2) {
    //       GrandTotal = GrandTotal + (unitPrice * count).toFixed(3) * 0.5;
    //     } else if (week >= 2 && week < 3) {
    //       GrandTotal = GrandTotal + (unitPrice * count).toFixed(3) * 0.3;
    //     } else {
    //       GrandTotal = GrandTotal + (unitPrice * count).toFixed(3) * 1;
    //     }
    //   })
    // );
  };
  let _GrandTotalWithMarkup = () => {
    let markTotal=0;
    for (let i=0; i<values.length; i++){
     markTotal+=Number(values[i].markup);
    }


    markTotal*=grandTotal;
    // console.log(markTotal);
    // let gTotalMark=(grandTotal*values[orderNo].markup)
    
    setGrandTotalWithMarkup((gTotalWithMarkup) => (gTotalWithMarkup = markTotal))
    // const CopyOriginal = [...values];
    // var GrandTotalWithMarkup = 0;
    // CopyOriginal.map((item, i) =>
    //   item.data.map(({ unitPrice, count }) => {
    //     if (week < 1) {
    //       GrandTotalWithMarkup =
    //         GrandTotalWithMarkup + ((unitPrice * count).toFixed(3) * 0.75).toFixed(3) * item.markup;
    //     } else if (week >= 1 && week < 2) {
    //       GrandTotalWithMarkup =
    //         GrandTotalWithMarkup + ((unitPrice * count).toFixed(3) * 0.5).toFixed(3) * item.markup;
    //     } else if (week >= 2 && week < 3) {
    //       GrandTotalWithMarkup =
    //         GrandTotalWithMarkup + ((unitPrice * count).toFixed(3) * 0.3).toFixed(3) * item.markup;
    //     } else {
    //       GrandTotalWithMarkup =
    //         GrandTotalWithMarkup + ((unitPrice * count).toFixed(3) * 1).toFixed(3) * item.markup;
    //     }
    //   })
    // );
    // setGrandTotalWithMarkup((gTotalWithMarkup) => (gTotalWithMarkup = GrandTotalWithMarkup));
  };

  return {
    _GrandTotalWithMarkup,
    _grandTotal,
    setGrandTotal,
    _Total,
    _onBlur,
    _onFocus,
    showFormDetails,
    onCancleOrder,
    removeItem,
    addAnother,
    handlePMSModal,
    handleThreadModal,
    removeColor,
    handleColors,
    handleQty,
    filterOptions,
    _HandleChange,
    handleNotes,
    handleRemoveImg,
    handleRemoveOrderImg,
    OrderUploadClick,
    onChangeOrderFile,
    handleClick,
    onChangeFile,
    setColor,
    DisableAddAnother,
    EnableAddAnother,
    formik,
    date,
    week,
    total,
    grandTotal,
    gTotalWithMarkup,
    loading,
    images,
    orderImages,
    setOrderImages,
    apiError,
    showPMSModal,
    showThreadModal,
    data,
    errors,
    values,
    notes,
    color,
    selected,
    orderNo,
    orderUpload,
    upload,
    canAddAnother,
    saveAsDraft,
    updateDraft,
    setValues,
    setErrors,
    setCanAnother
  };
};

export default UseFetchNewOrder;
