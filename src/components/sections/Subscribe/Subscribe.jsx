import React from 'react'
import './Subscribe.scss'
const Subscribe = () => {
    return (
    <section className='Subscribe'>
        <div className="container Subscribe__container">
            <div className="row">
                <div className="col-12 col-md-6 p-0">
                    <img src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Rectangle-7-min.png" alt="" />
                </div>
                <div className="col-12 col-md-6 p-5">
                    <h2 className='fs-2 fw-bold text-center mb-3'>Get special offers, and more from Traveler</h2>
                    <p className='text-center fs-6 p-5 pt-0 pb-0 mb-5' >Subscribe to see secret deals prices drop the moment you sign up!</p>
                    <div className="input-group pt-1 pb-1 mb-5">
                        <form action="">
                            <input type="email" className="form-control rounded-pill" placeholder="Email Address" />
                            <button className="btn btn-primary rounded-pill" type="button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Subscribe