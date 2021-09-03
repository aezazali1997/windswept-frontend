import AutosizeInput from 'react-input-autosize';

import React from 'react'

const AutoSizeInput = ({ value, name, handleChange, Style, rowIndex, readOnly, type }) => {
    return (
        <AutosizeInput
            type={type}
            className={Style}
            readOnly={readOnly}
            name={name}
            minWidth='100'
            defaultValue={value}
            onChange={(e) => handleChange(e, rowIndex)}
        />
    )
}

export default AutoSizeInput;
