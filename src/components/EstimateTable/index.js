import { render } from '@testing-library/react';
import React, { Component } from 'react';
import moment from 'moment';
//   import { useReactToPrint } from 'react-to-print'; only works with class component.

class EstimateChart extends Component {
	render() {

		const { values, data, selected, Size, apiError } = this.props;

		return (
			<table className="mt-8 md:mt-0 mx-auto" >
				{/* <tr>
                    <td className="left-estimate-table text-right">Estimated Price:</td>
                    <td className="left-estimate-table"></td>
                </tr> */}
				<tr>
					<td className="left-estimate-table text-right">Backing:</td>
					<td className="left-estimate-table">{values.backing}</td>
				</tr>
				{/* <tr>
                    <td className=" left-estimate-table text-right">Pricing:</td>
                    <td className=" left-estimate-table"></td>
                </tr> */}
				{/* <tr>
                    <td className=" left-estimate-table text-right">Vendor:</td>
                    <td className=" left-estimate-table">{values.vendor}</td>
                </tr> */}
				<tr>
					<td className="left-estimate-table text-right">Date:</td>
					<td className="left-estimate-table">{moment().format('MMMM Do YYYY')}</td>
				</tr>
				<tr>
					<td className="left-estimate-table text-right">Markup:</td>
					<td className="left-estimate-table">{values.markup}</td>
				</tr>
				<tr>
					<td className=" px-3 w-56 font-bold text-right">Result</td>
					{/* <td className="border px-8 py-4">Neal Garrison</td> */}
				</tr>
				{
					apiError ?
						<tr>
							<td className="left-estimate-table" colSpan={2}>
								<div className="flex flex-col justify-center items-center w-full">

									<p className="text-center font-medium py-1 px-1 border">{apiError}</p>
								</div>
							</td>
						</tr>
						:
						<>
							<tr>
								<td className=" left-estimate-table text-right align-text-top">Unit Price:</td>
								<td className="left-estimate-table">
									<div className="flex w-full justify-center">
										<p className="text-left">
											{
												data ?
													selected.map(({ value }) => (
														data.map(({ count, unitPrice }, index) => (
															value === count.toString() ?
																`pcs${count} @ ${unitPrice} / `
																: ''
														))
													))

													:
													''
											}
										</p>
									</div>
								</td>
							</tr>
							<tr>
								<td className=" left-estimate-table text-right align-text-top">Unit Cost:</td>
								<td className="left-estimate-table">
									<div className="flex w-full justify-center">
										<p className="">
											{
												data ?
													selected.map(({ value }) => (
														data.map(({ count, unitCost }, index) => (
															value === count.toString() ?
																`pcs${count} @ ${unitCost} / `
																: ''
														))
													))

													:
													''
											}
										</p>
									</div>
								</td>
							</tr>
						</>
				}
				{/* <tr>
                    <td className="left-estimate-table" colSpan={2}>
                        <div className="flex flex-col justify-center items-center w-full">
                            {
                                apiError ?
                                    <p className="text-center font-medium py-1 px-1 border">{apiError}</p>
                                    :
                                    <>
                                        <div className="flex w-full justify-center">
                                            <div className="flex-col w-1/3 border">
                                                <p className="text-center font-medium ">PC</p>
                                            </div>
                                            <div className="flex-col w-1/3 border">
                                                <p className="text-center font-medium">Unit Cost</p>
                                            </div>
                                            <div className="flex-col w-1/3 border">
                                                <p className="text-center font-medium ">Unit Price</p>
                                            </div>
                                        </div>
                                        {
                                            data ?
                                                selected.map(({ value }) => (
                                                    data.map(({ count, unitPrice, unitCost }, index) => (
                                                        value === count.toString() ?
                                                            <div className="flex w-full justify-center">
                                                                <div className="flex-col w-1/3 border">
                                                                    <p className="text-center ">{count}</p>
                                                                </div>
                                                                <div className="flex-col w-1/3 border">
                                                                    <p className="text-center">{unitCost}</p>
                                                                </div>
                                                                <div className="flex-col w-1/3 border">
                                                                    <p className="text-center ">{unitPrice}</p>
                                                                </div>
                                                            </div>
                                                            : ''
                                                    ))
                                                ))

                                                :
                                                ''
                                        }
                                    </>
                            }
                        </div>
                    </td>
                </tr> */}
				{/* <tr>
					<td className="left-estimate-table" colSpan={2}>
						<div className="flex flex-col justify-center items-center w-full">
							{
								apiError ?
									<p className="text-center font-medium py-1 px-1 border">{apiError}</p>
									:
									<>
										<div className="flex flex-col w-full justify-center border">
											<div className="flex flex-row w-full h-full justify-start items-start">
												<div className="flex-col w-1/3">
													<p className="text-center font-medium">Cost:</p>
												</div>
												<div className="flex flex-row w-2/3 border-l ">
													<p>{
														data ?
															selected.map(({ value }) => (
																data.map(({ count, unitCost }) => (
																	value === count.toString() && (
																		`pcs ${count} @ ${unitCost} / `
																	)
																))
															))

															:
															''
													}
													</p>
												</div>
											</div>
											<div className="flex flex-row w-full h-full justify-start items-start border-t">
												<div className="flex-col w-1/3">
													<p className="text-center font-medium">Price:</p>
												</div>
												<div className="flex flex-row w-2/3 border-l">
													<p>{
														data ?
															selected.map(({ value }) => (
																data.map(({ count, unitPrice }) => (
																	value === count.toString() && (
																		`pcs ${count} @ ${unitPrice} / `
																	)
																))
															))

															:
															''
													}
													</p>
												</div>
											</div>
										</div>

									</>
							}
						</div>
					</td>
				</tr> */}
				<tr>
					<td className=" left-estimate-table text-right">Product Name:</td>
					<td className=" left-estimate-table">{values.product}</td>
				</tr>
				<tr>
					<td className=" left-estimate-table text-right">Border:</td>
					<td className="left-estimate-table">{values.border}</td>
				</tr>
				<tr>
					<td className=" left-estimate-table text-right">Percent Embriodery:</td>
					<td className=" left-estimate-table">{values.pe}</td>
				</tr>
				<tr>
					<td className="left-estimate-table text-right">Backing:</td>
					<td className=" left-estimate-table">{values.backing}</td>
				</tr>
				<tr>
					<td className=" left-estimate-table text-right">Shape:</td>
					<td className="left-estimate-table ">{values.cut}</td>
				</tr>
				<tr>
					<td className="left-estimate-table text-right">Size:</td>
					<td className=" left-estimate-table">{values.size}</td>
				</tr>
			</table>
		)
	}
}
export default EstimateChart;
