import React, { useContext, useState } from 'react'
import './AuthAcount.scss'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'; 
import MainContext from '../../context/context';
const AuthAcount = () => {
    const [dropdowns, setDropdowns] = useState(false)
    const { setAuthToken,UserData } = useContext(MainContext);
    console.log(UserData);
    return (
        <div className='Profile-dropdowns'>
            <button className='btn ProfileBtn  ' onClick={() => setDropdowns(!dropdowns)}>     <i className="fa-regular fa-user"></i> </button>
            <div className={dropdowns ? 'd-block ProfileDropdown' : 'd-none BasketDropdown'}>
                <div className="profile d-flex justify-content-around align-items-center">
                    <img src="https://secure.gravatar.com/avatar/768e674e02e17f8a5bd85a83ed9528ca?s=40&d=mm&r=g" alt="" />
                    <p>Hi {UserData ?UserData.username.length > 8 ? `${UserData.username.slice(0,8)}...`: UserData.username : "noname" }                 </p>
                </div>
               <Link className='btn' to={'client/dashboard'}>Dashboard</Link><br />
               <Link className='btn' to={'client/orderHistory'}>Booking History</Link>
               <br />
               <hr />
                <button className='btn' onClick={() =>{
                    Cookies.remove('auth_token')
                    setAuthToken(null)
                } }>Logout</button>
            </div>
        </div>

    )
}

export default AuthAcount