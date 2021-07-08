import React, { useState } from 'react'
import MultiSelect from "react-multi-select-component";
import { multiQty, size } from '../utils/consts';

const OrderEstimate = () => {

    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');


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

    return (
        <div className="flex flex-col lg:flex-row w-full md:pt-28 bg-white">
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
                            <button className="py-2 px-4 w-20 text-white bg-red-600">
                                Print
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 items-center">

                <table className="right-estimate-table">
                    <tr>
                        <td className="left">Vendor </td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Product</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Material</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Backing</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Percent Embriodery</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Border</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Cut</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Quantity</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Packaging</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Select Multi Qty</td>
                        <td className="">
                            <MultiSelect
                                className="border rounded-md border-gray-400"
                                value={selected}
                                options={multiQty}
                                selected={selected}
                                onChange={setSelected}
                                labelledBy={"Select"}
                                filterOptions={filterOptions}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Optional item #</td>
                        <td className="">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Mark Up</td>
                        <td className=" ">
                            <input
                                className=""
                                id="inline-password"
                                type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Discount Apply</td>
                        <td className="">
                            <label class="inline-flex items-center mt-3">
                                <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" checked={checked} onClick={(e) => setChecked(e.target.checked)} />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Width</td>
                        <td className="">
                            <div className="flex flex-row border border-gray-400 w-full sm:w-1/2">
                                <select id="country" name="country" autocomplete="country" className=" w-auto py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-gray-400 hover:cursor-pointer sm:text-sm">
                                    <option value="1">1"</option>
                                    <option value="2">2"</option>
                                    <option value="3">3"</option>
                                    <option value="4">4"</option>
                                    <option value="5">5"</option>
                                    <option value="6">6"</option>
                                    <option value="7">7"</option>
                                    <option value="8">8"</option>
                                    <option value="9">9"</option>
                                </select>
                                <input
                                    className="py-2 px-3 w-full"
                                    readOnly
                                    type="text" />
                                <div class="relative inline-block text-center">
                                    <div>
                                        <button onClick={() => setClicked(!clicked)} type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-gray-700 hover:bg-red-700 focus:outline-none"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true"
                                        >
                                            <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    {
                                        clicked ? (
                                            <div class="origin-top-right absolute right-0 z-50 mt-2 w-auto h-18  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                                <div class="py-0" role="none">
                                                    {
                                                        size && size.map(value => (
                                                            <p onClick={() => handleWidth(value)} className={`text-gray-700 block px-4 py-1 text-sm hover:bg-gray-200 hover:cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-0`}>
                                                                {value}
                                                            </p>

                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        )
                                            : ''
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Height</td>
                        <td className="">
                            <div className="flex flex-row border border-gray-400 w-full sm:w-1/2">
                                <select id="country" name="country" autocomplete="country" className=" w-auto py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-gray-400 hover:cursor-pointer sm:text-sm">
                                    <option value="1">1"</option>
                                    <option value="2">2"</option>
                                    <option value="3">3"</option>
                                    <option value="4">4"</option>
                                    <option value="5">5"</option>
                                    <option value="6">6"</option>
                                    <option value="7">7"</option>
                                    <option value="8">8"</option>
                                    <option value="9">9"</option>
                                </select>
                                <input
                                    className="py-2 px-3 w-full"
                                    readOnly
                                    id="inline-password"
                                    type="text" />
                                <div class="relative inline-block text-center">
                                    <div>
                                        <button onClick={() => setHeightClicked(!heightClicked)} type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-gray-700 hover:bg-red-700 focus:outline-none"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true"
                                        >
                                            <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    {
                                        heightClicked ? (
                                            <div class="origin-top-center absolute right-0 mt-2 w-auto h-18  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                                <div class="py-0" role="none">
                                                    {
                                                        size && size.map(value => (
                                                            <p onClick={() => handleHight(value)} className={`text-gray-700 block px-4 py-1 text-sm hover:bg-gray-200 hover:cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-0`}>
                                                                {value}
                                                            </p>

                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        )
                                            : ''
                                    }
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Size</td>
                        <td className="py-2">4.5</td>
                    </tr>
                    <tr>
                        <td className="left">Colors</td>
                        <td className="">
                            <input id="colorInput" type="text" />
                            <div className="flex flex-row w-full">
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Add Color</button>
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Delete Color</button>
                            </div>
                            <select class="form-multiselect block w-full mt-1 border border-gray-500 focus:border-gray-700" multiple>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                                <option>Option 4</option>
                                <option>Option 5</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <div className="flex flex-row w-full mt-7">
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Save As Draft</button>
                                <button type="button" class="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Submit</button>
                            </div>
                        </td>

                    </tr>
                </table>
            </div>
        </div>
    )
}

export default OrderEstimate
