import React, { useContext } from 'react';
import MainContext from '../../../context/context';
import './History.scss';
import axios from 'axios';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        formattedDate = `${year}-${month}-${day}`;
    }
    return formattedDate;
};

const History = () => {
    const { UserData, PriceRefund } = useContext(MainContext);
    const OrderRejected = (id) => {
        axios.put(`http://localhost:8080/api/Order/${id}`, {status: 'Rejected'}).then(res => {
            console.log(res);
        });
    };
    return (
        <main className='w-100 ffd'>
            <div className="container">
                <div className="row">
                    <h2 className='Client__dashboard__title pb-5 pt-3'>History</h2>
                    {
                        UserData ?
                        <>
                        {
                            !UserData.orders ?
                            <h1>No Orders</h1>
                            :
                            UserData.orders.map((order, index) => (
                                <div key={index} className='col-12 col-md-4 mb-3'>
                                    <div className="Client__History__item">
                                        <h3> Name: {order.name}</h3>
                                        <h4> Email: {order.email}</h4>
                                        <p> Price: {PriceRefund(order.total)}</p>
                                        <p> Date: {formatDate(order.orderDate)}</p>
                                        <p> Payment Date: {formatDate(order.paymentDate)}</p>
                                        <p> Status: {order.status === 'Rejected' ? <span className='text-danger'>{order.status}</span> : order.status}</p>
                                        <p> Payment Status: {order.paymentStatus}</p>
                                        <button onClick={() => OrderRejected(order._id)} className='btn btn-danger'>Reject</button>
                                        
                                    </div>
                                </div>
                            ))
                        }
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </main>
    );
}

export default History;
