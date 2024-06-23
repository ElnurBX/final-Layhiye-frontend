import React, { useContext, useState } from 'react'
import './AuthAcount.scss'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'; 
import MainContext from '../../context/context';
const AuthAcount = () => {
    const [dropdowns, setDropdowns] = useState(false)
    const { setAuthToken,UserData } = useContext(MainContext);
      const Fotmatname=(str)=>{
        
        if(String(str).length>10){
            return str.slice(0,10) + '...'
            
        }
        return str
    }
    return (
        <div className='Profile-dropdowns'>
            <button className='btn ProfileBtn  ' onClick={() => setDropdowns(!dropdowns)}> 
                {
                    UserData.profileImage ? (
                        <img className='profileimg' src={`http://localhost:8080/uploads/users/${UserData.profileImage}`} alt="Profile" />
                    ) : (
                        <i className="fa-regular fa-user"></i>
                    )
                }
                   
            </button>
            <div className={dropdowns ? 'd-block ProfileDropdown' : 'd-none BasketDropdown'}>
                <div className="profile d-flex justify-content-around align-items-center">
                {UserData.profileImage ? (
                <img src={`http://localhost:8080/uploads/users/${UserData.profileImage}`} alt="Profile" />
                ) : (
                    <p>No profile image</p>
                )}
                    <p>Hi {UserData ?   Fotmatname( UserData.username) : "noname" }                 </p>
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