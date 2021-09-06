import React from 'react'
import PriceSheetModal from '../PriceSheetModal'

const ModalDecider = ({ modalTitle, formik, getInputClasses, toggleModal, _onDelete }) => {
	return (
		<>
			{
				modalTitle === 'Add Sheet' || modalTitle === 'Rename Sheet Title' || modalTitle === 'Add Column' ?
					(<form onSubmit={formik.handleSubmit}>
						<PriceSheetModal
							title={modalTitle}
							ConfirmButton={modalTitle === 'Add Sheet' || modalTitle === 'Rename Sheet Title' ? 'Submit'
								: 'Add'
							}
							body={
								modalTitle === 'Add Sheet' || modalTitle === 'Rename Sheet Title' ? (
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
								)
									: (
										<div className="flex flex-col w-full justify-center space-y-4">
											<p className="text-sm md:text-md lg:text-lg xl:text-xl">
												Once added, cannot be renamed
											</p>
											<input
												name="column"
												placeholder="Column name"
												className={`${getInputClasses(
													"column"
												)} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-10`}
												{...formik.getFieldProps('column')}
											/>
											{formik.touched.column && formik.errors.column ? (
												<div className="text-red-700 text-sm" >{formik.errors.column}</div>
											) : null}
										</div>
									)

							}
							handleModal={toggleModal}
						/>
					</form>
					)
					:
					(<PriceSheetModal
						title={modalTitle}
						ConfirmButton={modalTitle === 'Delete Sheet' ? 'Delete' : modalTitle === 'Save Sheet' ? 'Save' : ''
						}
						body={
							modalTitle === 'Delete Sheet' ? (

								<div className="flex flex-col h-40 w-full justify-center items-center">
									<p className="text-black text-sm md:text-md lg:text-lg xl:text-xl">
										Once deleted cannot be restored
									</p>
									<p className="text-black text-sm md:text-md lg:text-lg xl:text-xl">
										Are you sure?
									</p>
								</div>
							) :
								(
									<div className="flex flex-col h-40 w-full justify-center items-center">
										<p className="text-black text-sm md:text-md lg:text-lg xl:text-xl">
											Are you sure you want to save?
										</p>
									</div>

								)
						}
						handleModal={toggleModal}
						_onDelete={_onDelete}
					/>

					)
			}
		</>

	)
}

export default ModalDecider;
