import React from 'react';
import {BsArrowRight} from 'react-icons/bs'

const ServiceCard = ({ service }) => {
    const { img, price, title } = service;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-2xl font-semibold'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button className='text-3xl'><BsArrowRight/></button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;