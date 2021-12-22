import React from 'react'

const Modal = ({ handleModal, title, schema, setColor }) => {

    let _SelectColor = (colorNo, colorName) => {
        if (title === "Thread Chart") {
            setColor(`${colorNo}${colorName}`);
        }
        else {
            setColor(colorName);
        }
    }
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div onClick={() => handleModal()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-3xl lg:max-w-4xl sm:w-full">
                    <div className="bg-gray-50 px-4 pt-5  sm:p-6 sm:px-1 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-3 h-96 overflow-y-auto">
                                        {
                                            schema && schema.map(({ colorNo, colorName, colorCode }) => (
                                                <>
                                                    <div
                                                        onClick={() => (_SelectColor(colorNo, colorName), handleModal())}
                                                        className="w-24 h-28 bg-white flex flex-col cursor-pointer hover:shadow-md"
                                                    >
                                                        <div className="flex text-sm w-full justify-evenly">{colorNo}</div>
                                                        <div className="flex text-sm w-full justify-evenly">{colorName}</div>
                                                        <div className="flex w-full h-full p-2" >
                                                            {title === "Thread Chart" && (<img src={colorCode} alt="color" className="object-fill" />)}
                                                            <div className="flex" style={{ backgroundColor: colorCode, height: '100%', width: '100%' }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {/* <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Deactivate
                        </button> */}
                        <button onClick={() => handleModal()} type="button" className="mt-3 w-full inline-flex justify-center hover:underline px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal;
