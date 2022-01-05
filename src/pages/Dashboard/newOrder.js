import { isEmpty } from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { InfoSVG } from '../../assets/SVGs';
import { DashboardChart, Form } from '../../components';
import { UseNewOrder } from '../../customHooks';
import { getInputClasses } from '../../utils/helpers';
import Button from './button';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../../components/spinner/Spinner';

const NewOrder = ({ readOnly, selectedOrder, closeOrder }) => {
  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const {
    _onBlur,
    _onFocus,
    showFormDetails,
    onCancleOrder,
    removeItem,
    addAnother,
    handlePMSModal,
    handleThreadModal,
    removeColor,
    handleColors,
    handleQty,
    filterOptions,
    _HandleChange,
    handleRemoveImg,
    handleRemoveOrderImg,
    OrderUploadClick,
    onChangeOrderFile,
    handleClick,
    onChangeFile,
    setColor,
    formik,
    date,
    week,
    total,
    grandTotal,
    gTotalWithMarkup,
    loading,
    images,
    orderImages,
    apiError,
    showPMSModal,
    showThreadModal,
    data,
    errors,
    values,
    color,
    selected,
    orderNo,
    orderUpload,
    upload,
    EnableAddAnother,
    DisableAddAnother,
    canAddAnother,
    handleNotes
  } = UseNewOrder({ readOnly, selectedOrder, closeOrder });

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="form" noValidate="novalidate">
        <div className="flex flex-col justify-center items-center">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
            {query.get('active') === 'new-order' && 'Create New Order'}
            {query.get('active') === 'open-order' && readOnly && 'Order Details'}
            {query.get('active') === 'open-order' && !readOnly && 'Edit Details'}
            {query.get('active') === 'closed-order' && readOnly && 'Order Details'}
            {query.get('active') === 'closed-order' && !readOnly && 'Edit Details'}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-full sm:w-2/3 lg:w-1/3  mb-10 space-y-2 px-3">
            <div className="flex flex-row items-center space-x-2">
              <span>
                <InfoSVG name={'orderTitle'} />
                <ReactTooltip
                  id="orderTitle"
                  place="top"
                  effect="solid"
                  border={false}
                  borderColor="white"
                  clickable={false}>
                  Name of your Order
                </ReactTooltip>
              </span>
              <input
                disabled={readOnly ? true : false}
                className={`input ${getInputClasses(formik, 'title')}`}
                placeholder="Enter a name for your order..."
                type="text"
                id="title"
                name="title"
                {...formik.getFieldProps('title')}
              />
              <p className="font-semibold text-red-600">*</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <span>
                <InfoSVG name={'orderRef'} />
                <ReactTooltip
                  id="orderRef"
                  place="top"
                  effect="solid"
                  border={false}
                  borderColor="white"
                  clickable={false}>
                  Your reference number
                </ReactTooltip>
              </span>
              <input
                disabled={readOnly ? true : false}
                className={`input ${getInputClasses(formik, 'reference')}`}
                placeholder="Enter Customer Reference..."
                type="text"
                id="reference"
                name="reference"
                {...formik.getFieldProps('reference')}
              />
              <p className="font-semibold text-red-600">*</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <span>
                <InfoSVG name={'orderDate'} />
                <ReactTooltip
                  id="orderDate"
                  place="top"
                  effect="solid"
                  border={false}
                  borderColor="white"
                  clickable={false}>
                  <ul>
                    <li>Standard - 3-4 weeks - Standard</li>
                    <li>Expedited - 2-3 weeks - 30%</li>
                    <li>Rush - 1-2 weeks - 50%</li>
                    <li>Miracle if even possible under 1 week - 75%</li>
                  </ul>
                </ReactTooltip>
              </span>
              <input
                type={'text'}
                name="date"
                value={date}
                placeholder="In hands date"
                onFocus={_onFocus}
                disabled={readOnly ? true : false}
                onBlur={_onBlur}
                className={`input ${isEmpty(date) ? 'border-red-600' : ''}`}
                onChange={_HandleChange}
              />
              <p className="font-semibold text-red-600">*</p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col md:flex-row py-5 space-y-2 md:space-y-0 
            			justify-center md:justify-around items-start">
          <div className="flex flex-col w-full h-full justify-center items-center md:sticky md:top-2">
            <div className="w-full h-full px-3 sm:w-2/3">
              <div className=" h-44 w-full border overflow-y-scroll border-gray-400">
                <div className="align-middle inline-block min-w-full">
                  <div className="overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {values && !isEmpty(values)
                          ? values.map((item, index) => (
                              <div
                                key={index}
                                className={`flex flex-row cursor-pointer ${
                                  index === orderNo ? 'bg-red-600' : 'bg-white'
                                } hover:bg-red-600 
																group-hover:text-white w-full py-2 px-3  items-center`}>
                                <div
                                  className="flex items-center w-full"
                                  onClick={() => showFormDetails(index)}>
                                  <div className="flex flex-col w-1/12 text-center">
                                    <div
                                      className={`text-sm ${
                                        index === orderNo ? 'text-white' : 'text-black'
                                      } `}>
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div className="flex flex-col w-10/12 px-10">
                                    <div
                                      className={`text-sm ${
                                        index === orderNo ? 'text-white' : 'text-black'
                                      }`}>
                                      {item['object_ref']?.product
                                        ? item['object_ref']?.product
                                        : item.product}
                                      ,{' '}
                                      {item['object_ref']?.material
                                        ? item['object_ref']?.material
                                        : item.material}
                                      ,{' '}
                                      {item['object_ref']?.backing
                                        ? item['object_ref']?.backing
                                        : item.backing}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  onClick={() => removeItem(index)}
                                  className="flex flex-col w-1/12 px-5 cursor-pointer">
                                  <svg
                                    className={`w-4 h-4 ${
                                      index === orderNo ? 'text-white' : 'text-black'
                                    }`}
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
                            ))
                          : ''}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <button
                  disabled={readOnly ? true : canAddAnother}
                  onClick={addAnother}
                  type="button"
                  className={`inline-flex 
									${
                    readOnly
                      ? 'bg-red-500 cursor-default'
                      : canAddAnother
                      ? 'bg-red-500 cursor-default'
                      : 'bg-red-600 hover:bg-red-700'
                  }
									justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white focus:outline-none
									`}>
                  Add Another
                </button>
                <div className="flex flex-row mt-4 w-full ">
                  <button
                    disabled={readOnly ? true : false}
                    type="button"
                    className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
                    Save as Draft
                  </button>
                  <button
                    disabled={readOnly ? true : false}
                    type="submit"
                    className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
                    {query.get('active') === 'new-order' && 'Submit Order'}
                    {query.get('active') === 'open-order' && 'Update Order'}
                    {query.get('active') === 'closed-order' && ' Reorder'}

                    {loading && (
                      <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                    )}
                  </button>
                </div>
                <button
                  disabled={readOnly ? true : false}
                  onClick={onCancleOrder}
                  type="button"
                  className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
                  Cancel
                </button>
              </div>
            </div>
            <div
              className={`flex flex-row w-full px-3 mt-6 mb-6 sm:w-2/3 space-x-2 ${
                orderImages === '' ? 'justify-center' : 'justify-start'
              }`}>
              <div className={`flex flex-row ${orderImages === '' ? '' : 'w-full'}`}>
                <input
                  type="file"
                  accept="image/*"
                  ref={orderUpload}
                  className="hidden"
                  onChange={onChangeOrderFile}
                />
                <Button
                  type="button"
                  disabled={readOnly ? true : false}
                  onClick={OrderUploadClick}
                  label={
                    <>
                      <p className="text-sm font-white font-bold">Upload Purchase Order(s)</p>&nbsp;
                      <svg
                        className="w-4 h-4 font-bold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </>
                  }
                  classNames="p-2 w-auto flex items-center bg-red-600 text-white hover:bg-red-700 "
                />
              </div>
              <div
                className={`${
                  orderImages === ''
                    ? 'hidden'
                    : 'flex  border pr-1 relative border-red-600 rounded-md p-1 w-full h-auto items-center'
                }`}>
                <p className="flex justify-between w-full">
                  {orderImages?.name}
                  <svg
                    onClick={() => handleRemoveOrderImg()}
                    className="w-6 h-6 rounded-md cursor-pointer hover:shadow-lg z-50"
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
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full px-3 py-4 sm:w-2/3 border rounded-md space-y-3">
              <div
                className={`${
                  isEmpty(images) !== true
                    ? 'grid grid-cols-3 sm:grid-cols-4 gap-2'
                    : 'flex justify-center'
                } w-full`}>
                {!isEmpty(images) ? (
                  images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt="img" className="w-30 h-30 rounded-lg object-cover" />
                      <div
                        onClick={() => handleRemoveImg(index)}
                        className="absolute flex top-0 right-0 border-1 rounded-full text-red-600 hover:ring-2 hover:ring-red-500  w-5 h-5 shadow-md z-50 bg-white items-center justify-center">
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
                  ))
                ) : (
                  <div>
                    <svg
                      className="w-40 h-40 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-center">
                <input
                  type="file"
                  multiple={true}
                  accept="image/*"
                  ref={upload}
                  className="hidden"
                  onChange={onChangeFile}
                />
                <Button
                  type="button"
                  disabled={readOnly ? true : false}
                  onClick={handleClick}
                  label={
                    <>
                      <p className="text-sm font-white font-bold">Add Image(s)</p>&nbsp;
                      <svg
                        className="w-4 h-4 font-bold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </>
                  }
                  classNames="p-2 w-auto flex mb-8 items-center bg-red-600 text-white hover:bg-red-700 "
                />
              </div>
            </div>

            <div className="flex flex-col w-full h-full pt-5 space-y-8">
              <DashboardChart
                data={data}
                apiError={apiError}
                values={values[orderNo]}
                week={week}
              />
              <table className="mt-10 md:mt-0 mx-auto">
                <thead>
                  <tr>
                    <td className="left-estimate-table text-right font-medium">Total:</td>
                    <td className="left-estimate-table">{total}</td>
                  </tr>
                  <tr>
                    <td className="left-estimate-table text-right font-medium">Fee:</td>
                    <td className="left-estimate-table">
                      {date === ''
                        ? ''
                        : week < 1
                        ? '75%'
                        : week >= 1 && week < 2
                        ? '50%'
                        : week >= 2 && week < 3
                        ? '30%'
                        : 'Standard'}
                    </td>
                  </tr>
                  <tr>
                    <td className=" left-estimate-table text-right font-medium">Grand Total:</td>
                    <td className=" left-estimate-table">{grandTotal}</td>
                  </tr>
                  <tr>
                    <td className=" left-estimate-table text-right font-medium">
                      Grand Total(including markup):
                    </td>
                    <td className=" left-estimate-table">{gTotalWithMarkup}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="flex flex-col pt-20 md:pt-0 w-full">
            {/* <div className="flex flex-col md:flex-row">
							<div className="flex flex-col w-full md:w-3/12 px-3 py-2 justify-start">
								<p className="text-left sm:text-right text-sm align-top">Vendor</p>
							</div>
							<div className="flex flex-col w-full justify-center items-center md:w-9/12 ">

							</div>
						</div> */}
            {/* <div className="flex flex-col md:flex-row">
							<div className="flex flex-col w-full md:w-3/12 px-3 py-2  justify-start  ">
							</div>
							<div className="flex flex-col w-full md:w-9/12">
								<div className="flex flex-col w-full">
									<div className={`py-4  ${isEmpty(images) !== true ? 'grid grid-cols-2 sm:grid-cols-4 gap-2' : 'flex justify-center'} w-full`}>
										{
											isEmpty(images) !== true ?
												images.map((image, index) => (
													<div key={index} className="relative">
														<img src={image} alt="img" className="w-36 h-36 rounded-lg" />
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
											onChange={onChangeFile}
										/>
										<Button
											type='button'
											disabled={readOnly ? true : false}
											onClick={handleClick}
											label={(
												<>
													<p className="text-sm font-white font-bold">Add Image(s)</p>&nbsp;
													<svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
													</svg>
												</>
											)}
											classNames="p-2 w-auto flex mb-8 items-center bg-red-600 text-white hover:bg-red-700 "
										/>
									</div>
								</div>
							</div>
						</div> */}

            {/* {console.log('errors', errors)} */}
            {values[orderNo] && errors[orderNo] && (
              <Form
                color={color}
                errors={errors[orderNo]}
                orderNo={orderNo}
                selected={selected}
                readOnly={readOnly}
                values={values[orderNo]}
                showPMS={showPMSModal}
                showThread={showThreadModal}
                setColor={setColor}
                handleQty={handleQty}
                removeColor={removeColor}
                handleColors={handleColors}
                handlePMSModal={handlePMSModal}
                handleThreadModal={handleThreadModal}
                handleChange={_HandleChange}
                filterOptions={filterOptions}
              />
            )}
            {/* <div className="flex flex-col sm:flex-row">
							<div className="flex flex-col w-full sm:w-3/12 px-3 py-2  justify-start  ">
								<p className="text-left sm:text-right text-sm align-top">Ship To Address:</p>
							</div>
							<div className="flex flex-col w-full sm:w-9/12 px-3 py-2">
								<textarea
									rows={4}
									disabled={readOnly ? true : false}
									className={`input ${getInputClassNamees('shipAddress')}`}
									placeholder="Shipping Address..."
									type="text"
									id="shipAddress"
									name="shipAddress"
									{...formik.getFieldProps('shipAddress')}
								/>
							</div>
						</div> */}
            {/* <div className="flex flex-col md:flex-row">
							<div className="flex flex-col w-full md:w-3/12 px-3 py-2  justify-start  ">
							</div>
							<div className="flex flex-col w-full md:w-9/12">
								<div className="flex flex-col w-full">
									<div className={`py-4  ${isEmpty(orderImages) !== true ? 'grid grid-cols-2 sm:grid-cols-4 gap-2' : 'flex justify-center'} w-full`}>
										{
											!isEmpty(orderImages) ?
												orderImages.map((image, index) => (
													<div key={index} className="relative">
														<img src={image} alt="img" className="w-36 h-36 rounded-lg" />
														<div onClick={() => handleRemoveOrderImg(index)} className="absolute flex top-0 right-0 border-1 rounded-full text-red-600 hover:ring-2 hover:ring-red-500  w-5 h-5 shadow-md z-50 bg-white items-center justify-center">
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
											ref={orderUpload}
											className="hidden"
											onChange={onChangeOrderFile}
										/>
										<Button
											type='button'
											disabled={readOnly ? true : false}
											onClick={OrderUploadClick}
											label={(
												<>
													<p className="text-sm font-white font-bold">Upload Purchase Order(s)</p>&nbsp;
													<svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
													</svg>
												</>
											)}
											classNames="p-2 w-auto flex mb-8 items-center bg-red-600 text-white hover:bg-red-700 "
										/>
									</div>
								</div>
							</div>
						</div> */}
            {/* <div className="flex flex-col sm:flex-row ">
							<div className="flex flex-col w-full sm:w-3/12 px-3 py-2 justify-start">
								<p className="text-left sm:text-right text-sm align-top">Customer Notes:</p>
							</div>
							<div
								style={{ height: 'fit-content' }}
								className="flex flex-col w-full sm:w-9/12 px-3 py-2">
								<TextEditor
									notes={notes}
									handleNotes={handleNotes}

								/>

							</div>
						</div> */}
          </div>
        </div>
        <div className="flex flex-col w-full px-3 py-2 justify-start ">
          <p className=" text-left text-sm align-top">
            Ship To Address: <span className="text-red-600 font-semibold">*</span>
          </p>
          <div className="flex flex-col w-full ">
            <textarea
              rows={4}
              disabled={readOnly ? true : false}
              className={`input ${getInputClasses(formik, 'shipAddress')}`}
              placeholder="Shipping Address..."
              type="text"
              id="shipAddress"
              name="shipAddress"
              {...formik.getFieldProps('shipAddress')}
            />
          </div>
        </div>
        <div className="flex flex-col w-full px-3 py-2  justify-start  ">
          <p className="text-left text-sm align-top">Customer Notes:</p>
          <div className="flex flex-col w-full ">
            <textarea
              rows={4}
              disabled={readOnly ? true : false}
              className={`input ${getInputClasses(formik, 'customerNote')}`}
              placeholder="Please add any additional information needed for this order"
              type="text"
              id="customerNote"
              name="customerNote"
              {...formik.getFieldProps('customerNote')}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewOrder;
