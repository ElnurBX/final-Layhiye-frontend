import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import './error.scss'
    
    const Error = () => {

        return (
        <div className='error'>
                <Helmet>
                    <title>Error</title>
                </Helmet>
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className=" pt-5">
                    <img src="https://modtel.travelerwp.com/wp-content/themes/traveler/v3/images/404.png" alt="" />

                    </div>
                    
                    <h2 className='fs-2 fw-bold mb-4'>Oops! Look like you're lost</h2>
                    <p className=' mb-4 '>Either something went wrong or the page doesn't exist anymore.</p>
                    <Link className='btn btn-primary rounded-pill' to={'/'} >Go to Home</Link>
                </div>
        </div>
        )
    }
    
    export default Error
        