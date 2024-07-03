import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../layout/admin/Header/header';
import Footer from '../../layout/admin/Footer/footer';
import MainContext from '../../context/context';

const AdminRoot = () => {
    const { authToken } = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/');
        }
    }, [authToken, navigate]);

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AdminRoot;
