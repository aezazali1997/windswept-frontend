import React from 'react'

const OpenOrder = () => {
    return (
        <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">

            <div className='flex flex-row h-44 divide-gray-50 border divide-x-4 rounded-md divide-red-600 
            border-gray-200 card cursor-pointer '>
                <div className="flex flex-col w-1/4 py-2">
                    <img src='https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-4.jpg' alt="item" className="object-contain w-auto h-40" />
                </div>

                <div className="flex flex-col w-3/4 py-2 px-3 justify-between">
                    <div className="flex flex-row h-full w-full items-center">
                        <h1 className='font-bold text-lg text-gray-800'>Intel Core i5</h1>
                    </div>
                    <div className="flex w-full h-full flex-col space-y-4 justify-end lg:justify-between">
                        <p className="text-sm text-gray-500">Huawei (Honor) Tablet M5 LTE</p>
                        <div className="flex flex-row justify-between ">
                            <p className="uppercase text-xs text-gray-500">Mall Road Lahore</p>
                            <p className="uppercase text-xs text-gray-500">3 days ago</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OpenOrder;
