import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import swal from 'sweetalert';
import { useReactToPrint } from 'react-to-print';
import { Helmet } from 'react-helmet';
import Form from './Dashboard/estimateForm';
import AxiosInstance from '../APIs/axiosInstance';
import EstimateChart from '../components/EstimateTable';
// import CopyToClipboard from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import { singleArray } from '../utils/singleArray';
import { productName } from '../utils/productNameGenerator';

import moment from 'moment';
let ColorsArray = [];

const OrderEstimate = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [heightClicked, setHeightClicked] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  // const [rightWidth, setRightWidth] = useState('');
  // const [rightHeight, setRightHeight] = useState('');
  const [color, setColor] = useState('');
  // const [Size, setSize] = useState('');
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({
    qty: true,
    product: true,
    material: true,
    backing: true,
    pe: true
  });
  const [apiError, setAPIError] = useState('');

  const [values, setValues] = useState({
    // vendor: '',
    product: '',
    material: '',
    backing: '',
    pe: '',
    border: '',
    cut: '',
    // packaging: '',
    setQty: '',
    // optionalItem: '',
    markup: '',
    // discountApply: '',
    wLeft: '1',
    wRight: '0',
    wCenter: '0',
    hLeft: '1',
    hCenter: '0',
    hRight: '0',
    size: 1,
    colorPick: '',
    // freight: '',
    // custom: '7',
    color: ''
  });
  let PDF = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: () => 'justifyCenter',
    content: () => PDF.current
  });
  useEffect(() => {
    handleSubmit();
// eslint-disable-next-line
  }, [values, errors, selected, colors]);

  // useEffect(() => {
  //   // handleSize();
  // }, [data]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const onCopyText = () => {
    let price = '';
    let cost = '';
    if (data) {
      // converting map to for loop
      for (let i=0; i<selected.length; i++){
        const {value}=selected[i];
        for (let j=0; j<data.length; j++){
          const {count, unitCost, unitPrice}=data[i];
          if( value===count.toString()){
            price = price + `pcs${count} @ ${unitPrice} / `;
            cost = cost + `pcs${count} @ ${unitCost} / `;
          }
        }
      }
      // conversion end

      // selected.map(({ value }) => {
      //   return data.map(({ count, unitCost, unitPrice }, index) => {
      //     if (value === count.toString()) {
      //       price = price + `pcs${count} @ ${unitPrice} / `;
      //       cost = cost + `pcs${count} @ ${unitCost} / `;
      //     }
      //   });
      // });
      navigator.clipboard.writeText(
        `Backing: ${backing.split(':')[1]}, Date: ${moment().format(
          'MMMM Do YYYY'
        )}, Markup: ${markup}, Unit Price: ${price}, Unit Cost: ${cost}, Product: ${productName(
          product
        )}, Border: ${border.split(':')[1]}, Percent Embriodery: ${pe.split(':')[1]}, Shape: ${
          cut.split(':')[1]
        }, Size: ${size}`
      );
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'product' || name === 'material' || name === 'pe' || name === 'backing') {
      if (value === '') {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
    }

    let updatedObj = { ...values, [name]: value };
    const size = await handleSize(updatedObj);
    setValues({ ...size });
  };

  let filterOptions = (options, filter) => {
    if (!filter) {
      return options;
    }
    return options.filter(({ label }) => label && label.includes(filter));
  };

  let handleColors = () => {
    ColorsArray.push(color);
    setColors(ColorsArray);
    setColor('');
  };

  let removeColor = (index) => {
    let neww = ColorsArray.splice(index, 1);
    setColors(neww);
  };

  let handleQty = (values) => {
    if (_.isEmpty(values) === true) {
      setErrors({ ...errors, qty: true });
      let value = values.filter(({ value }) => value);
      setSelected(value);
    } else {
      setErrors({ ...errors, qty: false });
      let value = values.filter(({ value }) => value);
      setSelected(value);
    }
  };

  let handleSize = (updatedObj) => {
    let HResult = 0;
    let WResult = 0;
    let { hLeft, hRight, wLeft, wRight } = updatedObj;
    let newValues;
    //width
    // eslint-disable-next-line no-lone-blocks
    {
      if (wRight !== '0') {
        let newWidthCenter = wRight.split('/');
        let WidthNum = parseInt(newWidthCenter[0]);
        let WidthDen = parseInt(newWidthCenter[1]);
        WResult = WidthNum / WidthDen;
      }
      //height
      if (hRight !== '0') {
        let newHeightCenter = hRight.split('/');
        let HeightNum = parseInt(newHeightCenter[0]);
        let HeightDen = parseInt(newHeightCenter[1]);
        HResult = HeightNum / HeightDen;
      }
      let size = (parseInt(wLeft) + WResult + (parseInt(hLeft) + HResult)) / 2;
      let roundedhalf = Math.round(size * 2) / 2;
      newValues = { ...updatedObj, wCenter: WResult, hCenter: HResult, size: roundedhalf };
    }
    return newValues;
  };

  let handleSubmit = async () => {
    const { product, material, backing, size, pe, markup, color } = values;
    if (
      product === '' ||
      material === '' ||
      backing === '' ||
      pe === '' ||
      _.isEmpty(selected) === true
    ) {
      return;
    }
    enableLoading();
    const data = {
      product: product,
      material: material,
      backing: backing,
      size: size,
      pc: pe,
      selectedQuantity: singleArray(selected),
      addColor: parseInt(color),
      markup: markup === '' ? 1 : markup
    };
    try {
      let res = await AxiosInstance.wimpieEstimate(data);
      if (res.data[0].error) {
        Swal.fire({
          text: 'Custom Quote will be given in 1-2 days',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton:
              'w-96 inline-flex bg-red-600 justify-center border border-red-600 hover:bg-transparent  hover:text-red-600 px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          }
        })
        
        setAPIError('Custom Quote will be given in 1-2 days');
        setData([]);
        disableLoading();
      } else {
        setAPIError('');
        setData(res.data);
        if (!dataFetched) {
          swal({
            text: 'Data Successfully Fetched',
            icon: 'success',
            dangerMode: true,
            buttons: false,
            timer: 3000
          });
          setDataFetched(true);
        }

        disableLoading();
      }
    } catch (error) {
      if (apiError === 'Custom Quote will be given in 1-2 days') {
        return;
      }
      setAPIError('');
      setData([]);
      console.log(error);
    }

    // .then(({ data: { data, message } }) => {
    //   if (message === 'Failed' && data[0].error === 'Custom') {
    //     swal({
    //       text: 'Custom Quote will be given in 1-2 days',
    //       icon: 'info',
    //       dangerMode: true,
    //       buttons: false,
    //       timer: 3000
    //     });
    //     setAPIError('Custom Quote will be given in 1 - 2 days');
    //     setData([]);
    //     disableLoading();
    //   } else if (message === 'Failed' && data[0].error === 'Not Found') {
    //     swal({
    //       text: 'Data Not Found',
    //       icon: 'info',
    //       dangerMode: true,
    //       buttons: false,
    //       timer: 3000
    //     });
    //     setAPIError('');
    //     setData([]);
    //     disableLoading();
    //   } else {
    //     swal({
    //       text: 'Data Successfully Fetched',
    //       icon: 'success',
    //       dangerMode: true,
    //       buttons: false,
    //       timer: 3000
    //     });
    //     setAPIError('');
    //     setData(data);
    //     disableLoading();
    //   }
    // })
    // .catch((error) => {
    //   swal({
    //     text: error,
    //     icon: 'error',
    //     dangerMode: true,
    //     buttons: false,
    //     timer: 3000
    //   });
    // });
  };

  const { backing, markup, product, border, pe, cut, size } = values;
  return (
    <div className="flex flex-col lg:flex-row w-full md:pt-12 bg-white">
      <Helmet>
        <title>WIMPIE | Windswept</title>
      </Helmet>
      <div className="flex w-full flex-col justify-top space-y-2">
        <EstimateChart
          ref={PDF}
          data={data}
          // Size={Size}
          selected={selected}
          values={values}
          apiError={apiError}
        />
        <table className="mx-auto">
          <tr>
            <td className="left-estimate-table text-right">
              <button
                onClick={onCopyText}
                className="inline-flex text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600  justify-center w-40 border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium  focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true">
                {isCopied ? 'Copied' : 'Copy to clipboard'}
              </button>
            </td>
            <td className="left-estimate-table">
              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600  justify-center w-20 border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium  focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true">
                Print
              </button>
            </td>
          </tr>
        </table>
        {/* <tr>
                    <td className="left-estimate-table text-right">
                        <button
                            onClick={onCopyText}
                            className="inline-flex text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600  justify-center w-40 border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium  focus:outline-none"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                        >
                            {isCopied ? 'Copied' : 'Copy to clipboard'}
                        </button>
                    </td>
                    <td className="left-estimate-table">
                        <button

                            onClick={handlePrint}
                            type="button"
                            className="inline-flex text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600  justify-center w-20 border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium  focus:outline-none"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                        >
                            Print
                        </button>
                    </td>
                </tr> */}
      </div>
      <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 ">
        <Form
          loading={loading}
          errors={errors}
          // Size={Size}
          color={color}
          values={values}
          checked={checked}
          clicked={clicked}
          selected={selected}
          heightClicked={heightClicked}
          setColor={setColor}
          setChecked={setChecked}
          setClicked={setClicked}
          removeColor={removeColor}
          setSelected={setSelected}
          handleChange={handleChange}
          handleColors={handleColors}
          // handleSubmit={handleSubmit}
          filterOptions={filterOptions}
          setHeightClicked={setHeightClicked}
          handleQty={handleQty}
          ColorsArray={ColorsArray}
          thread={''}
          submit={'submit'}
        />
      </div>
    </div>
  );
};

export default OrderEstimate;
