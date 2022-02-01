import React, { useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';
import { multiQty, size } from '../../utils/consts';
import Modal from '../Modal';
import PMSschema from '../../utils/PMSschema.json';
import Threadschema from '../../utils/thread-schema.json';
import { useLocation } from 'react-router-dom';

const From = ({
  handleChange,
  handleColors,
  selected,
  filterOptions,
  values,
  setColor,
  color,
  removeColor,
  handleQty,
  errors,
  orderNo,
  readOnly,
  handlePMSModal,
  handleThreadModal,
  showThread,
  showPMS,
}) => {
  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
  const query = useQuery();
  let { product, material, pe, backing, qty } = errors;
  // if (values) {
  //   if (values.product) {
  //     product = false;
  //   }
  //   if (values.material) {
  //     material = false;
  //   }
  //   if (values.pe) {
  //     pe = false;
  //   }
  //   if (values.backing) {
  //     backing = false;
  //   }
  //   if (values.setQty.length > 0) {
  //     qty = false;
  //   }
  // }

  let handleFormDisable = (value) => {


    if (values?.line_item_id && value === false && query.get('active')==='closed-order') {
      return;
    }
    let form = document.getElementById('orderForm');
    let elements = form.elements;
    let len = elements.length;
    for (let i = 0; i < len; ++i) {
      elements[i].disabled = value;
    }
  };
  useEffect(() => {

    if (readOnly === true) {
      handleFormDisable(true);
    } else {
      handleFormDisable(false);
    }
  }, [readOnly,orderNo]);
  useEffect(()=>{
  let multselect = document.querySelector('.multi');
  multselect.childNodes[0].childNodes[0].childNodes[0].firstChild.textContent="select..."
  },[1])

  return (
    <>
      <form id={'orderForm'} onSubmit={(e) => e.preventDefault()}>
        {/* <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
                        <p className="text-left sm:text-right text-sm align-top">Vendor</p>
                    </div>
                    <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
                        <input
                            value={values.vendor}
                            className="input"
                            type="text"
                            name="vendor"
                            onChange={(e) => handleChange(e, orderNo)}
                        />
                    </div>
                </div> */}

        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">
              Product <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="product"
              value={values.product}
              onChange={(e) => handleChange(e, orderNo)}
              name="product"
              className={`select  ${product ? 'border-red-500' : 'border-gray-500'}`}>
              <option value="">select...</option>
              <option value="EMB">Emblems</option>
              {/* <option value="Peel-N-Stick Embroidery">Peel-N-Stick Embroidery</option> */}
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
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">
              Material <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="material"
              name="material"
              value={values.material}
              onChange={(e) => handleChange(e, orderNo)}
              className={`select ${material ? 'border-red-500' : 'border-gray-500'}`}>
              <option value="select">select...</option>
              <option value="EMB/MAT: Full Embroidery">Full Embriodery</option>
              <option value="EMB/MAT: Twill">Twill</option>
              <option value="EMB/MAT: Dye Sub 100% Embroidered">Dye Sub 100% Embriodered</option>
              <option value="EMB/MAT: Dye Sub 100% Twill">Dye Sub 100% Twill</option>
              <option value="EMB/MAT: Woven">Woven</option>
              <option value="EMB/MAT: Embroidery / Dye Sublimation Combination">
                Embriodery / Dye Sublimation Combination
              </option>
              <option value="EMB/MAT: Embroidery / Woven Combination">
                Embriodery / Woven Combination
              </option>
              <option value="EMB/MAT: Faux leather">Faux Leather</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">
              Backing <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="backing"
              name="backing"
              value={values.backing}
              onChange={(e) => handleChange(e, orderNo)}
              className={`select ${backing ? 'border-red-500' : 'border-gray-500'}`}>
              <option value="select">select...</option>
              <option value="EMB/BAC: Plastic (sew on)">Plastic (sew on)</option>
              <option value="EMB/BAC: Heat Seal (iron on)">Heat Seal (iron on)</option>
              <option value="EMB/BAC: Peel-N-Stick Embroidery™ (stick on)">
                Peel-N-Stick Embroidery(stick on)
              </option>
              <option value="EMB/BAC: Velcro">Velcro</option>
              <option value="EMB/BAC: Cork (coaster)">Cork(coaster)</option>
              <option value="EMB/BAC: Magnet">Magnet</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">
              Percent Embriodery <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="pe"
              name="pe"
              value={values.pe}
              onChange={(e) => handleChange(e, orderNo)}
              className={`select ${pe ? 'border-red-500' : 'border-gray-500'}`}>
              <option value="select">select...</option>
              <option value="EMB/PEM: 100%">100%</option>
              <option value="EMB/PEM: 85%">85%</option>
              <option value="EMB/PEM: 75%">75%</option>
              <option value="EMB/PEM: 60%">60%</option>
              <option value="EMB/PEM: 50%">50%</option>
              <option value="EMB/PEM: 40%">40%</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Border</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="border"
              name="border"
              value={values.border}
              onChange={(e) => handleChange(e, orderNo)}
              className=" select border-gray-500">
              <option value="select">select...</option>
              <option value="EMB/BOR: Merrowed">Merrowed</option>
              <option value="EMB/BOR: Heat Cut">Heat Cut</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4 justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Shape</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="cut"
              name="cut"
              value={values.cut}
              onChange={(e) => handleChange(e, orderNo)}
              className="select border-gray-500">
              <option value="select">select...</option>
              <option value="EMB/CUT: Round">Round</option>
              <option value="EMB/CUT: Square">Square</option>
              <option value="EMB/CUT: Rectangle">Rectangle</option>
              <option value="EMB/CUT: Contour (cut to shape of design)">
                Contour (cut to shape of design)
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Packaging</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <select
              id="packaging"
              name="packaging"
              value={values.packaging}
              onChange={(e) => handleChange(e, orderNo)}
              className=" select border-gray-500">
              <option value="select">select...</option>
              <option value="None">None</option>
              <option value="Backer Card">Backer Card</option>
              <option value="Poly Bag and Header Card">Poly Bag and Header Card</option>
              <option value="Perforated Sheets">Perforated Sheets</option>
              <option value="Bar Code Sticker Attachments">Bar Code Sticker Attachments</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">
              Select Quantity <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-1">
            <MultiSelect
              disabled={readOnly ? true : false }

              className={`multi border ${qty ? 'border-red-500' : 'border-gray-500 '}`}
              value={values.setQty}
              options={multiQty}
              selected={selected}
              onChange={(values) => {
                handleQty(values, orderNo);
              }}
              
              labelledBy={'select'}
              filterOptions={filterOptions}
              
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Optional item #</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <input
            
              value={values.optionalItem}
              onChange={(e) => handleChange(e, orderNo)}
              className="input border-gray-500"
              name="optionalItem"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4   justify-start  ">
            <p className="text-left md:text-right text-sm align-top ">Your Customer Markup</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <input
              value={values.markup }
              className="input border-gray-500"
              name="markup"
              type="number"
              onChange={(e)=>{
                handleChange(e,orderNo)}
              }
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
                            name="discountApply"
                            class="form-checkbox h-4 w-4 text-blue-600"
                            checked={values.discountApply}
                            onChange={(e) => handleChange(e, orderNo)} />
                    </div>
                </div> */}
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Width</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <div className="flex flex-row  w-full sm:w-1/2">
              <select
                id="wLeft"
                value={values?.wLeft}
                name="wLeft"
                onChange={(e) => handleChange(e, orderNo)}
                className=" rounded-md w-auto py-2 border border-gray-500 bg-white shadow-sm focus:outline-none focus:border-gray-400 cursor-pointer  sm:text-sm ">
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
                className="py-2 px-3 mx-1 border border-gray-500 rounded-md w-full focus:outline-none"
                name="wCenter"
                value={values.wCenter}
                readOnly
                type="text"
              />
              <select
                id="wRight"
                value={values?.wRight}
                name="wRight"
                onChange={(e) => handleChange(e, orderNo)}
                className="rounded-md w-auto py-2  text-white hover:text-red-600 bg-red-600 hover:bg-transparent shadow-sm focus:outline-none focus:border-red-600 cursor-pointer sm:text-sm border border-red-600">
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
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Height</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <div className="flex flex-row  w-full sm:w-1/2">
              <select
                id="hLeft"
                value={values?.hLeft}
                onChange={(e) => handleChange(e, orderNo)}
                name="hLeft"
                className="border rounded-md w-auto py-2 border-gray-500 bg-white shadow-sm focus:outline-none focus:border-gray-400 cursor-pointer sm:text-sm">
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
                className="py-2 px-3 mx-1 rounded-md border border-gray-500 w-full focus:outline-none"
                readOnly
                name="hCenter"
                value={values.hCenter}
                type="text"
              />
              <select
                id="wRight"
                value={values?.hRight}
                name="hRight"
                onChange={(e) => handleChange(e, orderNo)}
                className="w-auto rounded-md py-2  text-white hover:text-red-600 bg-red-600 hover:bg-transparent shadow-sm focus:outline-none focus:border-red-600 cursor-pointer sm:text-sm border border-red-600">
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

        {/* old code */}
        {/* <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Size</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <p className="text-sm ">{values.size}</p>
          </div>
        </div> */}
        {/* old code end */}
    <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4  justify-start  ">
            <p className="text-left sm:text-right text-sm align-top">Size</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
            <input
            
              value={values.size}
              disabled={true}
              className="input border-gray-500 text-gray-600"
              name="optionalItem"
              type="text"
              
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full ">
          <div className="flex flex-col w-full sm:w-3/12 px-3 py-4 justify-start">
            <p className="text-left sm:text-right text-sm align-top">Colors</p>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 px-3 py-2 ">
            <div className="flex w-full  border rounded-md">
              <input
                value={color}
                type="text"
                disabled={
                  (values.colors?.length === 12 ||
                  values.colors?.length < 1) && query.get('active') === 'closed-order' ||
                  readOnly
                    ? true
                    : false
                }
                placeholder="Enter Color Code"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                className="color-place-holder rounded-md mr-1 w-full p-2 border border-gray-500  focus:outline-none"
              />

              <button
                type="button"
                disabled={
                  values.colors.length === 12 ||
                  (values.colors.length < 1 && query.get('active') === 'closed-order' && values?.line_item_id) ||
                  readOnly
                    ? true
                    : false
                }
                onClick={handleColors}
                className={`text-white  p-2 w-1/4
                  ${
                    ((values.colors.length < 1 && query.get('active') === 'closed-order' && values?.line_item_id) || values.colors.length === 12 )
                      ? 'bg-red-400 cursor-default'
                      : 'bg-red-600 hover:bg-transparent text-white hover:text-red-600 border border-red-600'
                  }`}>
                <p className="font-medium text-sm">
                  {values.colors.length === 12 ? 'Max Quantity Reach' : 'Add Color'}
                </p>
              </button>
            </div>
            <div className="flex flex-row w-full">
              <button
                onClick={() => handlePMSModal()}
                type="button"
                disabled={
                  values.colors.length === 12 ||
                  (values.colors.length < 1 && query.get('active') === 'closed-order' && values?.line_item_id) ||
                  readOnly
                    ? true
                    : false
                }
                className={` inline-flex mr-1  justify-center w-full border-r border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white  focus:outline-none
                  ${
                    ((values.colors.length < 1 && query.get('active') === 'closed-order' && values?.line_item_id) || values.colors.length === 12)
                      ? 'bg-red-400 cursor-default'
                      : 'bg-red-600 hover:bg-transparent text-white hover:text-red-600  border border-white hover:border-red-600'
                  }
                  `}>
                PMS
              </button>
              <button
                onClick={() => handleThreadModal()}
                type="button"
                disabled={
                  values.colors.length === 12 ||
                  (values.colors.length < 1 && query.get('active') === 'closed-order') ||
                  readOnly
                    ? true
                    : false
                }
                className={`inline-flex justify-center w-full  border-gray-300 shadow-sm px-2 py-2 text-sm text-white font-medium  focus:outline-none
                  ${
                    ((values.colors.length < 1 && query.get('active') === 'closed-order' && values?.line_item_id ) || values.colors.length === 12)
                      ? 'bg-red-400 cursor-default'
                      : 'bg-red-600 hover:bg-transparent text-white hover:text-red-600  border border-white hover:border-red-600'
                  }
                      `}>
                Thread
              </button>
            </div>

            <div className="h-56 w-full border overflow-auto rounded-md border-gray-400">
              <div className="align-middle inline-block min-w-full">
                <div className="">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {values.colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex flex-row border-b hover:bg-red-600 group w-full py-2 px-3  items-center">
                          <div className="flex flex-col w-1/12 text-center">
                            <div className="text-sm text-gray-900 group-hover:text-white">{index + 1}</div>
                          </div>
                          <div className="flex flex-col w-9/12 px-10">
                            <div className="text-sm text-gray-900 group-hover:text-white">{color}</div>
                          </div>
                          <div
                            onClick={() => removeColor(index)}
                            className="flex flex-col w-2/12 px-10 cursor-pointer group-hover:text-white">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showPMS ? (
        <Modal
          handleModal={handlePMSModal}
          title={'PMS Chart'}
          schema={PMSschema}
          setColor={setColor}
        />
      ) : showThread ? (
        <Modal
          handleModal={handleThreadModal}
          title={'Thread Chart'}
          schema={Threadschema}
          setColor={setColor}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default From;
