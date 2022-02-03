import React from 'react';
import { InputField } from '..';
import { RadioChoose } from './RadioChoose/RadioChoose';

const Index = ({ filter, handleChange, setOrderType, orderType }) => {
  const { date, oppStage, orderName, productName, customerReference, otherOpportunity } = filter;

  return (
    <div className="flex flex-col">
      <RadioChoose setOrderType={setOrderType} orderType={orderType} />
      <InputField
        name={'date'}
        type={'date'}
        value={date}
        onChange={handleChange}
        svg={''}
        inputClass={`border bg-gray-100 focus:bg-gray-50 focus:bg-white border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Date'}
      />
      <InputField
        name={'oppStage'}
        type={'text'}
        value={oppStage}
        onChange={handleChange}
        svg={''}
        inputClass={`border bg-gray-100 focus:bg-gray-50 border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Opp Stage'}
      />
      <InputField
        name={'productName'}
        type={'text'}
        value={productName}
        onChange={handleChange}
        svg={''}
        inputClass={` border  bg-gray-100 focus:bg-gray-50 border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Product Name'}
      />
      <InputField
        name={'customerReference'}
        type={'text'}
        value={customerReference}
        onChange={handleChange}
        svg={''}
        inputClass={` border bg-gray-100 focus:bg-gray-50 border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Customer Reference'}
      />
      <InputField
        name={'orderName'}
        type={'text'}
        value={orderName}
        onChange={handleChange}
        svg={''}
        inputClass={` border bg-gray-100 focus:bg-gray-50 border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Order Name'}
      />
      <InputField
        name={'otherOpportunity'}
        type={'text'}
        value={otherOpportunity}
        onChange={handleChange}
        svg={''}
        inputClass={` border bg-gray-100 focus:bg-gray-50 border-gray-300 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-14`}
        label={'Other Opportunity'}
      />
    </div>
  );
};

export default Index;
