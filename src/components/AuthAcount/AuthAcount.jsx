import React, { useContext } from 'react'
import './AuthAcount.scss'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'; 
import MainContext from '../../context/context';
const AuthAcount = () => {

    const { setAuthToken,UserData ,authDropdown, setAuthDropdown} = useContext(MainContext);
      const Fotmatname=(str)=>{
        
        if(String(str).length>10){
            return str.slice(0,10) + '...'
            
        }
        return str
    }
    return (
        <div className='Profile-dropdowns'>
            <button className='btn ProfileBtn  ' onClick={() => setAuthDropdown(!authDropdown)}> 
                {
                    UserData.profileImage ? (
                        <img className='profileimg' src={`http://localhost:8080/uploads/users/${UserData.profileImage}`} alt="Profile" />
                    ) : (
                        <i className="fa-regular fa-user"></i>
                    )
                }
                   
            </button>
            <div className={authDropdown ? 'd-block ProfileDropdown' : 'd-none BasketDropdown'}>
                <div className="profile d-flex justify-content-around align-items-center">
                {UserData.profileImage ? (
                <img src={`http://localhost:8080/uploads/users/${UserData.profileImage}`} alt="Profile" />
                ) : (
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="Profile"/>
                )}
                    <p>Hi {UserData ?   Fotmatname( UserData.username) : "noname" }                 </p>
                </div>
               <Link className='btn' to={'client/dashboard'}>Dashboard</Link><br />
               <Link className='btn' to={'client/orderHistory'}>Booking History</Link>
               <Link className='btn' to={'client/Wishlist'}>Wishlist</Link>
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