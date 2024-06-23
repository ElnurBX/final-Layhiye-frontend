
import React from 'react'
import { Link } from 'react-router-dom'
import './footer.scss'
const Footer = () => {
return (
    <footer className='footer'>
        <div className="container">
            <div className="row">
                <div className="col-12 col-xl-3 col-md-6">
                    <h3>Support</h3>
                    <ul>
                        <li><Link>Help Center</Link></li>
                        <li><Link>Our COVID-19 Response</Link></li>
                        <li><Link>Cancellation options</Link></li>
                        <li><Link>Safety information</Link></li>
                    </ul>
                </div>
                <div className="col-12 col-xl-3 col-md-6">
                    <h3>Company</h3>
                <ul>
                        <li><Link>About us</Link></li>
                        <li><Link>Community Blog</Link></li>
                        <li><Link>Careers</Link></li>
                        <li><Link>Privacy policy</Link></li>
                        <li><Link>Terms of service</Link></li>
                    </ul>
                </div>
                <div className="col-12 col-xl-3 col-md-6">
                    <h3>Contact</h3>
                    <ul>
                        <li><Link>Partnerships</Link></li>
                        <li><Link>FAQ</Link></li>
                        <li><Link>Get in touch</Link></li>
                    </ul>
                </div>
                <div className="col-12 col-xl-3 col-md-6"></div>
            </div>
        </div>
        <div className="container ">
            <div className="row">
                <div className="col-12  col-md-6 p-0"><p>© Copyright Traveler 2022</p></div>
                <div className="col-12 col-md-6 d-flex justify-content-end p-0">
                    <img src="https://modtel.travelerwp.com/wp-content/uploads/2022/06/Frame-3182.svg" alt="" />
                </div>
            </div>
        </div>
    </footer>
)
}

export default Footer
                    