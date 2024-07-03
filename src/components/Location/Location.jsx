import React, { useEffect, useState } from 'react';
import './Location.scss';
import axios from 'axios';

const Location = ({ data, setdata }) => {
    const [dropdawn, setdropdawn] = useState(false);
    const [loc, setLoc] = useState([]);
    const [searchList, setSearchList] = useState([]);

    const SearchListCreate = (country) => {
        if (!Array.isArray(country)) {
            console.error("Invalid input: country must be an array");
            return [];
        }

        let list = [];

        country.forEach((countryItem) => {
            if (countryItem && countryItem.title) {
                list.push(countryItem.title);
            }

            if (countryItem && Array.isArray(countryItem.city)) {
                countryItem.city.forEach((cityItem) => {
                    if (cityItem && cityItem.title) {
                        list.push(cityItem.title);
                    }
                });
            }
        });
        return list;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/Country`).then(res => {
            setLoc(res.data);
            setSearchList(SearchListCreate(res.data));
        });
    }, []);

    return (
        <div className="Location">
            <button className='btn d-flex gap-2 align-items-center rounded-pill' onClick={() => setdropdawn(!dropdawn)}>
                <i className="fa-solid fa-location-dot"></i>
                <div className="Location__input">
                    <h3>Location</h3>
                    <input onChange={(e) => setdata(e.target.value)} type="text" placeholder="Where are you going?" value={data} />
                </div>
            </button>
            <div className={dropdawn ? "Location__Dropdown" : "d-none Location__Dropdown"}>
                {data ? (
                    <>
                        {searchList.filter(item => item.toLowerCase().includes(data.toLowerCase())).length > 0 ? 
                        <>
                            <h3 className='pb-3 mb-1 fs-6'>Popular destinations</h3>
                                {
                                    searchList.filter(item => item.toLowerCase().includes(data.toLowerCase())).map((item, index) => (
                                        <ul>
                                            <li>
                                                <button key={index} className='btn' onClick={() => setdata(item)}> <i className="fa-solid fa-location-dot"></i> {item}</button>
                                            </li>
                                        </ul>
                                    ))
                                }
                        </>

                        :
                        (
                            <h3 className='pb-3 mb-1 fs-6'>No result found for "{data}"</h3>
                        )}
                    </>
                ) : (
                    <>
                        <h3 className='pb-3 mb-1 fs-6'>Popular destinations</h3>
                        <ul>
                            {loc.map((country, index) => (
                                <li key={index}>
                                    <button className='btn' onClick={() => setdata(country.title)}>{country.title}</button>
                                    <ul className='ms-3'>
                                        {country.city.map((city, cityIndex) => (
                                            <li key={cityIndex}>
                                                <button className='btn' onClick={() => setdata(city.title)}>
                                                    <i className="fa-solid fa-location-dot"></i> {city.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default Location;
