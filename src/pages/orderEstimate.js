import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import Form from './Dashboard/form';
import AxiosInstance from '../APIs/axiosInstance';
import _ from 'lodash';
var ColorsArray = [];

const OrderEstimate = () => {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([{ label: "50", value: "50" }]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');
    const [color, setColor] = useState('');
    const [Size, setSize] = useState('');
    const [colors, setColors] = useState([]);
    const [values, setValues] = useState({
        vendor: '',
        product: '',
        material: '',
        backing: '',
        pe: '',
        border: '',
        cut: '',
        packaging: '',
        setQty: '',
        optionalItem: '',
        markup: '',
        discountApply: '',
        wLeft: '1',
        wRight: '0',
        wCenter: '0',
        hLeft: '1',
        hCenter: '0',
        hRight: '0',
    });

    useEffect(() => {
        handleSize();
    }, [values]);

    useEffect(() => {
        UnitPrice();
    }, [data])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    let handleWidth = (value) => {
        let newValue = value.split('/');
        let newArr = newValue.map(item => parseInt(item));
        let result = newArr[0] / newArr[1];
        setValues({ ...values, wCenter: result })
        setRightWidth(result);

    }

    let handleHight = (value) => {
        let newValue = value.split('/');
        let newArr = newValue.map(item => parseInt(item));
        let result = newArr[0] / newArr[1];
        setValues({ ...values, hCenter: result })
        setRightHeight(result);
    }

    let filterOptions = (options, filter) => {
        if (!filter) {
            return options;
        }
        return options.filter(({ label }) => label && label.includes(filter));
    }

    let handleColors = () => {
        ColorsArray.push(color);
        setColors(ColorsArray);
        setColor('');
    }

    let removeColor = (index) => {
        let neww = ColorsArray.splice(index, 1);
        setColors(neww);
    }

    let handleQty = (values) => {
        console.log('values', values);
        let value = values.filter(({ value }) => value);
        setSelected(value);
    }

    let handleSize = () => {
        const { hLeft, hCenter, wLeft, wCenter } = values;
        var size = (((parseInt(wLeft) + parseFloat(wCenter)) + (parseInt(hLeft) + parseFloat(hCenter))) / 2);
        var roundedhalf = Math.round(size * 2) / 2;
        setSize(roundedhalf);
    }

    let PC = () => {
        let Values = selected.map(({ value }) => value)
        return Values.join(', ');
    }

    let UnitPrice = () => {
        if (_.isEmpty(data) === false) {
            let values = [];
            let filteredEmptyStrings = [];
            selected.map(({ value }) => {
                values.push(data.filter(({ count, unitPrice }) => value === count.toString() ? unitPrice : ''))

                console.log('values', values);
            })
            return filteredEmptyStrings.join(',')
        }
        else {
            return ''
        }
    }

    let handleSubmit = async () => {
        const data = {
            product: values.product,
            material: values.material,
            backing: values.backing,
            size: Size,
            pc: parseInt(values.pe)
        }
        console.log('data', data);
        AxiosInstance.ordereEstimate(data)
            .then(({ data: { data, message } }) => {
                console.log(data);
                if (message === "Failed" && data[0].error === 'Custom') {
                    swal({
                        text: 'Custom Quote will be given in 1-2 days',
                        icon: 'error',
                        dangerMode: true,
                        buttons: false,
                        timer: 3000,
                    })
                }
                else if (message === 'Failed' && data[0].error === 'Not Found') {
                    swal({
                        text: 'Data Not Found',
                        icon: 'error',
                        dangerMode: true,
                        buttons: false,
                        timer: 3000,
                    })
                }
                else {
                    setData(data);
                }

            }).catch(error => {
                swal({
                    text: error.response.data.message,
                    icon: 'error',
                    dangerMode: true,
                    buttons: false,
                    timer: 3000,
                })
            })
    }


    return (
        <div className="flex flex-col lg:flex-row w-full md:pt-28  bg-white">
            <Helmet>
                <title>Estimator | Windswept</title>

            </Helmet>
            <div className="flex w-full justify-center">
                <table className="mt-8 md:mt-0">
                    <tr>
                        <td className="left-estimate-table text-right">Estimated Price:</td>
                        <td className="left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Backing:</td>
                        <td className="left-estimate-table">{values.backing}</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Pricing:</td>
                        <td className=" left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Vendor:</td>
                        <td className=" left-estimate-table">{values.vendor}</td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Date:</td>
                        <td className="left-estimate-table">5/7/2021 , 14:11:34 pm</td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Markup:</td>
                        <td className="left-estimate-table">{values.markup}</td>
                    </tr>
                    <tr>
                        <td className=" px-3 w-56 font-bold text-right">Quote</td>
                        {/* <td className="border px-8 py-4">Neal Garrison</td> */}
                    </tr>
                    <tr className="border">
                        <td className=" left-estimate-table text-right font-medium border-r">PC:</td>
                        <td className=" left-estimate-table text-left font-medium ">Unit Price:</td>
                    </tr>
                    {

                        data ?
                            selected.map(({ value }) => (
                                data.map(({ count, unitPrice }) => (
                                    value === count.toString() ?


                                        <tr className="border">
                                            <td className=" left-estimate-table text-right border-r">
                                                {value}
                                            </td>
                                            <td className=" left-estimate-table text-left">
                                                {unitPrice}
                                            </td>
                                        </tr>
                                        : ''
                                ))

                            ))
                            :
                            ''
                    }

                    <tr>
                        <td className=" left-estimate-table text-right">Product Name:</td>
                        <td className=" left-estimate-table">{values.product}</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Border:</td>
                        <td className="left-estimate-table">{values.border}</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">BackGround:</td>
                        <td className=" left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Backing:</td>
                        <td className=" left-estimate-table">{values.backing}</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Shape:</td>
                        <td className="left-estimate-table "></td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Size:</td>
                        <td className=" left-estimate-table">{Size}</td>
                    </tr>
                    {/* <tr>
                        <td className=" left-estimate-table text-right">Cost:</td>
                        <td className="left-estimate-table"></td>
                    </tr> */}
                    <tr>
                        <td className=" px-8 "></td>
                        <td className=" left-estimate-table">
                            <button type="button" className="inline-flex
                            text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600  justify-center w-20 border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium  focus:outline-none"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >Print</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 ">
                <Form
                    Size={Size}
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
                    handleHight={handleHight}
                    handleWidth={handleWidth}
                    setSelected={setSelected}
                    handleChange={handleChange}
                    handleColors={handleColors}
                    handleSubmit={handleSubmit}
                    filterOptions={filterOptions}
                    setHeightClicked={setHeightClicked}
                    handleQty={handleQty}
                    ColorsArray={ColorsArray}
                    thread={''}
                    submit={'submit'}
                />
            </div>
        </div>
    )
}

export default OrderEstimate
