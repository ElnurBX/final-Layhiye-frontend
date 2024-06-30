import React, { useEffect, useState } from 'react'
import './RoomDetailsPage.scss'
import { useParams } from 'react-router'
import PageNotation from '../../../../components/PageNotation/PageNotation'
import axios from 'axios'
import HotelGallery from '../../../../components/DetailsPages/HotelGallery/HotelGallery'
import Calendar from '../../../../components/Calendar/Calendar'
import RoomExploreOtherOptions from '../../../../components/sections/ExploreOtherOptions/RoomExploreOtherOptions'
import RoomBookInquiry from '../../../../components/DetailsPages/HotelBookInquiry/RoomBookInquiry'

const RoomDetailsPage = () => {
    const {hotelId, roomId} = useParams()
    const [hotel, setHotel] = useState({})
    const [room, setRoom] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); 
        const fetchRoom = axios.get(`http://localhost:8080/api/Rooms/${roomId}`);
        const fetchHotel = axios.get(`http://localhost:8080/api/hotels/${hotelId}`);

        Promise.all([fetchRoom, fetchHotel]).then(responses => {
            setRoom(responses[0].data);
            setHotel(responses[1].data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Veri yükleme hatası:", error);
            setIsLoading(false); 
        });
    }, [hotelId, roomId])

    if (isLoading) {
        return <div className="loading">Loading...</div>; 
    }

    return (
        <>
            <PageNotation Title={hotel.title} Type="hotel" room={room} />
            <div className="RoomDetailsPage">
                <div className="container">
                    <HotelGallery imgs={room.imgs} Type={"rooms"} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <div className="border-bottom pb-3 mb-5">
                                <div className="row w-50">
                                    {renderRoomFeature("fa-up-right-and-down-left-from-center", `${room.size} m²`, "size")}
                                    {renderRoomFeature("fa-bed", `x${room.beds}`, "beds")}
                                    {renderRoomFeature("fa-user", `x${room.adults}`, "adults")}
                                    {renderRoomFeature("fa-child", `x${room.children}`, "children")}
                                </div>
                            </div>
                            <div className="HotelDetailsPage__description mb-5 pb-5">
                                <h2 className='fs-2 fw-bold mb-3'>About this hotel</h2>
                                <p className='fs-6'>{room.description}</p>
                            </div>
                            <div className="HotelDetailsPage__Facilities mb-5 pb-5">
                                <h2 className='fs-2 fw-bold mb-3'>Hotel Facilities</h2>
                                <div className="d-flex flex-wrap gap-4">
                                    {room.facilities ? room.facilities.map((facility, index) => (
                                        <div key={index} className="HotelDetailsPage__Facilities__item"> 
                                            <img src={`http://localhost:8080/uploads/facilities/${facility.logo}`} alt="" />
                                            <span className="text-capitalize">{facility.title}</span>
                                        </div>
                                    )) : "No facilities found"}
                                </div>
                            </div>
                            <div className="HotelDetailsPage__Facilities mb-5 pb-5">
                                <h2 className='fs-2 fw-bold mb-3'>Rates & availability</h2>
                                <Calendar/>
                            </div>
                        </div>
                        <div className="col-md-4 col-12 d-none d-md-block">
                            <RoomBookInquiry room={room} hotel={hotel}/>
                            <div className="m-5"></div>
                            <div className="HotelBookInquiry__container mb-4">
                                <div className="d-flex flex-column align-items-center justify-content-center  row-gap-2 ">
                                    <img className='rounded-circle' src={`http://localhost:8080/uploads/Partners/${hotel.partners[0].profileImage}`} alt="" />
                                    <h4>{hotel.partners[0].username}</h4>
                                    <p>Member Since {hotel.partners[0].createdAt.slice(0, 4)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RoomExploreOtherOptions hotel={hotel} room={hotel.rooms} />
                </div>
            </div>
        </>
    )
}

const renderRoomFeature = (icon, description, className) => (
    <div className="col-3">
        <div className={`RoomCardV1__item ${className} d-flex align-items-center`}>
            <i className={`fa-solid ${icon}`}></i>
            <span>{description}</span>
        </div>
    </div>
);

export default RoomDetailsPage
