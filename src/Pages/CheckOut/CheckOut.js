import React from 'react';
import { useLoaderData } from 'react-router-dom';


const CheckOut = () => {
    const { title } = useLoaderData();
    return (
        <div>
            {title}
        </div>
    );
};

export default CheckOut;