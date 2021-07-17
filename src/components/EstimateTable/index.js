import { render } from '@testing-library/react';
import React, { Component } from 'react';


//   import { useReactToPrint } from 'react-to-print'; only works with class component.

class EstimateChart extends Component {
    render() {

        const { values, data, selected, Size, apiError } = this.props;

        return (
            <table className="mt-8 md:mt-0 mx-auto" >
                <tr>
                    <td className="left-estimate-table text-right">Estimated Price:</td>
                    <td className="left-estimate-table"></td>
                </tr>
                <tr>
                    <td className="left-estimate-table text-right">Backing:</td>
                    <td className="left-estimate-table">{values.backing}</td>
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">Pricing:</td>
                    <td className=" left-estimate-table"></td>
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">Vendor:</td>
                    <td className=" left-estimate-table">{values.vendor}</td>
                </tr>
                <tr>
                    <td className="left-estimate-table text-right">Date:</td>
                    <td className="left-estimate-table">5/7/2021 , 14:11:34 pm</td>
                </tr>
                <tr>
                    <td className="left-estimate-table text-right">Markup:</td>
                    <td className="left-estimate-table">{values.markup}</td>
                </tr>
                <tr>
                    <td className=" px-3 w-56 font-bold text-right">Quote</td>
                    {/* <td className="border px-8 py-4">Neal Garrison</td> */}
                </tr>
                <tr>
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
                                                <p className="text-center font-medium ">Unit Price</p>
                                            </div>
                                        </div>
                                        {
                                            data ?
                                                selected.map(({ value }) => (
                                                    data.map(({ count, unitPrice }, index) => (
                                                        value === count.toString() ?
                                                            <div className="flex w-full justify-center">
                                                                <div className="flex-col w-1/3 border">
                                                                    <p className="text-center ">{count}</p>
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
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">Product Name:</td>
                    <td className=" left-estimate-table">{values.product}</td>
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">Border:</td>
                    <td className="left-estimate-table">{values.border}</td>
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">BackGround:</td>
                    <td className=" left-estimate-table"></td>
                </tr>
                <tr>
                    <td className="left-estimate-table text-right">Backing:</td>
                    <td className=" left-estimate-table">{values.backing}</td>
                </tr>
                <tr>
                    <td className=" left-estimate-table text-right">Shape:</td>
                    <td className="left-estimate-table "></td>
                </tr>
                <tr>
                    <td className="left-estimate-table text-right">Size:</td>
                    <td className=" left-estimate-table">{Size}</td>
                </tr>
            </table>
        )
    }
}
export default EstimateChart;
