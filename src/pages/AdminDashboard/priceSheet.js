import { isEmpty } from 'lodash';
import Select from 'react-select';
import { AutoSizeInput, PriceSheetModal } from '../../components';
import UseFetchPriceData from '../../customHooks/useFetchPriceSheet';

const PriceSheet = () => {

	const { data, selected, sheets, showNameModal, formik, modalTitle, initialValues, renameSheetTitle, addNewSheet,
		addRow, RemoveRow, addColumn, handleChange, getInputClasses, onSelectSheet, toggleModal }
		= UseFetchPriceData();

	return (
		<div className="flex flex-col w-full space-y-3 py-5 px-6 lg:px-8">
			<div className="flex flex-col md:justify-between w-full md:flex-row space-y-3 md:space-x-3 md:space-y-0">
				<div className="flex flex-col md:justify-between md:flex-row space-y-3 md:space-x-3 md:space-y-0">

					<Select
						className="md:w-96"
						classNamePrefix="select"
						value={selected}
						name="color"
						options={sheets}
						onChange={onSelectSheet}
					/>
					<button
						onClick={addNewSheet}
						className="flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
					>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
						Add Sheet
					</button>
					<button
						onClick={renameSheetTitle}
						className="flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
					>
						Rename Sheet Title
					</button>
					<button
						className="flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
						Delete Sheet
					</button>
					<button
						className="flex items-center font-sans text-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
					>
						Save Sheet
					</button>
				</div>
				<div className="flex md:space-x-2">
					<button
						onClick={addColumn}
						className="flex items-center font-sans py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
						Add Column
					</button>
					<button
						className="flex items-center font-sans py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
						Delete Column
					</button>
				</div>
			</div>


			<div className="flex w-full space-x-3" style={{ maxHeight: '65vh' }}>
				<div className="overflow-scroll w-full">
					<table className="table-auto">
						<tr>
							{
								data && !isEmpty(data) && (
									Object.entries(data[0]).map(([keys], index) => (
										<th key={index} className="p-0 border">
											<AutoSizeInput
												type={'text'}
												readOnly={true}
												name={keys}
												value={keys}
												Style="h-full w-full p-2 text-md font-black focus:outline-none"
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
													type={'number'}
													name={key}
													value={value}
													rowIndex={rowIndex}
													handleChange={handleChange}
													Style="h-full w-full p-2 focus:outline-none"
												/>
											</td>
										))
									}
								</tr>
							))
						}

					</table>
				</div>

			</div>
			<div className="flex space-x-3">
				<button
					onClick={addRow}
					disabled={data ? false : true}
					className={`flex items-center font-sans py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white ${!isEmpty(data) ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 pointer-events-none'}  focus:outline-none`}>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
					Add Row
				</button>
				<button
					onClick={RemoveRow}
					className={`flex font-sans items-center py-1 px-4 border border-transparent text-sm
						font-medium rounded-md text-white ${!isEmpty(data) ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 pointer-events-none'} focus:outline-none`} >
					<svg className="w-5 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
					Delete Row
				</button>
			</div>
			{
				showNameModal && (
					<form onSubmit={formik.handleSubmit}>
						<PriceSheetModal
							title={modalTitle}
							body={(
								<div className="flex flex-row space-x-2 w-full items-center">
									<div className="flex flex-col">
										<input
											name="title"
											placeholder="Enter product"
											className={`${getInputClasses(
												"title"
											)} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-10`}
											{...formik.getFieldProps('title')}
										/>
										{formik.touched.title && formik.errors.title ? (
											<div className="text-red-700 text-sm" >{formik.errors.title}</div>
										) : null}
									</div>
									<div className="flex flex-col">
										<input
											name="material"
											placeholder="Enter material"
											className={`${getInputClasses(
												"material"
											)} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-10`}
											{...formik.getFieldProps('material')}
										/>
										{formik.touched.material && formik.errors.material ? (
											<div className="text-red-700 text-sm" >{formik.errors.material}</div>
										) : null}
									</div>
								</div>
							)}
							handleModal={toggleModal}
						/>
					</form>
				)
			}
		</div>
	)
}

export default PriceSheet;

