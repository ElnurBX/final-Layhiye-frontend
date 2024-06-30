
import React from 'react';
import Slider from "react-slick";
import './ExploreOtherOptions.scss';
import RoomCardV1 from '../../Cards/RoomCardV1/RoomCardV1';

const RoomExploreOtherOptions = ({room,hotel}) => {

  
    if(!room) return null
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="recommended container">
            <h3 className='display-6 font-family'> Explore Other Options</h3>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        room.map((room) => (
                            <div className="p-2" key={room._id}>
                               <RoomCardV1 hotel={hotel} room={room}  />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default RoomExploreOtherOptions;
