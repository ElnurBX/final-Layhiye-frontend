import React, { useState } from 'react'
import './BasketDropdowns.css'
import potho from '../../assets/images/basket.png'
const BasketDropdowns = () => {
    const [dropdowns, setDropdowns] = useState(false)
    return (
        <div className='basket-dropdowns'>
            <button className='btn basketBtn  ' onClick={() => setDropdowns(!dropdowns)}> <img className='basketBtnImg' src={potho} alt="" /> </button>
            <div className={dropdowns ? 'd-block BasketDropdown' : 'd-none BasketDropdown'}>
                dsadasdas
            </div>
        </div>

    )
}

export default BasketDropdowns