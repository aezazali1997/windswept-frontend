import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import _ from 'lodash';
import { Helmet } from 'react-helmet';
import Button from './button';
import NewOrder from './newOrder';
import OpenOrder from './openOrder';
import ClosedOrder from './closedOrder';
import Draft from './draft';
import ReactTooltip from 'react-tooltip';
import { CustomModal, SearchFilters } from '../../components';
import { InfoSVG } from '../../assets/SVGs';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import { isEmpty } from 'lodash';
// import axiosInstance from '../../APIs/axiosInstance';

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Dashboard = (props) => {
  let query = useQuery();
  const [orderType, setOrderType] = useState('open');
  // const [isDraftpresent, setIsDraftPresent] = useState(false);

  const filter = {
    date: '',
    oppStage: '',
    orderName: '',
    productName: '',
    customerReference: '',
    otherOpportunity: ''
  };

  // const fetchDrafts = async () => {
  //   try {
  //     let res = await axiosInstance.checkDraftExist();
  //     if (res.data.count > 0) {
  //       setIsDraftPresent(true);
  //     }
  //   } catch (error) {}
  // };

  // const drafts = useSelector(({ order: { draft } }) => draft);

  // const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);
  const [showNewOrder, setShowNewOrder] = useState(true);
  const [showOpenOrder, setShowOpenOrder] = useState(false);
  const [showCloseOrder, setShowCloseOrder] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [activeIndex, setActiveIndex] = useState('new-order');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(filter);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [showCustomOrderModel, setShowCustomOrderModel] = useState(true);

  useEffect(() => {
    //   // fetchDrafts();
    if (query.get('active') === null) {
      props.history.push(`/dashboard?active=${activeIndex}`);
      // setActiveIndex(activeIndex);
      //   } else {
      // const active = query.get('active');
      // setActiveIndex(active);
    }
  }, [1]);

  let _ToggleModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  let _onChangeFilter = (e) => {
    const { value, name } = e.target;
    let copyOriginal = { ...filters };
    let updatedData = { ...copyOriginal, [name]: value };
    setFilters(updatedData);
  };

  let _ResetFilter = () => {
    setSearch('');
    setFilters(filter);
  };
  const searchForData = async () => {
    setSearched(true);
    if (orderType === 'open') {
      props.history.push(`/dashboard?active=open-order`);
      setActiveIndex('open-order');
    } else {
      props.history.push(`/dashboard?active=closed-order`);
      setActiveIndex('closed-order');
    }
  };
  let _Submit = () => {
    const { date, oppStage, orderName, productName, customerReference, otherOpportunity } = filters;
    let search = Object.values(filters)
      .filter((k) => k)
      .join(', ');
    setSearch(search);

    _ToggleModal();
  };

  let handleNewOrder = (id) => {
    setActiveIndex(id);
    props.history.push(`/dashboard?active=${id}`);
    setShowCloseOrder(false);
    setShowDraft(false);
    setShowOpenOrder(false);
    setShowNewOrder(true);
  };
  let handleOpenOrder = (id) => {
    setActiveIndex(id);
    props.history.push(`/dashboard?active=${id}`);
    setShowCloseOrder(false);
    setShowDraft(false);
    setSelectedOrder(null);
    setShowNewOrder(false);
    setShowOpenOrder(true);
  };
  let handleCloseOrder = (id) => {
    setActiveIndex(id);
    props.history.push(`/dashboard?active=${id}`);
    setShowDraft(false);
    setSelectedOrder(null);
    setShowNewOrder(false);
    setShowOpenOrder(false);
    setShowCloseOrder(true);
  };
  let handleDraft = (id) => {
    setActiveIndex(id);
    props.history.push(`/dashboard?active=${id}`);
    setShowCloseOrder(false);
    setShowNewOrder(false);
    setShowOpenOrder(false);
    setSelectedOrder(null);
    setShowDraft(true);
  };

  const ActiveView = () => {
    switch (activeIndex) {
      case 'new-order':
        return (
          <NewOrder
            readOnly={false}
            showCustomOrderModel={showCustomOrderModel}
            setShowCustomOrderModel={setShowCustomOrderModel}
          />
        );
      case 'open-order':
        return (
          <OpenOrder
            filters={filters}
            searched={searched}
            setSearched={setSearched}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        );
      case 'closed-order':
        return <ClosedOrder filters={filters} searched={searched} setSearched={setSearched} />;
      default:
        return <Draft />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Helmet>
        <title>Dashboard | Windswept</title>
      </Helmet>

      <div className="flex flex-col lg:h-96 justify-center items-center p-5">
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
          What would you like to do?
        </h1>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0  lg:space-x-4">
          <Button
            onClick={() => handleNewOrder('new-order')}
            label={'new order'}
            classNames={`w-56 h-20 uppercase border
                        ${
                          activeIndex === 'new-order'
                            ? 'bg-white text-red-600 border-red-600'
                            : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'
                        }`}
          />

          <Button
            id={2}
            onClick={() => handleOpenOrder('open-order')}
            label={'open orders'}
            classNames={`w-56 h-20 uppercase border
                        ${
                          activeIndex === 'open-order'
                            ? 'bg-white text-red-600 border-red-600'
                            : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'
                        }`}
          />

          <Button
            id={3}
            onClick={() => handleCloseOrder('closed-order')}
            label={'closed orders'}
            classNames={`w-56 h-20 uppercase border
                        ${
                          activeIndex === 'closed-order'
                            ? 'bg-white text-red-600 border-red-600'
                            : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'
                        }`}
          />

          <Button
            id={4}
            onClick={() => handleDraft('saved-as-draft')}
            label={'saved as draft'}
            classNames={`w-56 h-20 uppercase border
                        ${
                          activeIndex === 'saved-as-draft'
                            ? 'bg-white text-red-600 border-red-600'
                            : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'
                        }`}
          />
        </div>
        <div className="flex flex-col md:flex-row mt-8  md:w-3/5 lg:w-2/5 items-center">
          <div className="w-full flex ">
            <span className="self-center">
              <InfoSVG name={'search'} />
              <ReactTooltip
                id="search"
                place="top"
                effect="solid"
                border={false}
                borderColor="white"
                clickable={false}>
                <ul>
                  <li>Date</li>
                  <li>Opp Stage</li>
                  <li>Order Name</li>
                  <li>Product Name</li>
                  <li>Customer Reference</li>
                  <li>Other OPPORTUNITY</li>
                </ul>
              </ReactTooltip>
            </span>{' '}
            
            <div className="w-full md:rounded flex bg-white">
              <span className="w-auto flex justify-end items-center text-gray-500 p-2">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>

              <input
                type="text"
                readOnly={true}
                value={search}
                placeholder="Search by"
                onClick={_ToggleModal}
                className="custom-place-holder w-full px-4 text-md h-9 border focus:outline-none border-gray-300 bg-gray-50 md:rounded"
              />
            </div>
            </div>
            <div className='flex flex-row mt-2 md:mt-0'>
            <div>
            <button
              onClick={searchForData}
              className="border bg-red-600 ml-2 h-9 hover:bg-transparent  text-white hover:text-red-600 hover:border-red-600 mr-4 md:mr-0  p-2 pl-6 pr-6">
              <p className="text-sm font-medium">Search</p>
            </button>
          </div>
          <div className="text-larger md:text-sm md:ml-5 mt-2">
            <p
              onClick={_ResetFilter}
              className="font-medium text-sm text-gray-600 hover:text-red-600 hover:underline cursor-pointer">
              Reset
            </p>
          </div>
          </div>
        </div>
      </div>
      {ActiveView()}
      {showSearchModal && (
        <CustomModal
          _Toggle={_ToggleModal}
          onSubmit={_Submit}
          ConfirmButton={'Submit'}
          type={'button'}
          title={'Filter Orders'}
          body={
            <div className="flex flex-col  h-full w-auto sm:w-80">
              <SearchFilters
                setOrderType={setOrderType}
                orderType={orderType}
                filter={filters}
                handleChange={_onChangeFilter}
              />
            </div>
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
