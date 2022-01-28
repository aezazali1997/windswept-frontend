import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';
import Button from './button';
import AxiosInstance from '../../APIs/axiosInstance';
import { Spinner } from '../../components/spinner/Spinner';
const ClosedOrder = ({ filters, searched, setSearched }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showQuantityModal,setShowQuantityModal]=useState(true);
  const checkFilters = (filters) => {
    if (
      filters.date !== '' ||
      filters.customerReference !== '' ||
      filters.oppStage !== '' ||
      filters.orderName !== ''
    ) {
      return true;
    }
    return false;
  };
  const getData = async () => {
    if (checkFilters(filters) && searched) {
      setSearched(false);
      setIsLoading(true);
      try {
        let resp = await AxiosInstance.searchFilter(filters, 'closed');
        if (resp.status === 200) {
          setOrders(resp.data);
        }
      } catch (error) {}
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        let id = localStorage.getItem('user_id');
        let res = await AxiosInstance.getClosedOrders(id);
        if (res.status === 200) {
          console.log(res.data);
          setOrders(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    getData();
  }, [searched]);
  // const orders = useSelector(({ order: { order } }) => order);
  //  redux
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [readOnly, setReadOnly] = useState(true);

  let handleClick = (order) => {
    setSelectedOrder(order);
  };

  let goBacktoDetail = () => {
    setSelectedOrder(undefined);
    toggleEdit();
    setShowQuantityModal(true);
    getData();
  };

  let toggleEdit = () => {
    setReadOnly(!readOnly);
  };

  return selectedOrder ? (
    <>
      <div className="flex flex-row w-full justify-between px-10">
        <button
          onClick={goBacktoDetail}
          type="button"
          className="inline-flex bg-red-600 hover:bg-transparent justify-center w-auto items-center border border-red-600 
            shadow-sm px-4 py-2 text-sm font-medium text-white hover:text-red-600  focus:outline-none">
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
        <button
          onClick={toggleEdit}
          type="button"
          className="inline-flex bg-red-600 justify-center w-auto items-center border border-red-600 
            shadow-sm px-4 py-2  text-sm font-medium text-white hover:text-red-600 hover:bg-transparent focus:outline-none">
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>{' '}
          &nbsp; Edit
        </button>
      </div>
      <NewOrder closeOrder={'closeOrder'} readOnly={readOnly} setReadOnly={setReadOnly} selectedOrder={selectedOrder} showQuantityModal={showQuantityModal} setShowQuantityModal={setShowQuantityModal} />
    </>
  ) : (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">
            {!isEmpty(orders) ? (
              orders.map((order, index) => {
                let {
                  cf_opportunity_item_name,
                  allow_edit,
                  document_date,
                  cf_opportunity_status,
                  opportunity_id,
                  id,
                  purchase_order
                } = order['object_ref'];

                return (
                  <div
                    key={index}
                    className="flex flex-col self-center lg:self-auto lg:flex-row relative h-auto border rounded-md card w-2/4 lg:w-full">
                    <div className="flex flex-col w-full lg:w-1/4 py-2">
                      <img
                        src={`data:image/;base64,${purchase_order}`}
                          
                        alt="item"
                        className="object-contain w-auto h-40"
                      />
                    </div>
                    <div className="w-1 bg-red-500"></div>
                    <div className="flex flex-col w-full lg:w-3/4 py-2 px-3 justify-between">
                      <div className="flex flex-row h-full w-full items-center">
                        <h1 className="font-bold text-lg text-gray-800">
                          {cf_opportunity_item_name}
                        </h1>
                      </div>
                      <div className="flex w-full h-full flex-col space-y-4 justify-end lg:justify-between">
                        <p className="text-sm text-gray-500 break-all whitespace-pre-wrap">
                          <b>Status</b> : {cf_opportunity_status}
                          
                        </p>
                        <p className="text-sm text-gray-500 break-all whitespace-pre-wrap">
                          
                          <b>Opportunity No</b> : {opportunity_id}
                        </p>
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
                            {document_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No Closed orders</div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default ClosedOrder;
