import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import ReactTooltip from 'react-tooltip';
import Button from './button';
import { Input, Form } from '../../components';
import { OrderFormSchema } from '../../utils/validation_schema';
import store from '../../store';
import { storeOrder } from '../../actions'

var ColorsArray = [];

const initialValues = {
    title: '',
    reference: '',
    date: '',
};

const NewOrder = ({ fileArray, handleRemoveImg, onChangeFile, upload, handleClick }) => {

    const [loading, setLoading] = useState(false)
    const [orderNo, setOrderNo] = useState(0)

    const [order, setOrder] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');
    const [color, setColor] = useState('');
    const [item, setItem] = useState('');

    const [Size, setSize] = useState('');
    const [colors, setColors] = useState([]);
    const [values, setValues] = useState([{
        vendor: '',
        product: '',
        material: '',
        backing: '',
        pe: '',
        border: '',
        cut: '',
        packaging: '',
        setQty: [],
        optionalItem: '',
        markup: '',
        discountApply: '',
        wLeft: '1',
        wRight: '0',
        wCenter: '0',
        hLeft: '1',
        hCenter: '0',
        hRight: '0',
        size: '',
        colors: []
    }]);
    const [errors, setErrors] = useState({
        qty: true,
        product: true,
        material: true,
        backing: true,
        pe: true
    });

    useEffect(() => {
        handleSize(orderNo);
    }, [values, orderNo]);

    console.log("values", values);


    let handleWidth = (value) => {
        let newValue = value.split('/');
        console.log(newValue);
        let newArr = newValue.map(item => parseInt(item));
        let result = newArr[0] / newArr[1];
        console.log('value', result)
        setValues({ ...values, wCenter: result })
        setRightWidth(result);

    }

    let handleHight = (value) => {
        console.log('value', value)
        let newValue = value.split('/');
        console.log(newValue);
        let newArr = newValue.map(item => parseInt(item));
        let result = newArr[0] / newArr[1];
        console.log('value', result)
        setValues({ ...values, hCenter: result })
        setRightHeight(result);
    }
    const handleChange = (e, index) => {
        console.log('index', index)
        const { name, value, checked } = e.target;
        console.log(name, value)
        if (name === 'product' || name === "material" || name === "pe" || name === "backing") {
            if (value === '') {
                setErrors({ ...errors, [name]: true })
                let abc = values.map((item, i) => {
                    if (i !== index) return item;
                    item[name] = value;
                    return item;
                })
                setValues([...abc]);
                console.log('-abc', abc)
            }
            else {
                setErrors({ ...errors, [name]: false })
                let abc = values.map((item, i) => {
                    if (i !== index) return item;
                    item[name] = value;
                    return item;
                })
                setValues([...abc]);
                console.log('-abc', abc)
            }
        }
        else if (e.target.name === 'discount') {
            let abc = values.map((item, i) => {
                if (i !== index) return item;
                item[name] = checked;
                return item;
            })
            setValues([...abc]);
            console.log('-abc', abc)
        }
        else {
            let abc = values.map((item, i) => {
                if (i !== index) return item;
                item[name] = value;
                return item;
            })
            setValues([...abc]);
            console.log('-abc', abc)
        }
    }

    let filterOptions = (options, filter) => {
        if (!filter) {
            return options;
        }
        return options.filter(({ label }) => label && label.includes(filter));
    }

    let handleQty = (valuess, index) => {
        console.log('qty', valuess, index);
        if (_.isEmpty(valuess) === true) {
            setErrors({ ...errors, qty: true })
        }
        else {
            setErrors({ ...errors, qty: false })
        }
        let value = valuess.filter(({ value }) => value);
        setSelected(value);
        let abc = values.map((item, i) => {
            if (i !== orderNo) return item;
            item.setQty = valuess;
            return item;
        })
        setValues([...abc]);
        console.log('-abc', abc)
    }


    let handleColors = () => {
        ColorsArray.push(color);
        setColors(ColorsArray);
        setColor('');
        let abc = values.map((item, i) => {
            if (i !== orderNo) return item;
            item.colors = ColorsArray;
            return item;
        })
        setValues([...abc]);
    }

    let removeColor = (index) => {
        let neww = ColorsArray.splice(index, 1);
        setColors(neww);
        let abc = values.map((item, i) => {
            if (i !== orderNo) return item;
            item.colors = ColorsArray;
            return item;
        })
        setValues([...abc]);
    }


    let handleSize = (orderNo) => {
        const { hLeft, hCenter, wLeft, wCenter } = values[orderNo];
        console.log({ hLeft, hCenter, wLeft, wCenter })
        var size = (((parseInt(wLeft) + parseFloat(wCenter)) + (parseInt(hLeft) + parseFloat(hCenter))) / 2);
        // console.log('size', size);
        var roundedhalf = Math.round(size * 2) / 2;
        console.log('roundedhalf', roundedhalf);
        setSize(roundedhalf);
        let abc = values.map((item, i) => {
            if (i !== orderNo) return item;
            item.size = roundedhalf;
            return item;
        })
        // setValues([...abc]);
    }

    let addAnother = () => {
        let data = {
            vendor: '',
            product: '',
            material: '',
            backing: '',
            pe: '',
            border: '',
            cut: '',
            packaging: '',
            setQty: [],
            optionalItem: '',
            markup: '',
            discountApply: '',
            wLeft: '1',
            wRight: '0',
            wCenter: '0',
            hLeft: '1',
            hCenter: '0',
            hRight: '0',
            colors: [],
        }
        setOrderNo(orderNo + 1);
        setValues([...values, data])
    }

    let removeItem = () => {

    }

    console.log('updated', values)

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const getInputClassNamees = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return 'border-red-500';
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return 'border-green-500';
        }
        return '';
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: OrderFormSchema,
        validateOnBlur: true,
        onSubmit: ({ title, reference, date }, { setStatus, setSubmitting, resetForm }) => {
            // console.log(value)
            setSubmitting(true);
            enableLoading();
            const data = [...order, title, reference, date, ...values]
            console.log('data', data)
            store.dispatch(storeOrder(data))
        },
    });

    let showFormDetails = (index) => {
        console.log('orderNo', orderNo)
        setOrderNo(index);
    }



    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="form"
                noValidate="novalidate"
            >
                <div className="flex flex-col justify-center items-center">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
                        Create New Order
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row py-5 space-y-2 md:space-y-0 
            justify-center md:justify-around items-start"
                >

                    <div className="flex w-full justify-center items-center md:sticky md:top-2">
                        <div className="h-52 w-full px-3 sm:w-1/2">
                            <div className=" h-44 w-full border overflow-y-scroll border-gray-400">
                                <div className="align-middle inline-block min-w-full">
                                    <div className="overflow-hidden border">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    values && !_.isEmpty(values) ?
                                                        values.map((item, index) => (
                                                            <div onClick={() => showFormDetails(index)}
                                                                className={`flex flex-row ${index === orderNo ? 'bg-red-600' : 'bg-white'} hover:bg-red-600 group-hover:text-white w-full py-2 px-3  items-center`}>
                                                                <div className="flex flex-col w-1/12 text-center">
                                                                    <div className={`text-sm ${index === orderNo ? 'text-white' : 'text-black'} `}>{index + 1}</div>
                                                                </div>
                                                                <div className="flex flex-col w-9/12 px-10">
                                                                    <div className={`text-sm ${index === orderNo ? 'text-white' : 'text-black'}`}>{item.product}</div>
                                                                </div>
                                                                <div
                                                                    className="flex flex-col w-2/12 px-10 cursor-pointer  ">
                                                                    <svg className="w-4 h-4 hover:w-6 hover:h-6 text-white hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        ''
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full ">
                                <button onClick={addAnother} type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"

                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >
                                    Add Another
                                </button>
                                <div className="flex flex-row mt-4 w-full ">
                                    <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"

                                        aria-expanded="true"
                                        aria-haspopup="true"
                                    >
                                        Save as Draft
                                    </button>
                                    <button type="submit" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
                                        Submit Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pt-20 md:pt-0 w-full">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col w-full md:w-3/12 px-3 py-2 justify-start">
                                {/* <p className="text-left sm:text-right text-sm align-top">Vendor</p> */}
                            </div>
                            <div className="flex flex-col w-full justify-center items-center md:w-9/12 ">
                                <div className="flex flex-col w-full  space-y-2 px-3">
                                    <input
                                        className={`input ${getInputClassNamees('title')}`}
                                        placeholder="Enter a name for your order..."
                                        type="text"
                                        id="title"
                                        name="title"
                                        {...formik.getFieldProps('title')}
                                    />
                                    <input
                                        className={`input ${getInputClassNamees('reference')}`}
                                        placeholder="Enter Customer Reference..."
                                        type="text"
                                        id="reference"
                                        name="reference"
                                        {...formik.getFieldProps('reference')}
                                    />
                                    <input
                                        className={`input ${getInputClassNamees('date')}`}
                                        placeholder="Select requested completion date..."
                                        type="text"
                                        id="date"
                                        name="date"
                                        {...formik.getFieldProps('date')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col w-full md:w-3/12 px-3 py-2  justify-start  ">
                                {/* <p className="text-left sm:text-right text-sm align-top">Vendor</p> */}
                            </div>
                            <div className="flex flex-col w-full md:w-9/12 ">
                                <div className="flex flex-col w-full">
                                    <div className={`py-4  ${_.isEmpty(fileArray) !== true ? 'grid grid-cols-2 sm:grid-cols-4 gap-2' : 'flex justify-center'} w-full`}>
                                        {
                                            _.isEmpty(fileArray) !== true ?
                                                fileArray.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img src={image} alt="uploadedImgs" className="w-36 h-36 rounded-lg" />
                                                        <div onClick={() => handleRemoveImg(index)} className="absolute flex top-0 right-0 border-1 rounded-full text-red-600 hover:ring-2 hover:ring-red-500  w-5 h-5 shadow-md z-50 bg-white items-center justify-center">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                ))
                                                :
                                                <div>
                                                    <svg className="w-40 h-40 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                        }
                                    </div>
                                    <div className="flex flex-row justify-center">
                                        <input
                                            type="file"
                                            multiple={true}
                                            accept='image/*'
                                            ref={upload}
                                            className="hidden"
                                            onChange={(e) => onChangeFile(e)}
                                        />
                                        <Button
                                            onClick={handleClick}
                                            label={(
                                                <>
                                                    <p className="text-sm  font-white font-bold">Add Image(s)</p>&nbsp;
                                                    <svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                </>
                                            )}
                                            classNames="p-2 w-auto flex mb-8 items-center bg-red-600 border text-white hover:bg-white hover:text-red-600 hover:border-red-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Form
                            orderNo={orderNo}
                            loading={loading}
                            errors={errors}
                            Size={Size}
                            color={color}
                            values={values[orderNo]}
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
                            filterOptions={filterOptions}
                            setHeightClicked={setHeightClicked}
                            handleQty={handleQty}
                            ColorsArray={ColorsArray}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewOrder;
