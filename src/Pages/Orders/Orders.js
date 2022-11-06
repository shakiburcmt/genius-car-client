import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);

    // jehetu url er opor parameter diye data load hocche na tai fetch korte hobe useEffect diye instead of loader
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://genius-car-server-five-rho.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logOut();
                }
                return res.json()
            })
            .then(data => {
                // console.log('received',data);
                setOrders(data)
            })
    }, [user?.email, logOut])

    // OrderRow theke handleDelete ekhane niye asha hoyeche karon ekhane state ache ar order gulo ekhane ache, pore ekhan theke props akare pathano hoyeche
    const handleDelete = id => {
        const proceed = window.confirm('Sure to cancel this order?');
        if (proceed) {
            fetch(`https://genius-car-server-five-rho.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Order is canceled')
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining)
                    }
                })
        }
    }

    // update status
    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-five-rho.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = 'Approved';
                    const newOrders = [...remaining, approving];
                    setOrders(newOrders);
                }
            })
    }

    return (
        <div>
            <h2 className='text-5xl'>You have {orders?.length} orders</h2>
            <p className='p-2'>Add more <Link className='text-white' to='/'>orders</Link></p>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;