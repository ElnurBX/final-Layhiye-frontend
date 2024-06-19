import React from 'react'
import './SpecialOffer.scss'
import { Link } from 'react-router-dom'
const SpecialOffer = () => {
  return (
    <section className='SpecialOffer'>
        <div className="container">
            <div className="row">
                <div className="  col-12 col-md-6">
                    <Link to={'/'} className="SpecialOffer__item">
                        <img  className='w-100' src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Frame-3151-min.png" alt="" />
                    </Link>
                </div>
                <div className="  col-12 col-md-6">
                    <Link to={'/'} className="SpecialOffer__item">
                        <img className='w-100'  src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Frame-3150-min.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SpecialOffer