import React, { useContext } from 'react';
import './RoomCardV1.scss';
import { Link } from 'react-router-dom';
import MainContext from '../../../context/context';

const RoomCardV1 = ({ room ,hotel}) => {
    const roomDetailsPath = `/details/hotel/${hotel._id}/room/${room._id}`;
    const {PriceRefund}=useContext(MainContext)
    return (
        <div className='RoomCardV1'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 p-0">
                        <img className='w-100 h-100' src={`http://localhost:8080/uploads/rooms/${room.mainImg}`} alt={room.title} />
                    </div>
                    <div className="col-12 col-md-8 p-1">
                        <div className="row">
                            <div className="col-12 col-md-7 p-3 border-end">
                                <Link to={roomDetailsPath} className='mb-0 fs-5 fw-bold text-decoration-none RoomCardV1__title'>{room.title}</Link>
                                <div className="row">
                                    {renderRoomFeature("fa-up-right-and-down-left-from-center", `${room.size} m²`, "size")}
                                    {renderRoomFeature("fa-bed", `x${room.beds}`, "beds")}
                                    {renderRoomFeature("fa-user", `x${room.adults}`, "adults")}
                                    {renderRoomFeature("fa-child", `x${room.children}`, "children")}
                                </div>
                            </div>
                            <div className="col-12 col-md-5 p-5 d-flex justify-content-center align-content-center flex-column row-gap-2">
                                <p><span className='fw-bolder '>{PriceRefund(parseFloat(room.price))}</span>/night</p>
                                <Link to={roomDetailsPath} className='btn btn-primary fs-6'>Room Detail</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const renderRoomFeature = (icon, description, className) => (
    <div className="col-3">
        <div className={`RoomCardV1__item ${className} flex-column`}>
            <div className="RoomCardV1__item__logo">
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <span>{description}</span>
        </div>
    </div>
);

export default RoomCardV1;
