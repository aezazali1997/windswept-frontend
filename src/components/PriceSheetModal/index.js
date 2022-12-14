import React from 'react';

const PriceSheetModal = ({ title, body, handleModal, ConfirmButton, _onDelete }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-md">
          <div className="bg-gray-50 px-4 pt-5  sm:p-6 sm:px-1 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 mx-2 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2">{body}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => handleModal()}
              type="button"
              className="mt-3 w-full inline-flex justify-center hover:underline px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
            {_onDelete ? (
              <button
                type="button"
                onClick={_onDelete}
                className="w-full inline-flex justify-center  border border-red-600 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:text-red-600 hover:bg-transparent focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                {ConfirmButton}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full inline-flex justify-center  border border-red-600 shadow-sm px-4 py-2 bg-red-600 hover:bg-transparent text-base font-medium text-white hover:text-red-600 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                {ConfirmButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSheetModal;
