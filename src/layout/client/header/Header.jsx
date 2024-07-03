import React, { useContext, useState, useEffect } from 'react';
import './Header.scss';
import MainContext from '../../../context/context';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const [open, setOpen] = useState(true);
    const { UserData, setAuthToken } = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!UserData) {
            navigate('/');
        }
    }, [UserData, navigate]);

    return (
        <>
            <button
                className={`btn btn-50 btn-primary text-light m-1 ${open ? 'd-none' : 'd-block'}`}
                onClick={() => setOpen(!open)}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className={open ? "Client__header open" : "Client__header d-none"}>
                <div className="d-flex pb-3 Client__header__head p-1">
                    <img height={40} src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Color-2.svg" alt="Logo" />
                    <button
                        className={`btn btn-50 text-light m-1 btn-right ${open ? 'd-block' : 'd-none'}`}
                        onClick={() => setOpen(!open)}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
                <div className="Client__header__profile d-flex">
                    <img src={`http://localhost:8080/uploads/users/${UserData?.profileImage}`} alt="Profile" />
                    <div className="Client__header__profile__name text-light">
                        <p className='fw-bold mb-2'>{UserData?.username}</p>
                        <span>Since: {UserData?.createdAt ? UserData.createdAt.slice(0, 4) : ''}</span>
                    </div>
                </div>
                <div className="Client__header__menu">
                    <ul>
                        <li><Link to={'/client/dashboard'}><i className="fa-solid fa-gear"></i> <span>Settings</span></Link></li>
                        <li><Link to={'/client/orderHistory'}><i className="fa-regular fa-clock"></i> Booking History</Link></li>
                        <li><Link to={'/client/wishlist'}><i className="fa-solid fa-clipboard-list"></i> Wishlist</Link></li>
                    </ul>
                </div>
                <div className="Client__header__Close border-0">
                    <ul>
                        <li>
                            <Link
                                onClick={() => {
                                    Cookies.remove('auth_token');
                                    setAuthToken(null);
                                    navigate('/');
                                }}
                                to={'/'}
                            >
                                <i className="fa-solid fa-gear"></i> <span>Logout</span>
                            </Link>
                        </li>
                        <li><Link to={'/'} className='text-success'>Back to Homepage</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
