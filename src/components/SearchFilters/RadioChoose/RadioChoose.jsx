import React from 'react';
import styles from './RadioChoose.module.css';
import ReactTooltip from 'react-tooltip';
import { InfoSVG } from '../../../assets/SVGs';

export const RadioChoose = ({ setOrderType, orderType }) => {
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
          checked={orderType === 'open' ? true : false}
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
          checked={orderType === 'closed' ? true : false}
        />{' '}
        <label>Close</label>
      </div>
      <div>
        <InfoSVG name={'search'} />
        <ReactTooltip
          className={styles.tipPos}
          id="search"
          place="bottom"
          effect="solid"
          border={false}
          borderColor="white"
          clickable={false}>
          <ul>
            <li>One Option must be selected</li>
          </ul>
        </ReactTooltip>
      </div>
    </div>
  );
};
