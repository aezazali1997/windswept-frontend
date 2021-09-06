import AutosizeInput from 'react-input-autosize';

import React from 'react'

const AutoSizeInput = ({ value, name, handleChange, Style, rowIndex, readOnly, type }) => {
    return (
        <AutosizeInput
            type={type}
            inputClassName={Style}
            readOnly={readOnly}
            name={name}
            minWidth='100'
            value={value}
            onChange={(e) => handleChange(e, rowIndex)}
        />
    )
}

export default AutoSizeInput;
