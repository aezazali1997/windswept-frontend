import { render } from '@testing-library/react';
import React, { Component } from 'react';


//   import { useReactToPrint } from 'react-to-print'; only works with class component.

class EstimateChart extends Component {
    render() {

        const { values, data, selected, Size } = this.props;

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
                {/* <tr>
                    <td colSpan={2}> */}
                <tr className="border">
                    <td className=" left-estimate-table  text-right font-medium border-r">PC:</td>
                    <td className=" left-estimate-table  text-left font-medium ">Unit Price:</td>
                </tr>
                {
                    data ?
                        selected.map(({ value }) => (
                            data.map(({ count, unitPrice }, index) => (
                                value === count.toString() ?

                                    <tr key={index} className="border">
                                        <td className=" left-estimate-table text-right border-r">
                                            {value}
                                        </td>
                                        <td className=" left-estimate-table text-left">
                                            {unitPrice}
                                        </td>
                                    </tr>
                                    : ''
                            ))
                        ))
                        :
                        ''
                }
                {/* </td>
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
