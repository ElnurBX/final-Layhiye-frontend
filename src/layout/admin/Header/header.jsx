
import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className=' d-flex justify-content-center'>
            <h1 className='btn'>Header</h1>
            <nav>
                <ul className='d-flex gap-2'>
                    <li><Link className='btn' to={'/'}>Home</Link></li>
                    <li><Link className='btn' to={'/admin'}>Dashboard</Link></li>
                    <li><Link className='btn' to={'/admin/add'}>Add</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
                                