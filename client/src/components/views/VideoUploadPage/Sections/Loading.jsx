import React, { memo } from 'react';
const Loading = memo(({isVisible})=>{
    return (
        <>
            {isVisible && <div className='loading'></div>} 
        </>
    )
})
export default Loading;