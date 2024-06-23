import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import HotelCardV1 from '../../Cards/HotelCardV1/HotelCardV1';
import './Recommended.scss';

const Recommended = () => {
    const [Hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/Hotels')
            .then(res => {
                setHotels(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
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
            <h3 className='display-6 font-family'>Recommended for you</h3>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        Hotels.map((hotel) => (
                            <div className="p-2" key={hotel._id}>
                                <HotelCardV1 Hotel={hotel} />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default Recommended;
