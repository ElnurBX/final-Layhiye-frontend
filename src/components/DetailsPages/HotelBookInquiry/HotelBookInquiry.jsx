import React, { useState ,useRef} from 'react'
import './HotelBookInquiry.scss'
import Calendar from '../../Calendar/Calendar'
import Guests from '../../Guests/Guests'
import emailjs from '@emailjs/browser';
const HotelBookInquiry = ({hotel}) => {
    const [value, setValue] = useState(true)
    const sum=(array)=>{ 
        let sum=0;
        for(let i=0;i<array.length;i++){
            sum+=array[i];
            
        }
        return sum/array.length
    }
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_o31dee6', 'template_l1qjc4z', form.current, {
            publicKey: 'QOGlN-v0QbIoBTLBN',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };
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
    return (
        <div className='HotelBookInquiry__container'>
            <div className="HotelBookInquiry__buttons">
                <button className={value ? 'btn btn-primary' : ' btn deactive'} onClick={() => setValue(true)}>Book</button>
                <button className={!value ? 'btn btn-primary' : ' btn deactive'} onClick={() => setValue(false)}>Inquiry</button>
            </div>
            {
                value ?
                <div className="HotelBookInquiry__content">
                <p>From <span className='text-black'>{hotel.rooms[0].price}</span>/night <span  className='d-inline' style={{color:'#ffb21d'}}> <i className="fa-solid fa-star"></i></span> <span className='text-black'>{averageRating(hotel.reviews).mainCount.toFixed(1)}</span> <span >({hotel.reviews.length} reviews)</span></p>
                <div className="border rounded-4 mt-3">
                    <div className="border-bottom ">
                            <Calendar/>
                        
                        </div>
                        <div className="border-top p-1 ">
                            <Guests/>
                        </div>
                        <div className="border-top d-flex justify-content-center align-items-center pb-3">
                        <button className='btn btn-primary w-75 m-auto mt-5'>Check availability</button>
                        </div>
                    </div>
                </div>
                :
                <>
                <div className="HotelBookInquiry__content">
                    <div >
                        <form ref={form} onSubmit={sendEmail} className="d-flex justify-content-center align-content-center flex-column ">
                            <div className="form-control">
                                <label htmlFor="user_name">
                                    Name (*)
                                </label>
                                <input 
                                type="text"
                                id="user_name"
                                name="user_name"
                                placeholder='Your Name*'
                                required
                                className='w-100'
                                />
                            <label htmlFor="phone_number">Phone</label>
                            <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            placeholder='Phone Number*'
                            required
                            />
                            <label htmlFor="user_email">Email</label>
                            <input 
                            type="email" 
                            name="user_email" 
                            placeholder='Your Email*'
                            required
                            />
                            <label htmlFor="message">Note</label>
                            <div className="">
                                <textarea 
                                    name="message" 
                                    placeholder='Message*'
                                    required
                                    />
                                </div>
                            <button type="submit" value="Submit" className='btn btn-primary w-100' >
                                Submit <i className="fa-solid fa-arrow-right"></i>
                            </button> 
                            </div>
                        </form>
                    </div>
                </div>
                </>
            }
        </div>
    )
}

export default HotelBookInquiry