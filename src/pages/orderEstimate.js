import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash';
import swal from 'sweetalert';
import { useReactToPrint } from 'react-to-print';
import { Helmet } from 'react-helmet';
import Form from './Dashboard/form';
import AxiosInstance from '../APIs/axiosInstance';
import EstimateChart from '../components/EstimateTable';

var ColorsArray = [];

const OrderEstimate = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');
    const [color, setColor] = useState('');
    const [Size, setSize] = useState('');
    const [colors, setColors] = useState([]);
    const [errors, setErrors] = useState({
        qty: true,
        product: true,
        material: true,
        backing: true,
        pe: true
    });

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
    let PDF = useRef();
    const handlePrint = useReactToPrint({
        pageStyle: () => 'justifyCenter',
        content: () => PDF.current,
    });

    useEffect(() => {
        handleSize();
    }, [values]);

    console.log('values', values);

    useEffect(() => {
    }, [data, errors])

    useEffect(() => {
        handleSubmit();
    }, [values, selected])


    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'product' || name === "material" || name === "pe" || name === "backing") {
            if (value === '') {
                setErrors({ ...errors, [name]: true })
                setValues({ ...values, [name]: value })
            }
            else {
                setErrors({ ...errors, [name]: false })
                setValues({ ...values, [name]: value })
            }
        }
        else {
            setValues({ ...values, [name]: value })
        }
    }

    let handleWidth = (value) => {
        if (value === '0') {
            setValues({ ...values, wCenter: parseInt(value) })
            setRightWidth(parseInt(value))
            handleSubmit();
        }
        else {
            let newValue = value.split('/');
            let newArr = newValue.map(item => parseInt(item));
            let result = newArr[0] / newArr[1];
            setValues({ ...values, wCenter: result })
            setRightWidth(result);
            handleSubmit();
        }
    }

    let handleHight = (value) => {
        if (value === '0') {
            setValues({ ...values, hCenter: parseInt(value) })
            setRightHeight(parseInt(value))
            handleSubmit();
        }
        else {
            let newValue = value.split('/');
            let newArr = newValue.map(item => parseInt(item));
            let result = newArr[0] / newArr[1];
            setValues({ ...values, hCenter: result })
            setRightHeight(result);
            handleSubmit();
        }
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
        if (_.isEmpty(values) === true) {
            setErrors({ ...errors, qty: true })
            let value = values.filter(({ value }) => value);
            setSelected(value);
        }
        else {
            setErrors({ ...errors, qty: false })
            let value = values.filter(({ value }) => value);
            setSelected(value);
        }
    }


    let handleSize = () => {
        const { hLeft, hCenter, wLeft, wCenter } = values;
        var size = (((parseInt(wLeft) + parseFloat(wCenter)) + (parseInt(hLeft) + parseFloat(hCenter))) / 2);
        var roundedhalf = Math.round(size * 2) / 2;
        setSize(roundedhalf);
    }

    let handleSubmit = async () => {
        const { product, material, backing, pe } = values;

        if (product === '' || material === '' || backing === '' || pe === '' || _.isEmpty(selected) === true) {
            // swal({
            //     text: 'Fill Mandatory Fields',
            //     icon: 'error',
            //     dangerMode: true,
            //     buttons: false,
            //     timer: 3000,
            // })
        }
        else {
            enableLoading();
            const data = {
                product: values.product,
                material: values.material,
                backing: values.backing,
                size: Size,
                pc: parseInt(values.pe),
                addColor: ColorsArray.length
            }
            console.log('data', data);
            AxiosInstance.ordereEstimate(data)
                .then(({ data: { data, message } }) => {
                    console.log(data);
                    if (message === "Failed" && data[0].error === 'Custom') {
                        swal({
                            text: 'Custom Quote will be given in 1-2 days',
                            icon: 'info',
                            dangerMode: true,
                            buttons: false,
                            timer: 3000,
                        })
                        setData([]);
                        disableLoading();
                    }
                    else if (message === 'Failed' && data[0].error === 'Not Found') {
                        swal({
                            text: 'Data Not Found',
                            icon: 'info',
                            dangerMode: true,
                            buttons: false,
                            timer: 3000,
                        })
                        setData([]);
                        disableLoading();
                    }
                    else {
                        swal({
                            text: 'Data Successfully Fetched',
                            icon: 'success',
                            dangerMode: true,
                            buttons: false,
                            timer: 3000,
                        })
                        setData(data);
                        disableLoading();

                    }

                }).catch(error => {
                    swal({
                        text: error,
                        icon: 'error',
                        dangerMode: true,
                        buttons: false,
                        timer: 3000,
                    })
                })
        }
    }

    return (
        <div className="flex flex-col lg:flex-row w-full md:pt-28 bg-white">
            <Helmet>
                <title>Estimator | Windswept</title>

            </Helmet>
            <div className="flex w-full flex-col justify-top items-center space-y-2">
                <EstimateChart
                    ref={PDF}
                    data={data}
                    Size={Size}
                    selected={selected}
                    values={values}
                />
                <table>
                    <tr>
                        <td className="px-8 left-estimate-table"></td>
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
                    </tr>
                </table>
            </div>
            <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 ">
                <Form
                    loading={loading}
                    errors={errors}
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
