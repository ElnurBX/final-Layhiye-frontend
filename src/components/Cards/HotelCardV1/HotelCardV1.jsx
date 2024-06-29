import React, { useContext } from 'react';
import './HotelCardV1.scss';
import { Link } from 'react-router-dom';
import MainContext from '../../../context/context';

const HotelCardV1 = ({ Hotel }) => {
  const { PriceRefund, AddWishList, isItemInWishList } = useContext(MainContext);

  const starCreate = (number) => {
    let star = [];
    for (let i = 0; i < number; i++) {
      star.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return star;
  };
  const sum=(array)=>{ 
    let sum=0;
    for(let i=0;i<array.length;i++){
        sum+=array[i];
        
    }
    return sum/array.length
}
  const ReviewsCount = (reviews)=>{
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
  

  const ReviewsTitle = (number) => {
    let title;

    switch (true) {
      case number === 5:
        title = "Excellent";
        break;
      case number >= 4:
        title = "Good";
        break;
      case number >= 3:
        title = "Normal";
        break;
      case number >= 2:
        title = "Not bad";
        break;
      case number >= 1:
        title = "Bad";
        break;
      case number >= 0:
        title = "Very bad";
        break;
      default:
        title = "No reviews";
    }

    return title;
  };

  const Cityname = (Hotel) => {
    return Hotel.city[0] && Hotel.city[0].title ? Hotel.city[0].title : "not available";
  };

  return (
    <div className='HotelCardV1'>
      <div className="HotelCardV1__head">
        <div className="HotelCardV1__head__cut">
          <img src={Hotel.mainImg ? `http://localhost:8080/uploads/Hotels/${Hotel.mainImg}` : 'default-image-url'} alt="" />
        </div>
        <button className='' onClick={() => { AddWishList(Hotel) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill='none'>
            <path fillRule="evenodd" clipRule="evenodd" d="M0.75 7.68998C0.75 4.18927 3.57229 1.34998 7.06 1.34998C8.79674 1.34998 10.3646 2.05596 11.5003 3.19469C12.6385 2.05561 14.2122 1.34998 15.94 1.34998C19.4277 1.34998 22.25 4.18927 22.25 7.68998C22.25 11.4395 20.5107 14.4001 18.4342 16.5276C16.3683 18.6443 13.9235 19.9861 12.3657 20.5186C12.0914 20.6147 11.7773 20.65 11.5 20.65C11.2227 20.65 10.9086 20.6147 10.6343 20.5186C9.07655 19.9861 6.63169 18.6443 4.56577 16.5276C2.48932 14.4001 0.75 11.4395 0.75 7.68998Z" fill={isItemInWishList(Hotel._id) ? 'red' : 'white'} fillOpacity={isItemInWishList(Hotel._id) ? '1' : '0.5'} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className="HotelCardV1__head__Partner">
          <img src={`http://localhost:8080/uploads/Partners/${Hotel.partners[0].profileImage}`} alt="" />
        </div>
      </div>
      <div className="HotelCardV1__content">
        <div className="HotelCardV1__content__header">
          <div className="stars">
            {starCreate(Hotel.stars)}
          </div>
          <Link className='fs-4 text-decoration-none ' to={`/details/hotel/${Hotel._id}`}>{Hotel.title}</Link>
          <p className='mt-2'><span>{Cityname(Hotel)}</span></p>
        </div>
        <div className="HotelCardV1__content__footer">
          <div className="d-flex align-items-center">
            <div className="ReviewsCount">
              {ReviewsCount(Hotel.reviews).mainCount.toFixed(1)}/5
            </div>
            <div className="ReviewsTitle">
              {ReviewsTitle(ReviewsCount(Hotel.reviews).mainCount)}
            </div>
            <div className="NumberOfReviews">
              {`(${Hotel.reviews.length} Reviews)`}
            </div>
          </div>
          <div className="Price fs-6">
            <span>From:  </span> <span className='text-dark fw-bold'>{PriceRefund(parseFloat(Hotel.rooms[1].price))}</span> <span>/night</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCardV1;
