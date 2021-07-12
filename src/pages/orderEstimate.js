import React, { useState } from 'react'
import MultiSelect from "react-multi-select-component";
import { multiQty, size } from '../utils/consts';

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
                            <button type="button" className="inline-flex bg-red-600 justify-center w-20 border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >Submit</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 ">
                <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Vendor</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">

                        <input
                            className="input"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Product</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className="select">
                            <option value="">select...</option>
                            <option value="Emblems">Emblems</option>
                            <option value="Peel-N-Stick Embroidery">Peel-N-Stick Embroidery</option>
                            <option value="Embroidered KeyFobs">Embroidered KeyFobs</option>
                            <option value="Woven 3D Puff Key Fobs">Woven 3D Puff Key Fobs</option>
                            <option value="Embriodered Bag Tags">Embriodered Bag Tags</option>
                            <option value="Embriodery Book Mark">Embriodery Book Mark</option>
                            <option value="Leather">Leather</option>
                            <option value="Lapel Pins">Lapel Pins</option>
                            <option value="Lanyards">Lanyards</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Material</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="Full Embriodery">Full Embriodery</option>
                            <option value="Twill">Twill</option>
                            <option value="Dye Sub 100% Embriodered">Dye Sub 100% Embriodered</option>
                            <option value="Dye Sub 100% Twill">Dye Sub 100% Twill</option>
                            <option value="Woven">Woven</option>
                            <option value="Embriodery / Dye Sublimation Combination">Embriodery / Dye Sublimation Combination</option>
                            <option value="Embriodery / Woven Combination">Embriodery / Woven Combination</option>
                            <option value="Faux Leather">Faux Leather</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Backing</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className="select">
                            <option value="">select...</option>
                            <option value="Plastic (sew on)">Plastic (sew on)</option>
                            <option value="Heat Seal (iron on)">Heat Seal (iron on)</option>
                            <option value="Peel-N-Stick Embroidery(stick on)">Peel-N-Stick Embroidery(stick on)</option>
                            <option value="Velcro">Velcro</option>
                            <option value="Cork(coaster)">Cork(coaster)</option>
                            <option value="Magnet">Magnet</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Percent Embriodery</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="85%">85%</option>
                            <option value="75%">75%</option>
                            <option value="60%">60%</option>
                            <option value="50%">50%</option>
                            <option value="40%">40%</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Border</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="Merrowed">Merrowed</option>
                            <option value="Heat Cut">Heat Cut</option>

                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Cut</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="1">Round</option>
                            <option value="Square">Square</option>
                            <option value="Rectangle">Rectangle</option>
                            <option value="Contour (cut to shape of design)">Contour (cut to shape of design)</option>

                        </select>
                    </div>
                </div>
                {/* <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Quantity</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                        </select>
                    </div>
                </div> */}
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Packaging</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <select id="country" name="country" autocomplete="country" className=" select">
                            <option value="">select...</option>
                            <option value="None">None</option>
                            <option value="Backer Card">Backer Card</option>
                            <option value="Poly Bag and Header Card">Poly Bag and Header Card</option>
                            <option value="Perforated Sheets">Perforated Sheets</option>
                            <option value="Bar Code Sticker Attachments">Bar Code Sticker Attachments</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Select Qty</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <MultiSelect
                            className="border rounded-md border-gray-400"
                            value={selected}
                            options={multiQty}
                            selected={selected}
                            onChange={setSelected}
                            labelledBy={"Select"}
                            filterOptions={filterOptions}
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Optional item #</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <input
                            className="input"
                            id="inline-password"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Mark Up</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <input
                            className="input"
                            id="inline-password"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Discount Apply</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" checked={checked} onClick={(e) => setChecked(e.target.checked)} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Width</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
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
                            <div className="relative inline-block text-center">
                                <div>
                                    <button onClick={() => setClicked(!clicked)} type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-gray-700 hover:bg-red-700 focus:outline-none"
                                        id="menu-button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                    >
                                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    clicked ? (
                                        <div className="origin-top-right absolute right-0 z-50 mt-2 w-auto h-18  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-0" role="none">
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
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Height</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
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
                            <div className="relative inline-block text-center">
                                <div>
                                    <button onClick={() => setHeightClicked(!heightClicked)}
                                        type="button"
                                        className="inline-flex bg-red-600 justify-center w-full border  border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-gray-700 hover:bg-red-700 focus:outline-none"
                                        id="menu-button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                    >
                                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {
                                    heightClicked ? (
                                        <div className="origin-top-center absolute right-0 mt-2 w-auto h-18  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-0" role="none">
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
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Size</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <p className="text-sm ">4.5</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2 justify-start">
                        <p className="text-left sm:text-right text-sm align-top">Colors</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <div className="flex w-full border-gray-400 border">
                            <input onChange={(e) => setColor(e.target.value)} value={color} className="w-full p-2 focus:outline-none " type="text" placeholder="Enter Color" />
                            <button onClick={handleColors} className="border bg-red-600 hover:bg-red-700  text-white p-2 w-1/4">
                                <p className="font-semibold text-xs">Add Color</p>
                            </button>
                        </div>

                        <div className="h-56 w-full border overflow-y-scroll border-gray-400">

                            <div className="align-middle inline-block min-w-full">
                                <div className=" overflow-hidden border">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                ColorsArray.map((color, index) => (
                                                    <div key={index} className="flex flex-row hover:bg-red-600 group-hover:text-white w-full py-2 px-3  items-center">
                                                        <div className="flex flex-col w-1/12 text-center">
                                                            <div className="text-sm text-gray-900">{index + 1}</div>
                                                        </div>
                                                        <div className="flex flex-col w-9/12 px-10">
                                                            <div className="text-sm text-gray-900">{color}</div>
                                                        </div>
                                                        <div onClick={() => removeColor(index)} className="flex flex-col w-2/12 px-10 cursor-pointer">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-row w-full mt-7">
                            <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >Save As Draft</button>
                            <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >Submit</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default OrderEstimate
