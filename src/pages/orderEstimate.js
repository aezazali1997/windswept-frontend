import React, { useState } from 'react'
import MultiSelect from "react-multi-select-component";
import { multiQty, size } from '../utils/consts';
import { Helmet } from 'react-helmet';
import Form from './Dashboard/form';
var ColorsArray = [];

const OrderEstimate = () => {

    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');
    const [color, setColor] = useState('');
    const [colors, setColors] = useState([]);

    let handleWidth = (value) => {
        setRightWidth(value);
    }
    let handleHight = (value) => {
        setRightHeight(value);
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

    return (
        <div className="flex flex-col lg:flex-row w-full md:pt-28  bg-white">
            <Helmet>
                <title>Estimator | Windswept</title>

            </Helmet>
            <div className="flex w-full justify-center">
                <table className="">
                    <tr>
                        <td className="left-estimate-table text-right">Estimated Price:</td>
                        <td className="left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Backing:</td>
                        <td className="left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Pricing:</td>
                        <td className=" left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Vendor:</td>
                        <td className=" left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Date:</td>
                        <td className="left-estimate-table">5/7/2021 , 14:11:34 pm</td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Markup:</td>
                        <td className="left-estimate-table">Maggie O'Neill</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">PC:</td>
                        <td className=" left-estimate-table">50</td>
                    </tr>
                    <tr>
                        <td className=" px-3 w-56 font-bold text-right">Quote</td>
                        {/* <td className="border px-8 py-4">Neal Garrison</td> */}
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Product Name:</td>
                        <td className=" left-estimate-table">Emblems</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Border:</td>
                        <td className="left-estimate-table">Merrowed</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">BackGround:</td>
                        <td className=" left-estimate-table">Full Embroidery</td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Backing:</td>
                        <td className=" left-estimate-table">Plastic (sew on)</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Shape:</td>
                        <td className="left-estimate-table ">Round</td>
                    </tr>
                    <tr>
                        <td className="left-estimate-table text-right">Size:</td>
                        <td className=" left-estimate-table">1" x 3" - 2"</td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Price:</td>
                        <td className=" left-estimate-table"></td>
                    </tr>
                    <tr>
                        <td className=" left-estimate-table text-right">Cost:</td>
                        <td className="left-estimate-table"></td>
                    </tr>
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
                    thread={''}
                    submit={'submit'}
                />
            </div>
        </div>
    )
}

export default OrderEstimate
