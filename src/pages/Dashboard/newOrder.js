import React, { useState, useEffect, useRef } from 'react';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import ReactTooltip from "react-tooltip";

import Button from './button';
import { DashboardChart, Form, TextEditor } from '../../components';
import { OrderFormSchema } from '../../utils/validation_schema';
import { updateValues, updateErrors } from '../../utils/helpers'
import store from '../../store';
import { storeOrder, storeOrderCache } from '../../actions'
import AxiosInstance from '../../APIs/axiosInstance';
import moment from 'moment';


var fileArray = [];
var fileObj = [];
var fileOrderArray = [];
var fileOrderObj = [];
const NewOrder = ({ readOnly, selectedOrder, closeOrder }) => {

	const item = {
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
		markup: '10',
		discountApply: false,
		wLeft: '1',
		wRight: '0',
		wCenter: '0',
		hLeft: '1',
		hCenter: '0',
		hRight: '0',
		size: 1,
		data: [],
		colors: [],
		pmsColors: []
	};

	const error = {
		qty: true,
		product: true,
		material: true,
		backing: true,
		pe: true
	}

	const [loading, setLoading] = useState(false)
	const [orderNo, setOrderNo] = useState(0)
	const [date, setDate] = useState('')
	const [week, setWeek] = useState(0)

	const [images, setImages] = useState([]);
	const [orderImages, setOrderImages] = useState('');
	const [selected, setSelected] = useState([]);
	const [color, setColor] = useState('');
	const [notes, setNotes] = useState('');
	const [values, setValues] = useState([item]);
	const [errors, setErrors] = useState([error]);
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const [gTotalWithMarkup, setGrandTotalWithMarkup] = useState(0);
	const [apiError, setAPIError] = useState('');
	const [showPMSModal, setShowPMSModal] = useState(false);
	const [showThreadModal, setShowThreadModal] = useState(false);


	useEffect(() => {
		if (selectedOrder) {
			let { items, images, date, week, errors, notes } = selectedOrder;
			setDate(date);
			setImages(images);
			setNotes(notes);
			setErrors(errors);
			setValues(items);
			setData(items[orderNo].data)
			setWeek(week);
		}
	}, [])

	useEffect(() => {
		_Total();
		_grandTotal();
		_GrandTotalWithMarkup();
	}, [images, values, errors, orderImages]);


	const initialValues = {
		title: selectedOrder?.title || '',
		reference: selectedOrder?.reference || '',
		date: selectedOrder?.date || '',
		shipAddress: selectedOrder?.shipAddress || '',
		customerNote: selectedOrder?.customerNote || ''
	};

	let upload = useRef();

	let onChangeFile = (event) => {
		fileObj.push(event.target.files)
		for (let i = 0; i < fileObj[0].length; i++) {
			fileArray.push(URL.createObjectURL(fileObj[0][i]))
		}
		setImages(fileArray); /// if you want to upload latter
	}

	let handleClick = () => {
		upload.current.click();
	}

	let handleRemoveImg = (index) => {
		if (!readOnly) {
			let CopyOriginal = [...images];
			CopyOriginal.splice(index, 1);
			setImages(CopyOriginal);
		}
	}
	let orderUpload = useRef();

	let onChangeOrderFile = (event) => {
		const { files } = event.target;
		setOrderImages(files[0]); /// if you want to upload latter
	}

	let OrderUploadClick = () => {
		orderUpload.current.click();
	}

	let handleRemoveOrderImg = (index) => {
		if (!readOnly) {
			setOrderImages(orderImages => orderImages = '');
		}
	}

	const handleNotes = (value) => {
		setNotes(notes => notes = value)
		const { title, reference } = initialValues;
		const data = [{ title, reference, date, images, purchaseOrders: orderImages, value, items: [...values], errors: [...errors] }]
		store.dispatch(storeOrderCache(data))
	};

	const handleChange = (e, index) => {
		const { name, value, checked } = e.target;
		const NewArray = [...values];
		const NewErrors = [...errors];

		setValues([]);

		if (name === 'product' || name === "material" || name === "pe" || name === "backing") {
			if (value === '') {
				let updatedErrorArray = updateErrors(NewErrors, name, true, index)
				let updatedArray = updateValues(NewArray, name, value, index)
				setErrors([...updatedErrorArray])
				setValues([...updatedArray]);
			}
			else {
				let updatedErrorArray = updateErrors(NewErrors, name, false, index)
				let updatedArray = updateValues(NewArray, name, value, index)
				setErrors([...updatedErrorArray])
				setValues([...updatedArray]);
			}
		}
		else if (name === 'discountApply') {
			let updatedArray = updateValues(NewArray, name, checked, index)
			setValues([...updatedArray]);
		}
		else if (name === 'date') {
			var now = moment(new Date()); //todays date
			var end = moment(value); // end date
			var weeks = end.diff(now, 'weeks');
			setDate(value);
			setWeek(weeks);
		}
		else {
			let updatedArray = updateValues(NewArray, name, value, index)
			setValues([...updatedArray]);
		}
		handleSize(orderNo);
	}

	let handleSize = (orderNo) => {
		let CopyOriginal = [...values];
		let HResult = 0;
		let WResult = 0;
		let { hLeft, hRight, wLeft, wRight } = values[orderNo];
		//width
		{
			if (wRight !== '0') {
				let newWidthCenter = wRight.split('/');
				let WidthNum = parseInt(newWidthCenter[0])
				let WidthDen = parseInt(newWidthCenter[1])
				WResult = WidthNum / WidthDen;
			}
			//height
			if (hRight !== '0') {
				let newHeightCenter = hRight.split('/');
				let HeightNum = parseInt(newHeightCenter[0])
				let HeightDen = parseInt(newHeightCenter[1])
				HResult = HeightNum / HeightDen;
			}
			var size = (((parseInt(wLeft) + WResult) + (parseInt(hLeft) + HResult)) / 2);
			var roundedhalf = Math.round(size * 2) / 2;

			let UpdateArray = CopyOriginal.map((item, i) => {
				if (i !== orderNo) return item;
				item.wCenter = WResult;
				item.hCenter = HResult;
				item.size = roundedhalf;
				return item;
			})
			setValues([...UpdateArray]);
			callAPI();
		}
	}
	let callAPI = async () => {
		const { product, material, backing, size, pe, freight, markup, pmsColors, setQty } = values[orderNo];

		if (product === '' || material === '' || backing === '' || pe === '' || isEmpty(setQty)) {
			// swal({
			//     text: 'Fill Mandatory Fields',
			//     icon: 'error',
			//     dangerMode: true,
			//     buttons: false,
			//     timer: 3000,
			// })
		}
		else {
			const data = {
				product: product,
				material: material,
				backing: backing,
				size: size,
				pc: parseInt(pe),
				addColor: pmsColors.length,
				freight: freight || 0,
				markup: markup || 1,
			}
			AxiosInstance.ordereEstimate(data)
				.then(({ data: { data, message } }) => {
					if (message === "Failed" && data[0].error === 'Custom') {
						swal({
							text: 'Custom Quote will be given in 1-2 days',
							icon: 'info',
							dangerMode: true,
							buttons: false,
							timer: 3000,
						})
						setAPIError('Custom Quote will be given in 1 - 2 days')
						setData([]);
					}
					else if (message === 'Failed' && data[0].error === 'Not Found') {
						swal({
							text: 'Data Not Found',
							icon: 'info',
							dangerMode: true,
							buttons: false,
							timer: 3000,
						})
						setAPIError('');
						setData([]);
					}
					else {
						swal({
							text: 'Data Successfully Fetched',
							icon: 'success',
							dangerMode: true,
							buttons: false,
							timer: 3000,
						})
						setAPIError('');
						setData(data);
						let UpdateArray = [...values].map((item, i) => {
							if (i !== orderNo) return item;
							item.data = data;
							return item;
						})
						setValues([...UpdateArray]);
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


	let filterOptions = (options, filter) => {
		if (!filter) {
			return options;
		}
		return options.filter(({ label }) => label && label.includes(filter));
	}

	let handleQty = (valuess, index) => {
		const NewErrors = [...errors];
		let updatedErrorArray = [];

		if (isEmpty(valuess) === true) {
			updatedErrorArray = updateErrors(NewErrors, 'qty', true, orderNo)
			setErrors([...updatedErrorArray])
		}
		else {
			updatedErrorArray = updateErrors(NewErrors, 'qty', false, orderNo)
			setErrors([...updatedErrorArray])
		}
		let value = valuess.filter(({ value }) => value);

		setSelected(value);
		let updatedArray = updateValues(values, 'setQty', valuess, orderNo)
		setValues([...updatedArray]);
		callAPI();
	}


	let handleColors = () => {
		if (color !== '') {
			let CopyOriginal = [...values];
			let updatedColorArray = CopyOriginal.map((item, i) => {
				if (i !== orderNo) return item;
				if (color.includes('PMS')) {
					item.colors.push(color);
					item.pmsColors.push(color);
				}
				else if (color.includes('G')) {
					item.colors.push(color);
				}
				else {
					item.colors.push(`PMS ${color}`);
					item.pmsColors.push(`PMS ${color}`);
				}
				return item;
			})
			setValues([...updatedColorArray]);
			setColor('');
		}
		handleSize(orderNo);
	}

	let removeColor = (index) => {
		if (!readOnly) {
			let CopyOriginal = [...values];
			let colors = CopyOriginal[orderNo].colors;
			let FilteredColors = colors.filter((color) => !colors[index].match(color));
			let updatedArray = updateValues(CopyOriginal, 'colors', FilteredColors, orderNo)
			setValues(updatedArray);
			handleSize(orderNo);
		}
	}

	let handlePMSModal = () => {
		setShowPMSModal(showPMSModal => !showPMSModal);
	}
	let handleThreadModal = () => {
		setShowThreadModal(showThreadModal => !showThreadModal);
	}


	let addAnother = () => {
		let CopyOriginalValues = [...values];
		let CopyOriginalErrors = [...errors];
		let newErrorArray = [...CopyOriginalErrors, error]
		let newValueArray = [...CopyOriginalValues, item]
		setOrderNo(orderNo + 1);
		setErrors(newErrorArray)
		setValues(newValueArray)

	}

	let removeItem = (index) => {
		if (!readOnly) {
			if (values.length < 2 && errors.length < 2) {
				return
			}
			let currValues = [...values];
			let currErrors = [...errors];
			currValues.splice(index, 1);
			currErrors.splice(index, 1);
			setOrderNo((currentValue) => currentValue - 1);
			setErrors(currErrors);
			setValues(currValues);

		}
	}

	let onCancleOrder = () => {
		if (!readOnly) {
			setErrors([error]);
			setOrderNo(0);
			setValues([item]);
		}
	}

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
		onSubmit: ({ title, reference }, { setStatus, setSubmitting, resetForm }) => {
			setSubmitting(true);
			enableLoading();
			const data = [{ title, reference, date, images, week: week, purchaseOrders: orderImages, notes, items: [...values], errors: [...errors] }]
			store.dispatch(storeOrder(data))
			swal({
				icon: 'success',
				text: 'Order Submitted Sucessfully',
				dangerMode: true,
				buttons: false,
				timer: 3000,
			})
			disableLoading();
		},
	});

	let showFormDetails = (index) => {
		setOrderNo(index);
	}

	let _onFocus = (e) => {
		e.currentTarget.type = "date";
	}

	let _onBlur = (e) => {
		if (date === '') {
			e.currentTarget.type = "text";
			e.currentTarget.placeholder = "In hands date";
		}
	}

	let _Total = () => {
		const CopyOriginal = [...values];
		var Total = 0;
		CopyOriginal.map((item, i) => (
			item.data.map(({ unitPrice, count }) => (
				Total = Total + (count * unitPrice)
			))
		))
		setTotal(total => total = Total);
	}
	let _grandTotal = () => {
		const CopyOriginal = [...values];
		var GrandTotal = 0;
		CopyOriginal.map((item, i) => (
			item.data.map(({ unitPrice, count }) => {
				if (week < 1) {

					GrandTotal = GrandTotal + ((unitPrice * count).toFixed(3)) * 0.75
				}
				else if (week >= 1 && week < 2) {

					GrandTotal = GrandTotal + ((unitPrice * count).toFixed(3)) * 0.50

				}
				else if (week >= 2 && week < 3) {

					GrandTotal = GrandTotal + ((unitPrice * count).toFixed(3)) * 0.30

				}
				else {

					GrandTotal = GrandTotal + ((unitPrice * count).toFixed(3)) * 1
				}

			})
		))
		setGrandTotal(grandTotal => grandTotal = GrandTotal)
	}
	let _GrandTotalWithMarkup = () => {
		const CopyOriginal = [...values];
		var GrandTotalWithMarkup = 0;
		CopyOriginal.map((item, i) => (
			item.data.map(({ unitPrice, count }) => {
				if (week < 1) {

					GrandTotalWithMarkup = GrandTotalWithMarkup + ((((((unitPrice * count).toFixed(3)) * 0.75).toFixed(3))) * item.markup)
				}
				else if (week >= 1 && week < 2) {

					GrandTotalWithMarkup = GrandTotalWithMarkup + (((((unitPrice * count).toFixed(3)) * 0.50).toFixed(3)) * item.markup)

				}
				else if (week >= 2 && week < 3) {

					GrandTotalWithMarkup = GrandTotalWithMarkup + (((((unitPrice * count).toFixed(3)) * 0.30).toFixed(3)) * item.markup)

				}
				else {

					GrandTotalWithMarkup = GrandTotalWithMarkup + (((((unitPrice * count).toFixed(3)) * 1).toFixed(3)) * item.markup)
				}

			})
		))
		setGrandTotalWithMarkup(gTotalWithMarkup => gTotalWithMarkup = GrandTotalWithMarkup)
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
						{
							readOnly ?
								'Order Details' :
								'Create New Order'
						}
					</h1>
				</div>
				<div className="flex flex-col justify-center items-center" >
					<div className="flex flex-col w-full sm:w-2/3 lg:w-1/3  mb-10 space-y-2 px-3">

						<div className="flex flex-row items-center">
							<span>
								<svg data-tip data-for="orderTitle" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<ReactTooltip id="orderTitle" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
									Name of your Order
								</ReactTooltip>
							</span>&nbsp;

							<input
								disabled={readOnly ? true : false}
								className={`input ${getInputClassNamees('title')}`}
								placeholder="Enter a name for your order..."
								type="text"
								id="title"
								name="title"
								{...formik.getFieldProps('title')}
							/>
						</div>
						<div className="flex flex-row items-center">
							<span>
								<svg data-tip data-for="orderRef" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<ReactTooltip id="orderRef" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
									Reference name with which you want your order to be identified
								</ReactTooltip>
							</span>&nbsp;

							<input
								disabled={readOnly ? true : false}
								className={`input ${getInputClassNamees('reference')}`}
								placeholder="Enter Customer Reference..."
								type="text"
								id="reference"
								name="reference"
								{...formik.getFieldProps('reference')}
							/>
						</div>
						<div className="flex flex-row items-center">
							<span>
								<svg data-tip data-for="orderDate" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<ReactTooltip id="orderDate" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
									<ul>
										<li>Standard - 3-4 weeks - Standard</li>
										<li>Expedited - 2-3 weeks - 30%</li>
										<li>Rush - 1-2 weeks - 50%</li>
										<li>Miracle if even possible under 1 week - 75%</li>
									</ul>
								</ReactTooltip>
							</span>&nbsp;
							<input
								type={'text'}
								name="date"
								value={date}
								placeholder="In hands date"
								onFocus={_onFocus}
								disabled={readOnly ? true : false}
								onBlur={_onBlur}
								className={`input ${getInputClassNamees('date')}`}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row py-5 space-y-2 md:space-y-0 
            			justify-center md:justify-around items-start"
				>
					<div className="flex flex-col w-full h-full justify-center items-center md:sticky md:top-2">
						<div className="w-full h-full px-3 sm:w-2/3">
							<div className=" h-44 w-full border overflow-y-scroll border-gray-400">
								<div className="align-middle inline-block min-w-full">
									<div className="overflow-hidden border">
										<table className="min-w-full divide-y divide-gray-200">
											<tbody className="bg-white divide-y divide-gray-200">

												{
													values && !isEmpty(values) ?
														values.map((item, index) => (
															<div key={index} onClick={() => showFormDetails(index)}
																className={`flex flex-row cursor-pointer ${index === orderNo ? 'bg-red-600' : 'bg-white'} hover:bg-red-600 
																group-hover:text-white w-full py-2 px-3  items-center`}>
																<div className="flex flex-col w-1/12 text-center">
																	<div className={`text-sm ${index === orderNo ? 'text-white' : 'text-black'} `}>{index + 1}</div>
																</div>
																<div className="flex flex-col w-10/12 px-10">
																	<div className={`text-sm ${index === orderNo ? 'text-white' : 'text-black'}`}>{item.product}, {item.material}, {item.backing}</div>
																</div>
																<div
																	onClick={() => removeItem(index)}
																	className="flex flex-col w-1/12 px-5 cursor-pointer">
																	<svg className={`w-4 h-4 ${index === orderNo ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
								<button
									disabled={readOnly ? true : false}
									onClick={addAnother} type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
								>
									Add Another
								</button>
								<div className="flex flex-row mt-4 w-full ">
									<button
										disabled={readOnly ? true : false}
										type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
									>
										Save as Draft
									</button>
									<button
										disabled={readOnly ? true : false}
										type="submit" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
										{closeOrder ? 'Reorder' : 'Submit Order'}
										{loading &&
											<div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
									</button>
								</div>
								<button
									disabled={readOnly ? true : false}
									onClick={onCancleOrder} type="button" className="inline-flex bg-red-600 justify-center w-full border border-gray-300 shadow-sm px-2 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
								>
									Cancel
								</button>
							</div>
						</div>
						<div className={`flex flex-row w-full px-3 mt-6 sm:w-2/3 space-x-2 ${orderImages === '' ? 'justify-center' : 'justify-start'}`}>
							<div className={`flex flex-row ${orderImages === '' ? '' : 'w-full'}`}>
								<input
									type="file"
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
							<div onClick={() => handleRemoveOrderImg()}
								className={`${orderImages === '' ? 'hidden' : 'flex border relative border-red-600 rounded-md p-1 w-full h-10'}`}>
								<p>{orderImages?.name}  <svg className="w-6 h-6 rounded-md absolute right-0 top-2 cursor-pointer hover:shadow-lg z-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg></p>
							</div>
						</div>

						<div className="flex flex-col w-full px-3 sm:w-2/3 border border-red-600 rounded-md border-dotted">
							<div className={`py-4  ${isEmpty(images) !== true ? 'grid grid-cols-2 sm:grid-cols-4 gap-2' : 'flex justify-center'} w-full`}>
								{
									!isEmpty(images) ?
										images.map((image, index) => (
											<div key={index} className="relative">
												<img src={image} alt="img" className="w-36 h-30 rounded-lg" />
												<div onClick={() => handleRemoveImg(index)} className="absolute flex top-0 right-0 border-1 rounded-full text-red-600 hover:ring-2 hover:ring-red-500  w-5 h-5 shadow-md z-50 bg-white items-center justify-center">
													<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
													</svg>
												</div>
											</div>
										))
										: <div>
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

						<div className="flex flex-col w-full h-full pt-5 space-y-8">
							<DashboardChart
								data={data}
								apiError={apiError}
								values={values[orderNo]}
								week={week}
							/>
							<table className="mt-10 md:mt-0 mx-auto" >
								<tr>
									<td className="left-estimate-table text-right font-medium">Total:</td>
									<td className="left-estimate-table">{total}</td>
								</tr>
								<tr>
									<td className="left-estimate-table text-right font-medium">Fee:</td>
									<td className="left-estimate-table">{
										week < 1 ? (
											"75%"
										)
											:
											week >= 1 && week < 2 ? (
												"50%"
											)
												:
												week >= 2 && week < 3 ? (
													"30%"
												)
													:

													("Standard")
									}</td>
								</tr>
								<tr>
									<td className=" left-estimate-table text-right font-medium">Grand Total:</td>
									<td className=" left-estimate-table">{grandTotal}</td>
								</tr>
								<tr>
									<td className=" left-estimate-table text-right font-medium">Grand Total(including markup):</td>
									<td className=" left-estimate-table">{gTotalWithMarkup}</td>
								</tr>

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
						{
							values[orderNo] && errors[orderNo] && (
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
									handleChange={handleChange}
									filterOptions={filterOptions}
								/>

							)
						}
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
				<div className="flex flex-col w-full px-3 py-2  justify-start  ">
					<p className="text-left text-sm align-top">Ship To Address:</p>
					<div className="flex flex-col w-full ">
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
				</div>
				<div className="flex flex-col w-full px-3 py-2  justify-start  ">
					<p className="text-left text-sm align-top">Customer Notes:</p>
					<div className="flex flex-col w-full ">
						<textarea
							rows={4}
							disabled={readOnly ? true : false}
							className={`input ${getInputClassNamees('customerNote')}`}
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
	)
}

export default NewOrder;
