import React, { useContext, useEffect, useState } from 'react';
import './HotelDetailsPage.scss';
import PageNotation from '../../../../components/PageNotation/PageNotation';
import { useParams } from 'react-router';
import axios from 'axios';
import HotelGallery from '../../../../components/DetailsPages/HotelGallery/HotelGallery';
import { Link } from 'react-router-dom';
import MainContext from '../../../../context/context';
import RoomCardV1 from '../../../../components/Cards/RoomCardV1/RoomCardV1';
import { ReviewForm, ReviewsTable,ReviewsBody } from '../../../../components/ReviewsComponents/ReviewsComponents';
import HotelBookInquiry from '../../../../components/DetailsPages/HotelBookInquiry/HotelBookInquiry';
import Map from '../../../../components/Map/Map';
import ExploreOtherOptions from '../../../../components/sections/ExploreOtherOptions/ExploreOtherOptions';

const HotelDetailsPage = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const {  AddWishList, isItemInWishList ,UserData} = useContext(MainContext);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/hotels/${id}`)
            .then(res => {
                setHotel(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(`Failed to fetch data: ${err.message}`);
                setIsLoading(false);
            });
    }, [id]);

    const starCreate = (number) => {
        let stars = [];
        for (let i = 0; i < number; i++) {
            stars.push(<i key={i} className="fa-solid fa-star" aria-hidden="true"></i>);
        }
        return stars;
    };

    const sum=(array)=>{ 
        let sum=0;
        for(let i=0;i<array.length;i++){
            sum+=array[i];
            
        }
        return sum/array.length
    }
    const averageRating = (reviews)=>{
        if(reviews.length===0) return {mainCount:0, cleanlinessCount:0,communicationCount:0,checkInCount:0,accuracyCount:0,locationCount:0,valueCount:0}
        const cleanliness= [];
        const communication=[];
        const checkIn= [];
        const accuracy= [];
        const location= [];
        const value= [];
        for(let i=0;i<reviews.length;i++){
            cleanliness.push(reviews[i].cleanliness);
            communication.push(reviews[i].communication);   
            checkIn.push(reviews[i].checkIn);
            accuracy.push(reviews[i].accuracy);
            location.push(reviews[i].location);
            value.push(reviews[i].value);
        }
        const cleanlinessCount= sum(cleanliness)
        const communicationCount= sum(communication)
        const checkInCount= sum(checkIn)
        const accuracyCount= sum(accuracy)
        const locationCount= sum(location)
        const valueCount= sum(value)
        let mainCount=(cleanlinessCount+communicationCount+checkInCount+accuracyCount+locationCount+valueCount)/6;
        return {mainCount:mainCount, cleanlinessCount,communicationCount,checkInCount,accuracyCount,locationCount,valueCount}

    }
    const getReviewTitle = (rating) => {
        if (rating === 5) return "Excellent";
        if (rating >= 4) return "Good";
        if (rating >= 3) return "Normal";
        if (rating >= 2) return "Not bad";
        if (rating >= 1) return "Bad";
        return "Very bad";
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="HotelDetailsPage">
            <PageNotation Title={hotel.title} Type="hotel" />
            <HotelGallery Type={"hotels"} imgs={hotel.imgs} youtubeLink={hotel.youtubeLink} />
            <div className="container pt-5">
                <div className="row mb-5">
                    <div className="col-12 col-md-8">
                        <div className="star">
                            {starCreate(hotel.stars)}
                        </div>
                        <h2 className='fs-2 mt-1 fw-bold'>{hotel.title}</h2>
                        <div className="HotelDetailsPage__info mt-1 d-flex pb-5 mb-5 justify-content-between">
                            <div className="d-flex align-items-center gap-1">
                                <div className="ReviewsCount">
                                    {averageRating(hotel.reviews).mainCount.toFixed(1)}/5
                                </div>
                                <div className="ReviewsTitle">
                                    {getReviewTitle(averageRating(hotel.reviews).mainCount)}
                                </div>
                                <Link  to={`#reviews`}  className="NumberOfReviews text-decoration-none">
                                    {`(${hotel.reviews?.length || 0} reviews)`}
                                </Link>
                            </div>
                            <div className="HotelDetailsPage__info__heart">
                                <button className=' btn heart-btn' onClick={() => { AddWishList(hotel) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill='black'>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.75 7.68998C0.75 4.18927 3.57229 1.34998 7.06 1.34998C8.79674 1.34998 10.3646 2.05596 11.5003 3.19469C12.6385 2.05561 14.2122 1.34998 15.94 1.34998C19.4277 1.34998 22.25 4.18927 22.25 7.68998C22.25 11.4395 20.5107 14.4001 18.4342 16.5276C16.3683 18.6443 13.9235 19.9861 12.3657 20.5186C12.0914 20.6147 11.7773 20.65 11.5 20.65C11.2227 20.65 10.9086 20.6147 10.6343 20.5186C9.07655 19.9861 6.63169 18.6443 4.56577 16.5276C2.48932 14.4001 0.75 11.4395 0.75 7.68998Z" fill={isItemInWishList(hotel._id) ? 'red' : 'white'} fillOpacity={isItemInWishList(hotel._id) ? '1' : '0.5'} stroke={ isItemInWishList(hotel._id) ? 'red' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <div className="HotelDetailsPage__description mb-5 pb-5">
                            <h2 className='fs-2  fw-bold mb-3'>About this hotel</h2>
                            <p className='fs-6 '>{hotel.description}</p>
                        </div>
                        <div className="HotelDetailsPage__Facilities mb-5 pb-5">
                            <h2 className='fs-2  fw-bold mb-3'>Hotel Facilities</h2>
                            <div className="d-flex flex-wrap gap-4">
                                {
                                    hotel.facilities.map((facility, index) => {
                                        return (
                                            <div key={index} className="HotelDetailsPage__Facilities__item"> 
                                                <img className='' src={`http://localhost:8080/uploads/facilities/${facility.logo} `}alt="" />
                                                <span className="text-capitalize">{facility.title}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="HotelDetailsPage__rules mb-5 pb-5">
                            <h2 className='fs-2  fw-bold mb-3'> Rules</h2>
                            {
                                hotel.rules.map((rule, index) => {
                                    return (
                                        <div key={index} className="HotelDetailsPage__rules__item d-flex justify-content-between w-50 mb-2" >
                                            <span className="text-capitalize">{rule.key}</span>
                                            <p>{rule.value}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="HotelDetailsPage__availability mb-5 pb-5 ">
                            <h2 className='fs-2  fw-bold mb-3'>Availability</h2>
                            {
                                hotel.rooms.map((room, index) => {
                                    return <RoomCardV1 hotel={hotel} key={index} room={room} />
                                })
                            }
                        </div>
                        <div className="HotelDetailsPage__reviews  mb-5 pb-5" id='reviews__main'>
                            <h2 className='fs-2  fw-bold mb-3'>Reviews</h2>
                            <ReviewsTable reviews={hotel.reviews}/>

                            <ReviewsBody reviews={hotel.reviews} UserData={UserData}/>
                        </div>
                        <div className="ReviewForm mb-5 pb-5">
                            <ReviewForm hotel={hotel} UserData={UserData} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-md-block d-none ">
                        <div className="HotelBookInquiry">
                            <HotelBookInquiry hotel={hotel}/>
                            <div className="HotelDetailsPage p-4 mt-4 mb-5 HotelBookInquiry__container">
                                <img width={'100%'} height={'100%'} src={`http://localhost:8080/uploads/hotels/${hotel.mainImg}`} alt="" />
                            </div>
                            <div className="HotelBookInquiry__container mb-4">
                                <Map model={hotel} modelName={'hotels'}/> 
                            </div>
                            <div className="HotelBookInquiry__container mb-4">
                                <div className="d-flex flex-column align-items-center justify-content-center  row-gap-2 ">
                                    <img className='rounded-circle' src={`http://localhost:8080/uploads/Partners/${hotel.partners[0].profileImage}`} alt="" />
                                    <h4>{hotel.partners[0].username}</h4>
                                    <p>Member Since {hotel.partners[0].createdAt.slice(0, 4)}</p>
                                </div>
                            </div>
                            <div className="HotelBookInquiry__container d-flex flex-column row-gap-3 mb-5">
                                <h2 className='fs-2'>Information Contact</h2>
                                <h2 className='fs-4'>Email</h2>
                                <p>{hotel.partners[0].email}</p>
                                <h2 className='fs-4'>Website</h2>
                                <p>travelerwp.com
                                </p>
                                <h2 className='fs-4'>Phone</h2>
                                <p>
                                +6580009999</p>
                                <h2 className='fs-4'>Fax</h2>
                                <p> +123456789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ExploreOtherOptions/>
            </div>
        </main>
    );
}

export default HotelDetailsPage;
