import React, { useEffect, useState } from 'react'
// import Spreadsheet from "react-spreadsheet"
import { isEmpty } from 'react-spreadsheet/dist/point-map';
import { AutoSizeInput } from '../../components';
import { updateValues } from '../../utils/helpers';
import Schema from './pricesheet.json';
import Select from 'react-select';

const PriceSheet = () => {

	const [sheets, setSheets] = useState([]);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log(Schema);
		const Sheets = Schema.map(obj => ({
			value: `${obj.title} - ${obj.material}`,
			label: `${obj.title} - ${obj.material}`
		}));
		setSheets(Sheets);
		if (!isEmpty(Sheets)) {
			setSelected(Sheets[0]);
			setData(Schema[0]?.pricing || [])
		}


		// setData(a);
	}, []);

	useEffect(() => { }, [sheets, data])

	const onSelectSheet = (values) => {
		console.log('selected: ', values);
		setSelected(values);
		Schema.filter(({ title, material, pricing }) => {
			console.log(material, title, pricing);
			if (values.label === `${title} - ${material}`) {
				console.log('before return: ', pricing);
				console.log('select: ', pricing);
				setData(pricing);
			}
		})
	}

	const addRow = () => {
		let copyArray = [...data];
		let newRow = {};
		newRow = copyArray[0];
		let updatedRow = {};
		newRow = Object.keys(newRow);
		newRow.map(key => {
			updatedRow[key] = ''
		})
		copyArray = [...copyArray, updatedRow];
		setData(copyArray);
	}

	const handleChange = (e, rowIndex) => {
		const { name, value } = e.target;
		console.log({ name, value, rowIndex });
		let copyArray = [...data];
		console.log(copyArray[rowIndex])
		let UpdatedArray = updateValues(copyArray, name, parseInt(value), rowIndex);
		console.log('newArray: ', UpdatedArray);
		setData(copyArray);
	}

	const handleHeads = (e, rowIndex) => {
		const { name, value } = e.target;
		console.log({ name, value, rowIndex });
		let copyArray = [...data];
		console.log(copyArray[rowIndex])
		let UpdatedArray = updateValues(copyArray, name, parseInt(value), rowIndex);
		console.log('newArray: ', UpdatedArray);
		setData(copyArray);
	}

	let addCell = () => {
	}

	// let RemoveRow = () => {
	// 	if (data.length > 2) {
	// 		let copyArray = [...data];
	// 		let abc = copyArray.splice(copyArray.length - 1, 1);
	// 		console.log('AfterCell: ', copyArray);
	// 		setData(copyArray);
	// 	}
	// }

	// let RemoveCell = () => {
	// 	let copyArray = [...data];
	// 	let abc = copyArray.map((item, i) => {
	// 		if (item.length > 2) {
	// 			item.splice(item.length - 1, 1);
	// 			return item;
	// 		}
	// 		return item;
	// 	})
	// 	console.log('AfterCell: ', abc);
	// 	setData(copyArray);
	// }

	return (
		<div className="flex-1 flex-col w-full space-y-3 py-5 px-2">
			<div className="flex flex-col w-full md:flex-row space-y-3 md:space-x-3">
				<button
					className="flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
					Add Sheet
				</button>
				<Select
					className="md:w-96"
					classNamePrefix="select"
					value={selected}
					name="color"
					options={sheets}
					onChange={onSelectSheet}
				/>
				<div className="flex space-x-3">
					<input
						value=''
						placeholder='Rename selected sheet'
						className="border flex w-full focus:outline-none focus:border-gray-400 py-1 px-2 rounded-md"
					/>
				</div>
			</div>


			<div className="flex w-full space-x-3" style={{ maxHeight: '65vh' }}>
				<div className="overflow-scroll w-11/12">
					<table className="table-auto">
						<tr>
							{
								data && !isEmpty(data) && (
									Object.entries(data[0]).map(([keys, value], index) => (
										<th key={index} className="p-0 border">
											<AutoSizeInput
												name={keys}
												value={keys}
												rowIndex={0}
												onChange={handleHeads}
												className="h-full w-full p-2 focus:outline-none"
											/>
										</th>
									))
								)
							}

						</tr>
						{
							data?.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{
										Object.entries(row).map(([key, value], colIndex) => (
											<td key={colIndex} className="border p-0 bg-gray-50">
												<AutoSizeInput
													name={key}
													value={value}
													rowIndex={rowIndex}
													handleChange={handleChange}
													className="h-full w-full p-2 focus:outline-none"
												/>
											</td>
										))
									}
								</tr>
							))
						}

					</table>
				</div>

				{/* <button className=" h-16 sm:h-10 px-3 py-2 bg-red-600 text-white text-sm" onClick={addCell}>Add Cell</button>
				<button className="h-16 sm:h-10 px-3 py-2 bg-red-600 text-white text-sm" onClick={RemoveCell}>Remove Cell</button> */}
				<div>
					<button
						onClick={addCell}
						className=" flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
						Add Column
					</button>
				</div>
			</div>
			<div>
				<button
					onClick={addRow}
					className="p-4 flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none" >
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
					Add Row
				</button>
			</div>

			{/* <div className="flex space-x-3">
				<button className="px-3 py-2 bg-red-600 text-white text-sm" onClick={addRow}>Add Row</button>
				<button className="px-3 py-2 bg-red-600 text-white text-sm" onClick={RemoveRow}>Remove Row</button>
			</div> */}
		</div>
	)
}

export default PriceSheet;

