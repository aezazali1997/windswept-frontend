import React from 'react';
import 'react-dropdown/style.css';
import MultiSelect from 'react-multi-select-component';
import {
  multiQty,
  size,
  products,
  materials,
  backings,
  peData,
  borders,
  cutData,
  packagingData,
  colorData
} from '../../utils/consts';
import { Select } from '../../components';

const Form = ({
  thread,
  handleChange,
  handleColors,
  selected,
  setChecked,
  filterOptions,
  values,
  checked,
  setColor,
  color,
  removeColor,
  ColorsArray,
  handleQty,
  errors,
  loading
}) => {
  const { product, material, pe, backing, qty } = errors;

  return (
    <>
      {/* <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                    <p className="text-left sm:text-right text-sm align-top">Vendor</p>
                </div>
                <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                    <input
                        className="input"
                        type="text"
                        name="vendor"
                        onChange={handleChange}
                    />
                </div>
            </div> */}
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">
            Product <span className="text-red-600 font-bold">*</span>
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="product"
            name="product"
            classNames={`select ${product ? 'border-red-500' : 'border-gray-500'}`}
            handleChange={handleChange}
            data={products}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">
            Material <span className="text-red-600 font-bold">*</span>
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="material"
            name="material"
            classNames={`select ${material ? 'border-red-500' : 'border-gray-500'}`}
            handleChange={handleChange}
            data={materials}
          />
        </div>
      </div>
      {values.material === 'Woven' && (
        <>
          <div className="flex flex-col sm:flex-row w-full ">
            <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
              <p className="text-left sm:text-right text-sm align-top">Custom</p>
            </div>
            <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
              <input
                value={`${values.custom}%`}
                disabled={true}
                className="input"
                name="custom"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full ">
            <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
              <p className="text-left sm:text-right text-sm align-top">Freight</p>
            </div>
            <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
              <input onChange={handleChange} className="input" name="freight" type="text" />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">
            Backing <span className="text-red-600 font-bold">*</span>
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="backing"
            name="backing"
            classNames={`select ${backing ? 'border-red-500' : 'border-gray-500'}`}
            handleChange={handleChange}
            data={backings}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">
            Percent Embriodery <span className="text-red-600 font-bold">*</span>
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="pe"
            name="pe"
            classNames={`select ${pe ? 'border-red-500' : 'border-gray-500'}`}
            handleChange={handleChange}
            data={peData}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Border</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="border"
            name="border"
            classNames={`select border-gray-500`}
            handleChange={handleChange}
            data={borders}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Shape</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="cut"
            name="cut"
            classNames={`select border-gray-500`}
            handleChange={handleChange}
            data={cutData}
          />
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row w-full ">
                        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                            <p className="text-left sm:text-right text-sm align-top">Quantity</p>
                        </div>
                        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                            <select id="country" name="country"  className=" select">
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
      {/* <div className="flex flex-col sm:flex-row w-full ">
                <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start">
                    <p className="text-left sm:text-right text-sm align-top">Packaging</p>
                </div>
                <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                    <Select
                        id='packaging'
                        name='packaging'
                        classNames={`select`}
                        handleChange={handleChange}
                        data={packagingData}
                    />
                </div>
            </div> */}
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">
            Select Quantity <span className="text-red-600 font-bold">*</span>
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3">
          <MultiSelect
            className={`multi border rounded-md ${qty ? 'border-red-500' : 'border-gray-500'}`}
            value={selected}
            options={multiQty}
            selected={selected}
            onChange={handleQty}
            labelledBy={'Select'}
            filterOptions={filterOptions}
          />
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row w-full ">
                <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                    <p className="text-left sm:text-right text-sm align-top">Optional item #</p>
                </div>
                <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                    <input
                        onChange={handleChange}
                        className="input"
                        name="optionalItem"
                        type="text"
                    />
                </div>
            </div> */}
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Mark Up</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <input
            onChange={handleChange}
            className="input border-gray-500"
            name="markup"
            type="text"
          />
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row w-full ">
                <div className="flex flex-col w-full sm:w-3/12 px-3 py-2 justify-start">
                    <p className="text-left sm:text-right text-sm align-top">Discount Apply</p>
                </div>
                <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                    <input
                        type="checkbox"
                        class="form-checkbox h-4 w-4 text-blue-600"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                </div>
            </div> */}
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Width</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <div className="flex flex-row  w-full sm:w-1/2">
            <select
              id="wLeft"
              value={values.wLeft}
              name="wLeft"
              onChange={handleChange}
              className="rounded-md cursor-pointer w-auto py-2 border border-gray-500 bg-gray-50 focus:bg-white shadow-sm focus:outline-none focus:border-gray-400  sm:text-sm">
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
              className="py-2 px-3 w-full bg-gray-50 focus:outline-none border border-gray-400 mx-1 rounded-md"
              name="wCenter"
              value={values.wCenter}
              readOnly
              type="text"
            />
            <select
              id="wRight"
              value={values.wRight}
              name="wRight"
              onChange={handleChange}
              className=" w-auto rounded-md py-2  text-white border border-red-600 bg-red-600 shadow-sm cursor-pointer hover:bg-transparent hover:text-red-600  focus:outline-none focus:border-gray-400 hover:cursor-pointer sm:text-sm">
              {size &&
                size.map((value, index) => (
                  <option
                    className="bg-white text-black"
                    key={index}
                    value={value}>{`${value}`}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Height</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <div className="flex flex-row  w-full sm:w-1/2">
            <select
              id="hLeft"
              value={values.hLeft}
              onChange={handleChange}
              name="hLeft"
              className="rounded-md w-auto py-2 border border-gray-500 bg-gray-50 focus:bg-white shadow-sm focus:outline-none focus:border-gray-400 cursor-pointer sm:text-sm">
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
              className="rounded-md bg-gray-50 mx-1 border border-gray-400 py-2 px-3 w-full focus:outline-none"
              readOnly
              name="hCenter"
              value={values.hCenter}
              type="text"
            />
            <select
              id="hRight"
              value={values.hRight}
              name="hRight"
              onChange={handleChange}
              className="rounded-md w-auto py-2  text-white bg-red-600 hover:bg-transparent hover:text-red-600 border border-red-600 shadow-sm focus:outline-none focus:border-gray-400 cursor-pointer sm:text-sm">
              {size &&
                size.map((value, index) => (
                  <option
                    className="bg-white text-black"
                    key={index}
                    value={value}>{`${value}`}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-4 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Size</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <input
            value={values.size}
            disabled={true}
            className="input border-gray-500 text-gray-600"
            name="size"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
          <p className="text-left sm:text-right text-sm align-top">Color</p>
        </div>
        <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
          <Select
            id="color"
            name="color"
            classNames={`select border-gray-500`}
            handleChange={handleChange}
            data={colorData}
          />
        </div>
      </div>
      {/* 
            <div className="flex flex-col sm:flex-row w-full ">
                <div className="flex flex-col w-full sm:w-3/12 px-3 py-2 justify-start">
                    <p className="text-left sm:text-right text-sm align-top">Colors</p>
                </div>
                <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                    <div class="flex w-full border-gray-400 border">
                        <select id="colorPick" value={values.colorPick} onChange={handleChange} name="colorPick" className=" w-auto py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-gray-400 hover:cursor-pointer sm:text-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <input onChange={e => setColor(e.target.value)} value={color} className="w-full p-2 focus:outline-none " type="text" placeholder="Enter Color Code" />
                        <button onClick={handleColors} className="border bg-red-600 hover:bg-red-700  text-white p-2 w-1/4">
                            <p className="font-medium text-sm">Add Color</p>
                        </button>
                    </div>
                    {
                        thread ?
                            <div className="flex flex-row w-full">
                                <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >PMS</button>
                                <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Thread</button>
                            </div>
                            :
                            ''
                    }
                    <div className="h-56 w-full border overflow-y-scroll border-gray-400">

                        <div className="align-middle inline-block min-w-full">
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            ColorsArray.map((color, index) => (
                                                <div key={index} className="flex flex-row border-b hover:bg-red-600 group-hover:text-white w-full py-2 px-3  items-center">
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
                    {
                        submit ?
                            <div className="flex flex-row w-full mt-7">
                                <button type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Save As Draft</button>
                                <button onClick={handleSubmit} type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium hover:bg-red-700 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >Submit  {loading &&
                                    <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
                                </button>
                            </div>
                            : ''
                    }
                </div>
            </div> */}
    </>
  );
};

export default Form;
