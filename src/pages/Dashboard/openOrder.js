import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';

const OpenOrder = () => {

    const orders = useSelector(({ order: { order } }) => order);
    console.log(orders)

    const [selectedOrder, setSelectedOrder] = useState(undefined);

    let handleClick = (order) => {
        setSelectedOrder(order)
    }
    let goBacktoDetail = () => {
        setSelectedOrder(undefined)
    }


    return (
        selectedOrder ?
            <>
                <span onClick={goBacktoDetail} className="px-10 cursor-pointer">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </span>
                <NewOrder readOnly={true} selectedOrder={selectedOrder} />
            </>
            :
            <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">
                {
                    !isEmpty(orders) ?
                        orders.map(((order, index) => {
                            let { title, reference, date, images } = order;
                            return (
                                <div key={index}
                                    onClick={() => handleClick(order)}
                                    className='flex flex-row h-44 divide-gray-50 border divide-x-4 rounded-md divide-red-600
                                border-gray-200 card cursor-pointer '>
                                    <div className="flex flex-col w-1/4 py-2">
                                        <img
                                            src={`${!isEmpty(images) ? images[0] : 'https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-4.jpg'}`}
                                            alt="item"
                                            className="object-contain w-auto h-40" />
                                    </div>

                                    <div className="flex flex-col w-3/4 py-2 px-3 justify-between">
                                        <div className="flex flex-row h-full w-full items-center">
                                            <h1 className='font-bold text-lg text-gray-800'>{title}</h1>
                                        </div>
                                        <div className="flex w-full h-full flex-col space-y-4 justify-end lg:justify-between">
                                            <p className="text-sm text-gray-500">{reference}</p>
                                            <div className="flex flex-row justify-between ">
                                                <p className="uppercase text-xs text-gray-500"></p>
                                                <p className="uppercase text-xs text-gray-500">{date}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            )
                        }
                        ))
                        : ''
                }
            </div>
    )
}

export default OpenOrder;
