import React, { useContext, useEffect, useMemo, useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import MainContext from '../../../context/context';
import axios from 'axios';
import BasketDropdowns from '../../../components/BasketDropdawn/BasketDropdowns';

const Header = () => {
    const [currencies, setCurrencies] = useState([]);
    const { currency, setCurrency } = useContext(MainContext);
    const currencyLogo = useMemo(() => ['€', '$'], []);
    
    useEffect(() => {
        axios.get('https://api.fastforex.io/fetch-multi?from=USD&to=EUR,USD&api_key=9c50c6e5a3-299d6b666b-sf6l85')
            .then((response) => {
                setCurrencies(Object.entries(response.data.results));
                if (localStorage.getItem('currency')) {
                    setCurrency(JSON.parse(localStorage.getItem('currency')));
                } else {
                    setCurrency({ name: 'USD', value: currencyLogo[1], coefficient: 1 });
                }
            })
            .catch(error => console.error("Error fetching currency data:", error));
    }, [setCurrency, currencyLogo]);

    const changeCurrency = (key, value, index) => {
        const roundedValue = Math.round(value * 100) / 100; // Round to two decimal places
        setCurrency({ name: key, value: currencyLogo[index], coefficient: roundedValue });
        localStorage.setItem('currency', JSON.stringify({ name: key, value: currencyLogo[index], coefficient: roundedValue }));
    }

    return (
        <header className='SiteHeader'>
            <div className="top-bar justify-content-between d-none d-md-flex">
                <div className="contacts d-flex gap-3">
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-solid fa-phone-volume"></i>
                        <span>(000) 999 -656 -888</span>
                    </div>
                    <div className="d-flex gap-2 p-1 px-0 opacity-50">|</div>
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-regular fa-envelope"></i>
                        <span>travelerwp@gmail.com</span>
                    </div>
                </div>
                <div className="icons d-flex">
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-brands fa-facebook-f"></i>
                    </div>
                    <div className="d-flex gap-2 p-1 px-0 opacity-50">|</div>
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="d-flex gap-2 p-1 px-0 opacity-50">|</div>
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div className="d-flex gap-2 p-1 px-0 opacity-50">|</div>
                    <div className="d-flex gap-2 p-1 px-0">
                        <i className="fa-brands fa-youtube"></i>
                    </div>  
                </div>
            </div>
            <div className="main-header  d-flex justify-content-between align-items-center">
                <button className="btn d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <p>Try scrolling the rest of the page to see this option in action.</p>
                    </div>
                </div>
                <div className="main-header-logo">
                    <Link to="/" className="main-header-logo-link d-none d-md-block d-xl-block d-xxl-block">
                        <img height={'60px'} src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Color-2.svg" alt="Logo" />
                    </Link>
                    <Link to="/" className='main-header-logo-link d-md-none'>
                        <img src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Mobile-Color-2.svg" alt="Mobile Logo" />
                    </Link>
                </div>
                <div className="main-header-menu d-none d-md-block d-xl-block d-xxl-block">
                    <nav>
                        <ul className='d-flex header-menu-nav gap-3'>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/search'>Search</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="buttons gap-3">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="fw-bold">{currency.name}</span>
                        </button>
                        <ul className="dropdown-menu currency  " >
                            {currencies.map(([key, value], index) => (
                                <li key={key} className="dropdown-item   " >
                                    <button className="dropdown-item" onClick={() => changeCurrency(key, value, index)}>
                                        {key} {currencyLogo[index]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <BasketDropdowns />
                    <button type="button" class="basketBtn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-regular fa-user"></i>
                    </button>
                </div>
    


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}

export default Header;