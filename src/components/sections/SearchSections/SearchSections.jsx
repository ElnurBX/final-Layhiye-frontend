import React, { useState } from 'react'
import './SearchSections.scss'
import Location from '../../Location/Location'

import Calendar from '../../Calendar/Calendar'
import Guests from '../../Guests/Guests'
import { Link } from 'react-router-dom'
const SearchSections = () => {
  const [LocationInfo, setLocationInfo] = useState()
  return (
    <section className='search-sections'>
        <div className="container">
            <div className="search-sections__item rounded-pill  ">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-3 mb-3">
                      <Location data={LocationInfo} setdata={setLocationInfo} />
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                       <Calendar/> 
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                      <Guests/>
                    </div>
                    <div className="col-12 col-md-3 mb-3 ">
                    <Link className='btn btn-primary btn-search rounded-pill fs-6'><i className="fa-solid fa-magnifying-glass"></i>   Search</Link>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SearchSections