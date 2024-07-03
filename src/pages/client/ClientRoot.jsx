import React, { useContext, useEffect } from 'react';
import Header from '../../layout/client/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import MainContext from '../../context/context';

const ClientRoot = () => {
    const { authToken } = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/');
        }
    }, [authToken, navigate]);

    return (
        <div className='d-flex'>
            <Header />
            <Outlet />
        </div>
    );
};

export default ClientRoot;
