import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import Button from './button';
import NewOrder from './newOrder';
import OpenOrder from './openOrder';
import ClosedOrder from './closedOrder';
import Draft from './draft';
import ReactTooltip from "react-tooltip";

let useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Dashboard = (props) => {

    let query = useQuery();

    const [color, setColor] = useState('');
    const [colors, setColors] = useState([]);
    const [showNewOrder, setShowNewOrder] = useState(true);
    const [showOpenOrder, setShowOpenOrder] = useState(false);
    const [showCloseOrder, setShowCloseOrder] = useState(false);
    const [showDraft, setShowDraft] = useState(false);
    const [activeIndex, setActiveIndex] = useState('new-order');


    useEffect(() => {
        if (query.get("active") === null) {
            props.history.push(`/dashboard?active=${activeIndex}`);
            setActiveIndex(activeIndex);
        }
        else {
            const active = query.get("active")
            setActiveIndex(active);
        }
    }, [colors, activeIndex])




    let handleNewOrder = (id) => {
        props.history.push(`/dashboard?active=${id}`)
        setActiveIndex(id);
        setShowCloseOrder(false);
        setShowDraft(false);
        setShowOpenOrder(false);
        setShowNewOrder(true);
    }
    let handleOpenOrder = (id) => {
        setActiveIndex(id);
        props.history.push(`/dashboard?active=${id}`)
        setShowCloseOrder(false);
        setShowDraft(false);
        setShowNewOrder(false);
        setShowOpenOrder(true);
    }
    let handleCloseOrder = (id) => {
        setActiveIndex(id);
        props.history.push(`/dashboard?active=${id}`)
        setShowDraft(false);
        setShowNewOrder(false);
        setShowOpenOrder(false);
        setShowCloseOrder(true);
    }
    let handleDraft = (id) => {
        setActiveIndex(id);
        props.history.push(`/dashboard?active=${id}`)
        setShowCloseOrder(false);
        setShowNewOrder(false);
        setShowOpenOrder(false);
        setShowDraft(true);
    }

    const ActiveView = () => {
        switch (activeIndex) {
            case 'new-order':
                return <NewOrder
                    readOnly={false}
                />;
            case 'open-order':
                return <OpenOrder />;
            case 'closed-order':
                return <ClosedOrder />;
            default:
                return <Draft />;
        }
    }


    return (
        <div className="flex flex-col w-full">
            <Helmet>
                <title>Dashboard | Windswept</title>
            </Helmet>
            <div className="flex flex-col h-screen lg:h-96 justify-center items-center p-5">
                <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl font-light mb-10">
                    What would you like to do?
                </h1>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0  lg:space-x-4">
                    <Button
                        onClick={() => handleNewOrder('new-order')}
                        label={'new order'}
                        classNames={`w-56 h-20 uppercase border
                        ${activeIndex === 'new-order' ? 'bg-white text-red-600 border-red-600' : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                    />

                    <Button
                        id={2}
                        onClick={() => handleOpenOrder('open-order')}
                        label={'open orders'}
                        classNames={`w-56 h-20 uppercase border
                        ${activeIndex === 'open-order' ? 'bg-white text-red-600 border-red-600' : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                    />

                    <Button
                        id={3}
                        onClick={() => handleCloseOrder('closed-order')}
                        label={'closed orders'}
                        classNames={`w-56 h-20 uppercase border
                        ${activeIndex === 'closed-order' ? 'bg-white text-red-600 border-red-600' : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                    />
                    <Button
                        id={4}
                        onClick={() => handleDraft('saved-as-draft')}
                        label={'saved as draft'}
                        classNames={`w-56 h-20 uppercase border
                        ${activeIndex === 'saved-as-draft' ? 'bg-white text-red-600 border-red-600' : 'text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'}`}
                    />
                </div>
                <div className="flex flex-col md:flex-row mt-8  md:w-3/5 lg:w-2/5 items-center">

                    <div className="w-full flex ">
                        <span className="self-center">
                            <svg data-tip data-for="search" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <ReactTooltip id="search" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
                                <ul>
                                    <li>Date</li>
                                    <li>Opp Stage</li>
                                    <li>Order Name</li>
                                    <li>Product Name</li>
                                    <li>Other OPPORTUNITY</li>
                                </ul>
                            </ReactTooltip>
                        </span> &nbsp;
                        <div class="w-full flex border-gray-400 border">
                            <span class="w-auto flex justify-end items-center text-gray-500 p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>

                            <input class="w-full p-2 focus:outline-none text-sm" type="text" placeholder="Search by:" />
                        </div>
                        <button class="bg-red-600 ml-2 hover:bg-red-700  text-white p-2 pl-6 pr-6">
                            <p class="text-sm font-medium">Search</p>
                        </button>
                    </div>
                    <div className="text-larger md:text-sm md:ml-5 mt-3 md:mt-0">
                        <Link to="/" className="font-medium text-sm text-gray-600 hover:text-red-500 hover:underline">
                            Reset
                        </Link>
                    </div>
                </div>
            </div>
            {
                ActiveView()
            }
        </div>
    )
}

export default Dashboard;
