import React, { useState, useEffect } from 'react';
import { Input } from '../../components';
import Button from './button';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import Form from './form';

var ColorsArray = [];

const NewOrder = ({ fileArray, handleRemoveImg, onChangeFile, upload, handleClick }) => {

    const [order, setOrders] = useState()
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
    const [errors, setErrors] = useState({
        qty: true,
        product: true,
        material: true,
        backing: true,
        pe: true
    });

    useEffect(() => {

        handleSize();
    }, [values]);

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

    let filterOptions = (options, filter) => {
        if (!filter) {
            return options;
        }
        return options.filter(({ label }) => label && label.includes(filter));
    }
    let handleQty = (values) => {
        console.log('values', values);
        if (_.isEmpty(values) === true) {
            setErrors({ ...errors, qty: true })
        }
        else {
            setErrors({ ...errors, qty: false })
        }
        let value = values.filter(({ value }) => value);
        setSelected(value);
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


    let handleSize = () => {
        const { hLeft, hCenter, wLeft, wCenter } = values;
        console.log({ hLeft, hCenter, wLeft, wCenter })
        var size = (((parseInt(wLeft) + parseFloat(wCenter)) + (parseInt(hLeft) + parseFloat(hCenter))) / 2);
        // console.log('size', size);
        var roundedhalf = Math.round(size * 2) / 2;
        console.log('roundedhalf', roundedhalf);
        setSize(roundedhalf);
    }




    return (
        <>
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
                                            <div className="flex flex-row hover:bg-red-600 group-hover:text-white w-full py-2 px-3  items-center">
                                                <div className="flex flex-col w-1/12 text-center">
                                                    <div className="text-sm text-gray-900">1</div>
                                                </div>
                                                <div className="flex flex-col w-9/12 px-10">
                                                    <div className="text-sm text-gray-900">Emblem</div>
                                                </div>
                                                <div className="flex flex-col w-2/12 px-10 cursor-pointer ">
                                                    <svg className="w-4 h-4 hover:w-6 hover:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full ">
                            <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >
                                Add Another
                            </button>
                            <div className="flex flex-row mt-4 w-full ">
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >
                                    Save as Draft
                                </button>
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >
                                    Submit
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
                                <Input
                                    type={"text"}
                                    name={"order"}
                                    placeholder={'Enter a name for your order...'}
                                    classNames={"input"}

                                />
                                <Input
                                    type={"text"}
                                    name={"order"}
                                    placeholder={'Enter Customer Reference...'}
                                    classNames={"input"}

                                />
                                <Input
                                    type={"text"}
                                    name={"order"}
                                    placeholder={'Select requested completion date...'}
                                    classNames={"input"}

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
                        filterOptions={filterOptions}
                        setHeightClicked={setHeightClicked}
                        ColorsArray={ColorsArray}
                        thread={'thread'}
                        submit={''}
                    />
                </div>
            </div>
        </>
    )
}

export default NewOrder;
