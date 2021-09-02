import AutosizeInput from 'react-input-autosize';

import React from 'react'

const AutoSizeInput = ({ value, name, handleChange, Style, rowIndex }) => {
    return (
        <AutosizeInput
            className={Style}
            name={name}
            minWidth='100'
            defaultValue={value}
            onChange={(e) => handleChange(e, rowIndex)}
        />
    )
}

export default AutoSizeInput;
