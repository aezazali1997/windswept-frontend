import React, { useEffect } from 'react';

const DashboardChart = ({ values, data, apiError, week }) => {
	
  useEffect(() => {}, [week]);

  return (
    <table className="mt-8 md:mt-0 mx-auto">
      <tbody>
        {/* <tr>
                    <td className="left-estimate-table text-right">Estimated Price:</td>
                    <td className="left-estimate-table"></td>
                </tr> */}
        {/* <tr>
				<td className="left-estimate-table text-right">Backing:</td>
				<td className="left-estimate-table">{values.backing}</td>
			</tr> */}
        {/* <tr>
                    <td className=" left-estimate-table text-right">Pricing:</td>
                    <td className=" left-estimate-table"></td>
                </tr> */}
        {/* <tr>
                    <td className=" left-estimate-table text-right">Vendor:</td>
                    <td className=" left-estimate-table">{values.vendor}</td>
                </tr> */}
        {/* <tr>
				<td className="left-estimate-table text-right">Date:</td>
				<td className="left-estimate-table">{moment().format('MMMM Do YYYY')}</td>
			</tr>
			<tr>
				<td className="left-estimate-table text-right">Markup:</td>
				<td className="left-estimate-table">{values.markup}</td>
			</tr>*/}
        {/* <tr>
				<td className=" px-3 w-56 font-bold text-right">Result</td>
				<td className="left-estimate-table"></td>
			</tr> */}
        <tr>
          <td className=" px-3 w-56 font-bold text-right"></td>
          <td className="left-estimate-table"></td>
        </tr>
        <tr>
          <td className="left-estimate-table" colSpan={2}>
            {apiError ? (
              <p className="text-center font-medium py-2 px-1 border ">{apiError}</p>
            ) : (
              <div className="flex rounded-md flex-col justify-center items-center w-full ">
                <>
                  <div className="flex w-full justify-center">
                    <div className="flex-col w-1/3 border">
                      <p className="text-center font-medium ">PC</p>
                    </div>
                    <div className="flex-col w-1/3 border">
                      <p className="text-center font-medium ">Unit Price</p>
                    </div>
                    <div className="flex-col w-1/3 border">
                      <p className="text-center font-medium">Total</p>
                    </div>
                    {/* <div className="flex-col w-1/3 border">
											<p className="text-center font-medium">Fee</p>
										</div>
										<div className="flex-col w-1/3 border">
											<p className="text-center font-medium">Grand Total</p>
										</div>
										<div className="flex-col w-1/3 border">
											<p className="text-center font-medium">Grand Total (including markup)</p>
										</div>  */}
                  </div>
                  {  
										data
                    	? values.setQty.map(({ value }) =>
                        data.map(({ count, unitPrice }, index) =>
                          value === count.toString() ? (
                            <div key={index} className="flex w-full justify-center">
                              <div className="flex-col w-1/3 border">
                                <p className="text-center ">{count}</p>
                              </div>
                              <div className="flex-col w-1/3 border">
                                <p className="text-center ">{unitPrice}</p>
                              </div>
                              <div className="flex-col w-1/3 border">
                                <p className="text-center ">{(unitPrice * count).toFixed(3)}</p>
                              </div>
                               {/* <div className="flex-col w-1/3 border">
                    						<p className="text-center ">
                    							{
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
                    							}
                    						</p>
                    					</div> */}
                    					{/* <div className="flex-col w-1/3 border">
                    						<p className="text-center ">
                    							{
                    								week < 1 ? (
                    									parseFloat((unitPrice * count) * 0.75).toFixed(3)
                    								)
                    									:
                    									week >= 1 && week < 2 ? (
                    										parseFloat((unitPrice * count) * 0.50).toFixed(3)
                    									)
                    										:
                    										week >= 2 && week < 3 ? (
                    											parseFloat((unitPrice * count) * 0.30).toFixed(3)
                    										)
                    											:
                    											parseFloat((unitPrice * count)).toFixed(3)
                    							}
                    						</p>
                    					</div> */}
                    					{/* <div className="flex-col w-1/3 border">
                    						<p className="text-center ">
                    							{
                    								week < 1 ? (
                    									parseFloat(((unitPrice * count) * 0.75) * values.markup).toFixed(3)
                    								)
                    									:
                    									week >= 1 && week < 2 ? (
                    										parseFloat(((((unitPrice * count)) * 0.50)) * values.markup).toFixed(3)
                    									)
                    										:
                    										week >= 2 && week < 3 ? (
                    											parseFloat(((((unitPrice * count)) * 0.30)) * values.markup).toFixed(3)
                    										)
                    											:
                    											((((unitPrice * count))) * values.markup).toFixed(3)
                    							}
                    						</p>
                    					</div>  */}
                            </div>
                          ) : (
                            ''
                          )
                        )
                      )
                    : ''
									}
                </>
              </div>
            )}
          </td>
        </tr>
        {/* <tr>
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
				<td className=" left-estimate-table text-right">Cut:</td>
				<td className="left-estimate-table ">{values.cut}</td>
			</tr>
			<tr>
				<td className="left-estimate-table text-right">Size:</td>
				<td className=" left-estimate-table">{values.size}</td> */}
        {/* </tr> */}
      </tbody>
    </table>
  );
}

export default DashboardChart;
