import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';
import { useLocation, useHistory } from 'react-router-dom';
import Button from './button';



let useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const OpenOrder = () => {

    let query = useQuery();
    let history = useHistory();

    const orders = useSelector(({ order: { order } }) => order);

    const [selectedOrder, setSelectedOrder] = useState(undefined);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        if (query.get("item") !== null && !isEmpty(orders)) {
            const index = query.get("item")
            let order = orders.filter(order => order[index])
            if (!isEmpty(order)) {
                setSelectedOrder(order);
                setActiveIndex(activeIndex => activeIndex = index);
            }
        }

    }, [])


    let handleClick = (order, index) => {
        setActiveIndex(index)
        setSelectedOrder(order)
        history.push(`/dashboard?active=open-order&item=${index}`)
    }

    let goBacktoDetail = () => {
        setSelectedOrder(undefined)
        setActiveIndex(null)
        history.push(`/dashboard?active=open-order`)
    }

    if (selectedOrder) {
        return (
            <>
                <div className="flex flex-row w-full justify-between px-10">
                    <button
                        onClick={goBacktoDetail}
                        type="button"
                        className="inline-flex bg-red-600 justify-center w-auto items-center border border-gray-300  
            shadow-sm px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg> &nbsp;
                        Back
                    </button>
                </div>
                <NewOrder readOnly={true} selectedOrder={selectedOrder} />
            </>
        )
    }
    else {
        return (
            <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">
                {
                    !isEmpty(orders) ?
                        orders.map(((order, index) => {
                            let { title, reference, date, images } = order;
                            return (
                                <div key={index}
                                    onClick={() => handleClick(order, index)}
                                    className='flex flex-col self-center lg:self-auto lg:flex-row relative h-auto border rounded-md card cursor-pointer '>
                                    <div className="flex flex-col w-full lg:w-1/4 py-2">
                                        <img
                                            src={`${!isEmpty(images) ? images[0] : 'https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-4.jpg'}`}
                                            alt="item"
                                            className="object-contain w-auto h-40" />
                                    </div>
                                    <div className='w-1 bg-red-500'></div>
                                    <div className="flex flex-col w-full lg:w-3/4 py-2 px-3 justify-between">
                                        <div className="flex flex-row h-full w-full items-center">
                                            <h1 className='font-bold text-lg text-gray-800'>{title}</h1>
                                        </div>
                                        <div className="flex w-full h-full flex-col space-y-4 justify-end lg:justify-between">
                                            <p className="text-sm text-gray-500 break-all whitespace-pre-wrap">{reference}</p>
                                            <div className="flex flex-col lg:flex-row justify-between">
                                                <div className="flex flex-row  lg:absolute lg:top-1 lg:right-1  space-x-2">
                                                    <Button
                                                        // onClick={() => handleNewOrder('new-order')}
                                                        label={'Approve'}
                                                        classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                        ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                                                    />
                                                    <Button
                                                        // onClick={() => handleNewOrder('new-order')}
                                                        label={'Disapprove'}
                                                        classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                                ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                                                    />
                                                </div>
                                                <p className="uppercase text-xs text-gray-500"></p>
                                                <p className="uppercase text-xs text-gray-500 text-right mt-2 sm:text-left sm:mt-0">{date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        ))
                        : <p className="w-full flex justify-center items-center text-lg font-semibold"> No Orders Yet </p>
                }
            </div>
        )
    }
}

export default OpenOrder;
