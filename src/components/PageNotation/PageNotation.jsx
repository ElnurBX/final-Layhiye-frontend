import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PageNotation.scss';

const PageNotation = ({ Title, Type }) => {
    const [filtered, setFiltered] = useState([]);

    const FIltered = useCallback((Country, Title) => {
        for (let i = 0; i < Country.length; i++) {
            for (let j = 0; j < Country[i].city.length; j++) {
                if (Type === 'city') {
                    if (Country[i].city[j].title === Title) {
                        setFiltered(Country[i]);
                        return Country[i].title;
                    }
                } else if (Type === 'hotel') {
                    for (let k = 0; k < Country[i].city[j].hotels.length; k++) {
                        if (Country[i].city[j].hotels[k].title === Title) {
                            setFiltered(Country[i]);
                            return Country[i].title;
                        }
                    }
                }
            }
        }
    }, [Type]); 

    useEffect(() => {
        axios.get('http://localhost:8080/api/Country').then(res => {
            FIltered(res.data, Title);
        });
    }, [Title, FIltered]); 

    return (
        <div className='page-notation'>
            <h3>
                <Link to="/">Home</Link> <span></span> 
                <Link className='text-decoration-none text-dark' to={`/${filtered.title}`}>
                    {filtered.title}
                </Link> <span></span> 
                <Link>{Title}</Link>
            </h3>
        </div>
    );
};

export default PageNotation;
