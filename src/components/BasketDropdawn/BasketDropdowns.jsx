import React, { useState, useEffect } from 'react';
import './BasketDropdowns.css';
import potho from '../../assets/images/basket.png';
import { useNavigate } from 'react-router-dom';

const BasketDropdowns = () => {
    const [dropdowns, setDropdowns] = useState(false);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(savedReservations);
    }, [dropdowns]);

    const updateReservations = (updatedReservations) => {
        setReservations(updatedReservations);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    };

    const incrementCount = (index) => {
        const updatedReservations = [...reservations];
        updatedReservations[index].count += 1;
        updateReservations(updatedReservations);
    };

    const decrementCount = (index) => {
        const updatedReservations = [...reservations];
        if (updatedReservations[index].count > 1) {
            updatedReservations[index].count -= 1;
        } else {
            updatedReservations.splice(index, 1); // Remove the item if count is 1
        }
        updateReservations(updatedReservations);
    };

    const handleBuyNow = () => {
        navigate('/Checkout');
    };

    return (
        <div className='basket-dropdowns'>
            <button className='btn basketBtn' onClick={() => setDropdowns(!dropdowns)}> <img className='basketBtnImg' src={potho} alt="" /> </button>
            <div className={dropdowns ? 'd-block BasketDropdown' : 'd-none BasketDropdown'}>
                {reservations.length > 0 ? (
                    <>
                        {reservations.map((reservation, index) => (
                            <div key={index} className='reservation-item'>
                                <h4>{reservation.hotelName}</h4>
                                <p>Room Type: {reservation.roomType}</p>
                                <p>Price: {reservation.formattedPrice}</p>
                                <p>Rating: {reservation.rating}</p>
                                <div className='count-control'>
                                    <button className='btn btn-danger' onClick={() => decrementCount(index)}>-</button>
                                    <span>{reservation.count}</span>
                                    <button className='btn btn-success' onClick={() => incrementCount(index)}>+</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleBuyNow} className='btn btn-primary'>Buy Now</button>
                    </>
                ) : (
                    <p>No reservations</p>
                )}
            </div>
        </div>
    );
};

export default BasketDropdowns;
