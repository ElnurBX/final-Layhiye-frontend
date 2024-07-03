import React, { useContext } from 'react';
import './HotelBookInquiry.scss';
import Calendar from '../../Calendar/Calendar';
import Guests from '../../Guests/Guests';
import MainContext from '../../../context/context';
import   { ToastContainer, toast } from 'react-toastify';
const RoomBookInquiry = ({ hotel, room }) => {
    const sum = (array) => { 
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum / array.length;
    }

    const { PriceRefund } = useContext(MainContext);


    const averageRating = (reviews) => {
        if (reviews.length === 0) return { mainCount: 0, cleanlinessCount: 0, communicationCount: 0, checkInCount: 0, accuracyCount: 0, locationCount: 0, valueCount: 0 };
        
        const cleanliness = [];
        const communication = [];
        const checkIn = [];
        const accuracy = [];
        const location = [];
        const value = [];

        for (let i = 0; i < reviews.length; i++) {
            cleanliness.push(reviews[i].cleanliness);
            communication.push(reviews[i].communication);   
            checkIn.push(reviews[i].checkIn);
            accuracy.push(reviews[i].accuracy);
            location.push(reviews[i].location);
            value.push(reviews[i].value);
        }

        const cleanlinessCount = sum(cleanliness);
        const communicationCount = sum(communication);
        const checkInCount = sum(checkIn);
        const accuracyCount = sum(accuracy);
        const locationCount = sum(location);
        const valueCount = sum(value);
        let mainCount = (cleanlinessCount + communicationCount + checkInCount + accuracyCount + locationCount + valueCount) / 6;

        return { mainCount, cleanlinessCount, communicationCount, checkInCount, accuracyCount, locationCount, valueCount };
    }

    const handleReserve = () => {
        const reservation = {
            hotelName: hotel.title,
            roomType: room.title,
            roomId: room._id,
            price: room.price,
            formattedPrice: PriceRefund(room.price), 
            rating: averageRating(hotel.reviews).mainCount.toFixed(1),
            count: 1 
        };
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        toast.success('Reservation add cart successful');
    }

    return (
        <div className='HotelBookInquiry__container'>
            <div className="HotelBookInquiry__content">
                <p>From <span className='text-black'>{PriceRefund(room.price)}</span>/night <span  className='d-inline' style={{color:'#ffb21d'}}> <i className="fa-solid fa-star"></i></span> <span className='text-black'>{averageRating(hotel.reviews).mainCount.toFixed(1)}</span> <span >({hotel.reviews.length} reviews)</span></p>
                <div className="border rounded-4 mt-3">
                    <div className="border-bottom ">
                        <Calendar/>
                    </div>
                    <div className="border-top p-1 ">
                        <Guests/>
                    </div>
                    <div className="border-top d-flex justify-content-center align-items-center pb-3">
                        <button onClick={handleReserve} className='btn btn-primary w-75 m-auto mt-5'>RESERVE</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RoomBookInquiry;
