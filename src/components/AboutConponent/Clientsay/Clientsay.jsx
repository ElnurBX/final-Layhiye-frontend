// import axios from 'axios';
import React  from 'react';
import Slider from "react-slick";
import './Clientsay.scss';

const Clientsay = () => {

    const OurClientsSay=[
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        },
        {
            discrption:`“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet condimentum in pretium. Montes tristique amet pellentesque ut fames condimentum."` ,
            name:'Darlene Robertson',
            star:5,
            positon:"Customers" ,
            country:"U.S.A"
        }
    ]
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:3,
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
    const StarCreate=(number)=>{
        let star=[]
        for(let i=0;i<number;i++){
            star.push(<i key={i} className="fa-solid fa-star"></i>)
        }
        return star
    }
    return (
        <div className="Clientsay container">
            <h3 className='display-6 font-family'>Clientsay for you</h3>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        OurClientsSay.map((info,index) => (
                            <div key={index} className="p-1">
                                <div className=" Clientsay__content" key={index}>
                                <p className='text-dark pb-4 fs-6'>{info.discrption}</p>
                                <div className="star d-flex gap-1 pb-3 ">
                                    {
                                        StarCreate(info.star)
                                    }
                                </div>
                                <h5 className='fw-bold pb-2'>{info.name}</h5>
                                <p>{info.positon} ,in {info.country}</p>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default Clientsay;
