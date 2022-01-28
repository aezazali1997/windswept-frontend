import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';
import AxiosInstance from '../../APIs/axiosInstance';
import { Spinner } from '../../components/spinner/Spinner';
import Button from './button';
const Draft = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [readOnly, setReadOnly] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  useEffect(() => {
    getDraftOrder();
    return () => setOrders([]);
  }, [1]);

  const getDraftOrder = async () => {
    
    setLoadingDraft(true);
    try {
      let res = await AxiosInstance.getAllDraft();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingDraft(false);
  };

  let handleClick = (order) => {
    setSelectedOrder(order);
  };
  let goBacktoDetail = () => {
    setSelectedOrder(undefined);
    
    getDraftOrder();
  };

  // let toggleEdit = () => {
  //   setReadOnly(!readOnly);
  // };

  return selectedOrder ? (
    <>
      <div className="flex flex-row w-full justify-between px-10">
        <button
          onClick={goBacktoDetail}
          type="button"
          className="inline-flex bg-red-600 hover:bg-transparent justify-center w-auto items-center
            border border-red-600  shadow-sm px-4 py-2 text-sm font-medium text-white hover:text-red-600 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>{' '}
          &nbsp; Back
        </button>
      </div>
      <NewOrder readOnly={readOnly} selectedOrder={selectedOrder} />
    </>
  ) : loadingDraft ? (
    <Spinner />
  ) : (
    <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">
      {!isEmpty(orders) ? (
        orders.map((order, index) => {
          let { name, customer_ref, in_hands_date, purchase_order } = order;


          return (
            <div
              key={index}
              className="flex flex-col self-center lg:self-auto lg:flex-row relative h-auto border rounded-md card w-2/4 lg:w-full">
              <div className="flex flex-col w-full lg:w-1/4 py-2">
                <img
                  src={purchase_order?.url}
                  // "https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-4.jpg"
                  alt="item"
                  className="object-contain w-auto h-40"
                />
              </div>
              <div className="w-1 bg-red-500"></div>
              <div className="flex flex-col w-full lg:w-3/4 py-2 px-3 justify-between">
                <div className="flex flex-row h-full w-full items-center">
                  <h1 className="font-bold text-lg text-gray-800">{name}</h1>
                </div>
                <div className="flex w-full h-full flex-col space-y-4 justify-end lg:justify-between">
                  <p className="text-sm text-gray-500 break-all whitespace-pre-wrap">{customer_ref}</p>

                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex flex-row  lg:absolute lg:top-1 lg:right-1  space-x-2">
                      <Button
                        label={'Details'}
                        onClick={() => handleClick(order)}
                        classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                        ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                      />
                    </div>
                    <p className="uppercase text-xs text-gray-500"></p>
                    <p className="uppercase text-xs text-gray-500 text-right mt-2 sm:text-left sm:mt-0">
                      {in_hands_date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="w-full flex justify-center items-center text-lg font-semibold">
          {' '}
          No Orders Yet{' '}
        </p>
      )}
    </div>
  );
};;
export default Draft;
