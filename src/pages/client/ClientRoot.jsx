
import React from 'react'
import Header from '../../layout/site/Header/header'
import { Outlet } from 'react-router'
import Footer from '../../layout/site/Footer/footer'

const ClientRoot = () => {
    
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default ClientRoot
