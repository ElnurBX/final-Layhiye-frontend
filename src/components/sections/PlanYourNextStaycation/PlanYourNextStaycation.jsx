import React, { useEffect, useState } from 'react'
import './PlanYourNextStaycation.scss'
import axios from 'axios'
import HotelCardV1 from '../../Cards/HotelCardV1/HotelCardV1'
const PlanYourNextStaycation = () => {
    const [Hotels, setHotels] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/Hotels').then(res => {
            setHotels(res.data)
          
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <section className='PlanYourNextStaycation'>
            <h2 className='display-3  PlanYourNextStaycation__title'>Plan your next staycation</h2>
            <div className="container">
                <div className="row">
                    {
                        Hotels.map((Hotel , index) => {
                            console.log();
                            return(
                                <div className="col-12 col-md-6 col-lg-4" key={index}>
                                    <HotelCardV1 Hotel={Hotel}   />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default PlanYourNextStaycation