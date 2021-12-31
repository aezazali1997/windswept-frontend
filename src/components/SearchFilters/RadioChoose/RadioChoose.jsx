import React from 'react';
import styles from './RadioChoose.module.css';
export const RadioChoose = ({ setOrderType }) => {
  return (
    <div className={styles.radioChoose}>
      <div>
        <input
          type="radio"
          onChange={(e) => {
            setOrderType(e.target.value);
          }}
          name="order_type"
          value="open"
        />{' '}
        <label>Open</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            setOrderType(e.target.value);
          }}
          type="radio"
          name="order_type"
          value="closed"
        />{' '}
        <label>Close</label>
      </div>
    </div>
  );
};
