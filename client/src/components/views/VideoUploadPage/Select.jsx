import React, { memo, useState } from 'react';

const Select = memo(({onChangeInput, options, defaultValue})=>{
    const [select, setSelect] = useState(defaultValue);
    return (
        <select onChange={(e)=>onChangeInput(e, setSelect)} value={select}>
            {options.map((option, i)=>{
                const {value, label} = option;
                return <option key={label} value={value}>{label}</option>
            })}
        </select>
    )
})
export default Select;