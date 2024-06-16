
import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../layout/admin/Header/header'
import Footer from '../../layout/admin/Footer/footer'

const AdminRoot = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default AdminRoot
