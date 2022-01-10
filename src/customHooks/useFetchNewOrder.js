import { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { isEmptyArray, useFormik } from 'formik';
import { isEmpty } from 'lodash';
import store from '../store';
import { storeOrderCache } from '../actions';
import { updateErrors, updateValues } from '../utils/helpers';
import axiosInstance from '../APIs/axiosInstance';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { OrderFormSchema } from '../utils/validation_schema';
import { arrayGenerator } from '../utils/arrayGenerator';
import { useLocation } from 'react-router-dom';
import { Error } from '../constants/Errors';
import { Item } from '../constants/Item';
import { deserializeApiResponse } from '../utils/ApiResponse';
import { deserializeDraftResponse } from '../utils/draftResponse';
import { getQuantitySum } from '../utils/arraySum';
import '../styles/custom-style.css';
let fileArray = [];
let fileObj = null;

const UseFetchNewOrder = ({ selectedOrder, readOnly }) => {
  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [canAddAnother, setDisableAddAnother] = useState(true);
  const [orderNo, setOrderNo] = useState(0);
  const [date, setDate] = useState('');
  const [week, setWeek] = useState(0);

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
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
  const [apiError, setAPIError] = useState('');
  const [showPMSModal, setShowPMSModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);

  useEffect(() => {
    if (selectedOrder) {
      let [date, notes] = ['', ''];
      let items = [];
      if (selectedOrder['object_ref']) {
        let { document_date, cf_opportunity_portal_notes, opp_line_items } =
          selectedOrder['object_ref'];
        items = opp_line_items;
        date = document_date;
        notes = cf_opportunity_portal_notes;
      } else {
        items = selectedOrder.items;
        for (let i = 0; i < items.length; i++) {
          items[i] = JSON.parse(items[i]);
        }
        date = selectedOrder.date;
        notes = selectedOrder.customer_notes;
      }
      if (!isEmptyArray(items)) {
        let [product, material, backing, pe, setQty] = ['', '', '', '', ''];
        if (items[0]['object_ref']) {
          items.map((item) => {
            item = item['object_ref'];
            product = item['product[refcode]'];
            material = item['material'];
            backing = item['backing'];
            pe = item['percentage_embroidery'];
            setQty = item['unit_quantity'];
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
            material = item.material;
            backing = item.backing;
            pe = item.percentage_embroidery;
            setQty = item.quantity;
            if (product === '' || material === '' || backing === '' || pe === '' || setQty === '') {
              DisableAddAnother();
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
        // setData([data]);
      }
    }
  }, []);
  useEffect(() => {
    _Total();
    _grandTotal();
    _GrandTotalWithMarkup();
  }, [images, values, errors, orderImages]);

  const initialValues = {
    title: selectedOrder?.object_ref?.cf_opportunity_item_name || selectedOrder?.title || '',
    reference: selectedOrder?.object_ref?.customer_ref || selectedOrder?.reference || '',
    date: date || '',
    shipAddress:
      selectedOrder?.object_ref?.cf_opportunity_ship_to_address || selectedOrder?.shipAdress || '',
    customerNote: notes || ''
  };

  let upload = useRef();

  let onChangeFile = (event) => {
    let imageFiles = [];
    fileObj = event.target.files;
    for (let i = 0; i < fileObj.length; i++) {
      imageFiles.push(fileObj[i]);
      fileArray.push(URL.createObjectURL(fileObj[i]));
    }
    setImageFiles(imageFiles);
    setImages(fileArray); /// if you want to upload latter
  };

  let handleClick = () => {
    upload.current.click();
  };

  let handleRemoveImg = (index) => {
    if (!readOnly) {
      let CopyOriginal = [...images];
      CopyOriginal.splice(index, 1);
      fileArray.splice(index, 1);
      setImages(CopyOriginal);
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
    } else {
      let updatedArray = updateValues(NewArray, name, value, index);

      setValues([...updatedArray]);
    }
    handleSize(orderNo);
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
  let callAPI = async () => {
    const { product, material, backing, size, pe, freight, markup, pmsColors, setQty } =
      values[orderNo];

    if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
      // swal({
      //     text: 'Fill Mandatory Fields',
      //     icon: 'error',
      //     dangerMode: true,
      //     buttons: false,
      //     timer: 3000,
      // })
    } else {
      const data = {
        product: product,
        material: material,
        backing: backing,
        size: size,
        pc: parseInt(pe),
        addColor: pmsColors?.length,
        freight: freight || 0,
        markup: markup || 1
      };
      //  commented by aezaz ali
      //  it calls the data from backend to get estimated rates
      // axiosInstance
      //   .ordereEstimate(data)
      //   .then(({ data: { data, message } }) => {
      //     if (message === 'Failed' && data[0].error === 'Custom') {
      //       // swal({
      //       // 	text: 'Custom Quote will be given in 1-2 days',
      //       // 	icon: 'info',
      //       // 	dangerMode: true,
      //       // 	buttons: false,
      //       // 	timer: 3000,
      //       // })
      //       setAPIError('Custom Quote will be given in 1 - 2 days');
      //       setTotal(0);
      //       setGrandTotal(0);
      //       setData([]);
      //     } else if (message === 'Failed' && data[0].error === 'Not Found') {
      //       swal({
      //         text: 'Data Not Found',
      //         icon: 'info',
      //         dangerMode: true,
      //         buttons: false,
      //         timer: 3000
      //       });
      //       setAPIError('');
      //       setData([]);
      //     } else {
      //       swal({
      //         text: 'Data Successfully Fetched',
      //         icon: 'success',
      //         dangerMode: true,
      //         buttons: false,
      //         timer: 3000
      //       });
      //       setAPIError('');
      //       setData(data);
      //       let UpdateArray = [...values].map((item, i) => {
      //         if (i !== orderNo) return item;
      //         item.data = data;
      //         return item;
      //       });
      //       setValues([...UpdateArray]);
      //       disableLoading();
      //     }
      //   })
      //   .catch((error) => {
      //     swal({
      //       text: error,
      //       icon: 'error',
      //       dangerMode: true,
      //       buttons: false,
      //       timer: 3000
      //     });
      //   });
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
      let res = await axiosInstance.deleteFromDraft(id);
    } catch (error) {
      console.log(error);
    }
  };
  let handleQty = (valuess, index) => {
    const NewErrors = [...errors];
    let updatedErrorArray = [];

    if (isEmpty(valuess) === true) {
      updatedErrorArray = updateErrors(NewErrors, 'qty', true, orderNo);
      setErrors([...updatedErrorArray]);
    } else {
      updatedErrorArray = updateErrors(NewErrors, 'qty', false, orderNo);
      setErrors([...updatedErrorArray]);
    }
    let value = valuess.filter(({ value }) => value);
    setSelected(valuess);
    let updatedArray = updateValues(values, 'setQty', valuess, orderNo);
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
          item.pmsColors.push(color);
        } else {
          item.colors.push(`PMS ${color}`);
          item.pmsColors.push(`PMS ${color}`);
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
      let FilteredColors = colors.filter((color) => colors[index] !== color);
      let updatedArray = updateValues(CopyOriginal, 'colors', FilteredColors, orderNo);
      setValues(updatedArray);
      handleSize(orderNo);
    }
  };

  let handlePMSModal = () => {
    setShowPMSModal((showPMSModal) => !showPMSModal);
  };
  let handleThreadModal = () => {
    setShowThreadModal((showThreadModal) => !showThreadModal);
  };

  let addAnother = () => {
    let CopyOriginalValues = [...values];
    let CopyOriginalErrors = [...errors];
    let newErrorArray = [...CopyOriginalErrors, Error];
    let newValueArray = [...CopyOriginalValues, Item];
    setOrderNo(orderNo + 1);
    setErrors(newErrorArray);
    setValues(newValueArray);
    DisableAddAnother();
  };

  let removeItem = (index) => {
    if (!readOnly) {
      if (values.length < 2 && errors.length < 2) {
        return;
      }
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
  };

  let onCancleOrder = () => {
    if (!readOnly) {
      setErrors([Error]);
      setOrderNo(0);
      setValues([Item]);
    }
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const EnableAddAnother = () => {
    setDisableAddAnother(false);
  };

  const DisableAddAnother = () => {
    setDisableAddAnother(true);
  };
  const updateData = async (data) => {
    enableLoading();
    try {
      let res = await axiosInstance.updateOrder(
        data,
        selectedOrder['object_ref']['opportunity_id'],
        selectedOrder['object_ref']['id']
      );
    } catch (error) {}
    disableLoading();
    // this function will call the update method in backend
  };
  const ConfirmSubmit = async (data) => {
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
          'w-full inline-flex justify-center rounded-md border-none  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ',
        denyButton:
          'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style '
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
              'w-full inline-flex justify-center rounded-md border-none btn px-4 py-2  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            // history.push('/dashboard?active=open-order')
          }
        });
        enableLoading();
        try {
          let res = await axiosInstance.postOrder(data);
          if (query.get('active') === 'saved-as-draft') {
            deleteFromDraft(data.id);
            history.push('/dashboard?active=saved-as-draft');
          }
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
              'w-full inline-flex justify-center rounded-md border-none btn px-4 py-2  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        });
        // make api call
      }
    });
  };
  const updateDraft = async () => {
    const data = {
      title: formik.values.title,
      reference: formik.values.reference,
      date,
      images: imageFiles,
      notes: formik.values.customerNote,
      purchaseOrders: orderImages,
      shipAddress: formik.values.shipAddress,
      items: []
    };
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
        colors: values[i].colors
      };
      data.items.push(item);
    }

    try {
      await axiosInstance.updatadeDraft(data, selectedOrder.order_id);
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
  const saveAsDraft = async () => {
    Swal.fire({
      text: 'Your order is saved in drafts, waiting for your submission',
      icon: 'info',
      timer: 2000,
      buttonsStyling: false,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton:
          'w-full inline-flex justify-center rounded-md border-none btn px-4 py-2  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style'
      }
    }).then(async (result) => {
      const data = {
        title: formik.values.title,
        reference: formik.values.reference,
        date,
        images: imageFiles,
        notes: formik.values.customerNote,
        purchaseOrders: orderImages,
        shipAddress: formik.values.shipAddress,
        items: []
      };
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
          colors: values[i].colors
        };
        data.items.push(item);
      }
      try {
        let res = await axiosInstance.createDraft(data);
      } catch (error) {}
    });
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
        images: imageFiles,
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
                'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
            }
          });
        } else {
          (query.get('active') === 'new-order' || query.get('active') === 'saved-as-draft') &&
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
                  'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
              }
            })
          : query.get('active') === 'new-order' || query.get('active') === 'saved-as-draft'
          ? ConfirmSubmit(data)
          : updateData(data);
      }
    }
  });

  let showFormDetails = (index) => {
    if (values?.length === 1) {
      const { product, material, backing, pe, setQty } = values[index];
      if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
        DisableAddAnother();
      } else {
        EnableAddAnother();
      }
    } else {
    }

    setOrderNo(index);
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
    // const CopyOriginal = [...values];
    // var Total = 0;
    // CopyOriginal.map((item, i) =>
    //   item.data.map(({ unitPrice, count }) => (Total = Total + count * unitPrice))
    // );
    // setTotal((total) => (total = Total));
  };
  let _grandTotal = () => {
    // const CopyOriginal = [...values];
    // var GrandTotal = 0;
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
    // setGrandTotal((grandTotal) => (grandTotal = GrandTotal));
  };
  let _GrandTotalWithMarkup = () => {
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
    updateDraft
  };
};

export default UseFetchNewOrder;
