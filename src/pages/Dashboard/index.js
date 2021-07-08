import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import MultiSelect from "react-multi-select-component";
import _ from 'lodash';
import Button from './button';
import UploadImage from './uploadImage';
import { Input } from '../../components';
import { multiQty, size } from '../../utils/consts';

var fileObj = [];
var fileArray = [];

const Dashboard = () => {
    const [images, setImages] = useState([]);
    let upload = useRef();

    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [heightClicked, setHeightClicked] = useState(false);
    const [rightWidth, setRightWidth] = useState('');
    const [rightHeight, setRightHeight] = useState('');

    useEffect(() => {
        console.log('newarr', images);
    }, [images])

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


    let onChangeFile = (event) => {
        fileObj.push(event.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        console.log("files:", fileArray);
        setImages(fileArray); /// if you want to upload latter
    }

    let handleClick = () => {
        upload.current.click();
    }

    let handleRemoveImg = (img) => {
        console.log('index', img);
        const newArray = fileArray.filter((image) => image === img ? '' : image);
        setImages(newArray);
    }

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center p-5">
                <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
                    What would you like to do?
                </h1>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0  md:space-x-4">
                    <Button
                        label={'new order'}
                        classNames="w-56 h-20 bg-red-600 uppercase border text-white hover:bg-white hover:text-red-600 hover:border-red-600"
                    />

                    <Button
                        label={'open orders'}
                        classNames="w-56 h-20 bg-red-600 uppercase text-white hover:bg-white hover:text-red-600 border hover:border-red-600"
                    />

                    <Button
                        label={'closed orders'}
                        classNames="w-56 h-20 bg-red-600 uppercase text-white hover:bg-white hover:text-red-600 border hover:border-red-600"
                    />
                </div>
                <div className="flex flex-col md:flex-row mt-8 w-full md:w-3/5 lg:w-2/5 items-center">
                    <div class=" shadow-md w-full flex border-gray-400 border">
                        <span class="w-auto flex justify-end items-center text-gray-500 p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input class="w-full p-2 focus:outline-none" type="text" placeholder="Search by Item Name / Reference / Item No" />
                        <button class="bg-red-500 hover:bg-red-600  text-white p-2 pl-6 pr-6">
                            <p class="font-semibold text-xs">Search</p>
                        </button>
                    </div>
                    <div className="text-larger md:text-sm md:ml-5 mt-3 md:mt-0">
                        <Link to="/" className="font-medium  text-gray-600 hover:text-red-500 hover:underline">
                            Reset
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
                    Create New Order
                </h1>
                <div className="flex flex-col space-y-2">
                    <Input
                        type={"text"}
                        name={"order"}
                        placeholder={'Enter a name for your order...'}
                        classNames={"border placeholder-center content-center border-gray-400 p-2 text-sm w-80 focus:outline-none focus:ring-1 focus:ring-gray-600"} />
                    <Input
                        type={"text"}
                        name={"order"}
                        placeholder={'Enter Customer Reference...'}
                        classNames={"border border-gray-400 p-2 text-sm w-80 focus:outline-none focus:ring-1 focus:ring-gray-600"} />
                    <Input
                        type={"text"}
                        name={"order"}
                        placeholder={'Select requested completion date...'}
                        classNames={"border border-gray-400 p-2 text-sm w-80 focus:outline-none focus:ring-1 focus:ring-gray-600"} />
                </div>
                <div className="flex flex-col">
                    <div className={`py-4  ${_.isEmpty(images) !== true ? 'grid grid-cols-2 sm:grid-cols-4 gap-2' : 'flex justify-center'} w-full`}>
                        {
                            _.isEmpty(images) !== true ?
                                images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={image} alt="uploadedImgs" className="w-36 h-36 rounded-lg" />
                                        <div onClick={() => handleRemoveImg(image)} className="absolute flex top-0 right-0 border-1 rounded-full text-red-600 hover:ring-2 hover:ring-red-500  w-5 h-5 shadow-md z-50 bg-white items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                ))
                                :
                                <div>
                                    <svg className="w-40 h-40 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                                    <p className="text-sm font-white font-bold">Add Image(s)</p>&nbsp;
                                    <svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </>
                            )}
                            classNames="p-2 w-auto flex items-center bg-red-600 border text-white hover:bg-white hover:text-red-600 hover:border-red-600"
                        />
                        {/* <Button
                            label={(
                                <p className="text-sm font-white font-bold">Remove Image(s)</p>
                            )}
                            classNames="w-auto flex items-center  p-2 bg-red-600 border text-white hover:bg-white hover:text-red-600 hover:border-red-600"
                        /> */}
                    </div>
                </div>
            </div>
            <div className="w-screen py-5 flex flex-col lg:flex-row justify-around">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>

                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead> */}
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            Jane Cooper
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            jane.cooper@example.com
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                                                <div className="text-sm text-gray-500">Optimization</div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 lg:pt-0 mb-5 items-center">

                    <table className="right-estimate-table space-y-6">
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
        </>
    )
}

export default Dashboard;
