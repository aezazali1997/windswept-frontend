import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';
import { useLocation, useHistory } from 'react-router-dom';
import Button from './button';
import AxiosInstance from '../../APIs/axiosInstance';
import { Spinner } from '../../components/spinner/Spinner';
import Swal from 'sweetalert2';
import moment from 'moment';
import imgPlaceHolder from '../../assets/place.png';
// import {decode as base64_decode, encode as base64_encode} from 'base-64';

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const getAllOrders = () => {
  let id = localStorage.getItem('user_id');
  return AxiosInstance.getAllOrders(id);
};

const OpenOrder = ({ filters, searched, setSearched, setSelectedOrder, selectedOrder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [Orders, setOrders] = useState([]);
  // const [images, setImages] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  let tempOrders = [];
  let query = useQuery();
  let history = useHistory();
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
      filters.date = moment(filters.date).format('D MMM YYYY');
      setIsLoading(true);
      try {
        let resp = await AxiosInstance.searchFilter(filters, 'open');
        if (resp.status === 200) {
          setOrders(resp.data);
          setSearched(false);
        }
      } catch (error) {}
      setIsLoading(false);
    } else if (!checkFilters(filters) && !searched) {
      setIsLoading(true);
      try {
        const res = await getAllOrders();
        if (res.status === 200) {
          setOrders(res.data);
        }
      } catch (error) {}
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setSearched(false);
  }, [1]);
  // make a query to get all the open orders
  useEffect(() => {
    getData();
  }, [searched]);
  useEffect(() => {
    if (query.get('item') !== null && !isEmpty(Orders)) {
      const index = query.get('item');
      let Order = Orders.filter((Order) => Order[index]);
      if (!isEmpty(Order)) {
        setSelectedOrder(Order);
        // setActiveIndex((activeIndex) => (activeIndex = index));
      }
    }
  }, []);

  let handleDetails = (order, index) => {
    // setActiveIndex(index);
    setSelectedOrder(order);
    history.push(`/dashboard?active=open-order&item=${index}`);
  };
  let toggleEdit = () => {
    setReadOnly(!readOnly);
  };

  const handleApprove = async (index, ref) => {
    setIsDeleting(true);
    try {
      await AxiosInstance.approveOrder(ref);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (index, id, label) => {
    Swal.fire({
      title: `Are you sure you want to ${label} this Order?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center  border border-red-600 px-4 py-2 btn  text-base font-medium text-white hover:text-red-600  focus:outline-none sm:ml-3 sm:w-auto sm:text-sm hover:bg-transparent',
        cancelButton:
          'mt-3 w-96 text-gray-500 hover:text-red-600 inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);

        try {
          let res = await AxiosInstance.deleteOrder(id);
          if (res.status === 200) {
            tempOrders = [...Orders];
            tempOrders.splice(index, 1);
            setOrders(tempOrders);
            setIsDeleting(false);
          }
        } catch (error) {}
      } else {
        console.log('not deleted');
      }
    });
  };

  let goBacktoDetail = async () => {
    setSelectedOrder(undefined);
    // setActiveIndex(null);
    history.push(`/dashboard?active=open-order`);
    toggleEdit();
    getData();
    setSearched(false);
  };

  if (selectedOrder) {
    return (
      <>
        <div className="flex flex-row w-full justify-between px-10">
          <button
            onClick={goBacktoDetail}
            type="button"
            className="inline-flex bg-red-600 hover:bg-transparent justify-center w-auto items-center border border-gray-300 hover:border-red-600  
            shadow-sm px-4 py-2  text-sm font-medium text-white hover:text-red-600 focus:outline-none">
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

          {selectedOrder['object_ref'].cf_opportunity_status !== 'Artwork Approved' ? (
            <button
              onClick={toggleEdit}
              type="button"
              className="inline-flex bg-red-600 hover:bg-transparent justify-center w-auto items-center border border-gray-300 hover:border-red-600 
            shadow-sm px-4 py-2 text-sm font-medium text-white hover:text-red-600 focus:outline-none">
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
          ) : (
            ''
          )}
        </div>

        <NewOrder readOnly={readOnly} selectedOrder={selectedOrder} />
      </>
    );
  } else {
    return (
      <>
        {isDeleting ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          ''
        )}
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col w-full h-full mb-4 space-y-4 px-3">
            {!isEmpty(Orders) ? (
              Orders.map((Order, index) => {
                let {
                  cf_opportunity_item_name,

                  cf_opportunity_status,
                  document_date,
                  customer_ref,
                  id,
                  purchase_order
                } = Order['object_ref'];
                return (
                  <div
                    key={index}
                    className="flex flex-col self-center lg:self-auto lg:flex-row relative h-auto border rounded-md card w-2/4 lg:w-full">
                    <div className="flex flex-col w-full lg:w-1/4 py-2">
                      <img
                        src={
                          purchase_order
                            ? ` data:image/png;base64,${purchase_order}`
                            : 'https://res.cloudinary.com/portfoliov1mushaaf/image/upload/v1643627467/windswept/place-holder_q2ksof.png'
                        }
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
                          {customer_ref}
                        </p>

                        <div className="flex flex-col lg:flex-row justify-between">
                          <div className="flex flex-row  lg:absolute lg:top-1 lg:right-1  space-x-2">
                            {localStorage.getItem('role') === 'manager' &&
                            (cf_opportunity_status === 'Sew-out scan at Factory' ||
                              cf_opportunity_status === 'Waiting on sew-out approval' ||
                              cf_opportunity_status === 'Revesions on sew-out' ||
                              cf_opportunity_status === 'In Production (waiting on tracking)' ||
                              cf_opportunity_status === 'Tracking Recieved') ? (
                              <>
                                <Button
                                  label={'Approve'}
                                  onClick={() => {
                                    handleApprove(index, id);
                                  }}
                                  classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                        ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                                />
                                <Button
                                  label={'Disapprove'}
                                  onClick={() => {
                                    handleDelete(index, id, 'Disapprove');
                                  }}
                                  classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                                ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                                />
                              </>
                            ) : (
                              ''
                            )}
                            <Button
                              onClick={() => {
                                handleDetails(Order, index);
                              }}
                              label={'Details'}
                              classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                                ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                            />{' '}
                            {localStorage.getItem('role') === 'employee' &&
                            cf_opportunity_status !== 'Artwork Approved' ? (
                              <>
                                <Button
                                  onClick={() => {
                                    handleDelete(index, id, 'Delete');
                                  }}
                                  label={'Delete'}
                                  classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                                ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                                />
                              </>
                            ) : (
                              ''
                            )}
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
              <p className="w-full flex justify-center items-center text-lg font-semibold">
                {' '}
                No Orders Yet{' '}
              </p>
            )}
          </div>
        )}
      </>
    );
  }
};

export default OpenOrder;
