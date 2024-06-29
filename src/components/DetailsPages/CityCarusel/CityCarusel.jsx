import React, { useState } from 'react';
import './CityCarusel.scss';

const CityCarousel = ({ data = [] }) => {
    const [tab, setTab] = useState(0);

    const handlePrevClick = () => {
        setTab((prevTab) => (prevTab === 0 ? data.length - 1 : prevTab - 1));
    };

    const handleNextClick = () => {
        setTab((prevTab) => (prevTab === data.length - 1 ? 0 : prevTab + 1));
    };

    const getPrevIndex = (index) => (index === 0 ? data.length - 1 : index - 1);
    const getNextIndex = (index) => (index === data.length - 1 ? 0 : index + 1);

    return (
        <div className='CityCarousel'>
            <button className='btn CityCarousel__btn btn-prev' onClick={handlePrevClick}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="CityCaruselCounter">
                <span>{tab + 1}/{data.length}</span>
            </div>
            <div className="CityCarousel__viewport">
                <div className="CityCarousel__track">
                    {data.length > 0 ? (
                        <>
                            <div className="SliderItem prev">
                                <img
                                    src={`http://localhost:8080/uploads/citys/${data[getPrevIndex(tab)]}`}
                                    alt={`City view ${getPrevIndex(tab) + 1}`}
                                />
                            </div>
                            <div className="SliderItem active">
                                <img
                                    src={`http://localhost:8080/uploads/citys/${data[tab]}`}
                                    alt={`City view ${tab + 1}`}
                                />
                            </div>
                            <div className="SliderItem next">
                                <img
                                    src={`http://localhost:8080/uploads/citys/${data[getNextIndex(tab)]}`}
                                    alt={`City view ${getNextIndex(tab) + 1}`}
                                />
                            </div>
                        </>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
            <button className='btn CityCarousel__btn btn-next' onClick={handleNextClick}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default CityCarousel;
