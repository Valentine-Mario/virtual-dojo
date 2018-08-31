import React from 'react';

const Time = ({time}) => {
    let actualDate = new Date(time);
    return (
        <span className='date'>
            {
                actualDate.toDateString()
            }
        </span>
    )
}

export default Time;