import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import NewOrder from './newOrder';
import { useLocation, useHistory } from 'react-router-dom';
import Button from './button';
import AxiosInstance from '../../APIs/axiosInstance';
import { Spinner } from '../../components/spinner/Spinner';
import Swal from 'sweetalert2';

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const getAllOrders = () => {
  let id = localStorage.getItem('user_id');
  return AxiosInstance.getAllOrders(id);
};

const OpenOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(null);

  let tempOrders = [];
  let query = useQuery();
  let history = useHistory();
  // make a query to get all the open orders
  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await getAllOrders();
      if (res.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {}
    setIsLoading(false);
  }, [1]);
  // load the images
  // useEffect( async ()=>{

  //     for (let i=0; i<Orders.length; i++){
  //         if (!(Orders[i]['object_ref']['cf_opportunity_box_folder_id']==='' || Orders[i]['object_ref']['cf_opportunity_box_folder_id']===null )){
  //             // let image=await AxiosInstance.loadImage(Orders[i]['object_ref']['cf_opportunity_box_folder_id']) not completed
  //         }
  //     }
  //     // console.log(fodlerIds.length)

  // },[loadingOrders])
  // const orders = useSelector(({ order: { order } }) => order);

  useEffect(() => {
    if (query.get('item') !== null && !isEmpty(Orders)) {
      const index = query.get('item');
      let Order = Orders.filter((Order) => Order[index]);
      if (!isEmpty(Order)) {
        setSelectedOrder(Order);
        setActiveIndex((activeIndex) => (activeIndex = index));
      }
    }
  }, []);

  let handleDetails = (order, index) => {
    setActiveIndex(index);
    setSelectedOrder(order);
    history.push(`/dashboard?active=open-order&item=${index}`);
  };

  const handleApprove = async (id) => {
    setIsDeleting(true);
    try {
      let res = await AxiosInstance.approveOrder(id);
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
          'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
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

  let goBacktoDetail = () => {
    setSelectedOrder(undefined);
    setActiveIndex(null);
    history.push(`/dashboard?active=open-order`);
  };

  if (selectedOrder) {
    return (
      <>
        <div className="flex flex-row w-full justify-between px-10">
          <button
            onClick={goBacktoDetail}
            type="button"
            className="inline-flex bg-red-600 justify-center w-auto items-center border border-gray-300  
            shadow-sm px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
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
        <NewOrder readOnly={true} selectedOrder={selectedOrder} />
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
                  allow_edit,
                  cf_opportunity_status,
                  document_date,
                  id
                } = Order['object_ref'];
                return (
                  <div
                    key={index}
                    className="flex flex-col self-center lg:self-auto lg:flex-row relative h-auto border rounded-md card">
                    <div className="flex flex-col w-full lg:w-1/4 py-2">
                      <img
                        src={
                          'https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-4.jpg'
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
                        {localStorage.getItem('role') === 'manager' ? (
                          <p className="text-sm text-gray-500 break-all whitespace-pre-wrap">
                            {localStorage.getItem('role') === 'manager'
                              ? cf_opportunity_status
                              : ''}
                          </p>
                        ) : (
                          ''
                        )}
                        <div className="flex flex-col lg:flex-row justify-between">
                          <div className="flex flex-row  lg:absolute lg:top-1 lg:right-1  space-x-2">
                            {localStorage.getItem('role') === 'manager' &&
                            cf_opportunity_status === 'Pending' ? (
                              <>
                                <Button
                                  label={'Approve'}
                                  onClick={() => {
                                    handleApprove(id);
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
                              // onClick={() => {
                              //   handleDetails(Order, index);
                              // }}
                              label={'Details'}
                              classNames={`px-2 sm:px-5 py-2 uppercase border w-full
                                                ${'text-white text-sm bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                            />{' '}
                            {localStorage.getItem('role') === 'employee' &&
                            cf_opportunity_status === 'Pending' ? (
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
