import React, { useState } from 'react';
import './TableDitails.scss';
import { Subdashbourd } from './Subdashbourd';

const TableDetails = ({ keyName, content ,i,modelname}) => {
    const [HotelsModal,setHotelsModal]=useState(false)
    if (keyName === 'imgs') {
        return (
            <details>
                <summary>{keyName}</summary>
                <div className="TableDetails">
                    <div className="TableDetails__scroll">
                        {content.map((img, i) => (
                            <img key={i} width="100px" height="100px" src={`http://localhost:8080/uploads/${modelname}/${img}`} alt="" />
                        ))}
                    </div>
                </div>
            </details>
        );
    } 
    
    else if (keyName === 'hotels' || keyName === 'rooms' || keyName === 'reviews' || keyName === 'users' || keyName === 'partners' || keyName === 'facilities' || keyName === 'city' || keyName === 'rules' || keyName === 'images') {
        return (
            <>
                <button 
                    type="button" 
                    onClick={()=>setHotelsModal(!HotelsModal)}
                    className='btn btn-success'
                >
                    <h1 className=''>{keyName}</h1>
                </button>
                
                            <div className={HotelsModal?"HotelModal  ":"HotelModal d-none   "}>
                               <div className="HotelModal__header"> <button type="button" className="HotelModal__close btn" onClick={()=>setHotelsModal(!HotelsModal)}>x</button> <h3>{keyName}</h3></div>
                                <Subdashbourd Modeldata={content} title={keyName} />
                            </div>
                  
            </>
        );
    } else {
        return <>Not Available</>;
    }
};

export default TableDetails;
