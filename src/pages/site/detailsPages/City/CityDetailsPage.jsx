import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PageNotation from '../../../../components/PageNotation/PageNotation';
import CityCarusel from '../../../../components/DetailsPages/CityCarusel/CityCarusel';
import './CityDetailsPage.scss';
import HotelCardV1 from '../../../../components/Cards/HotelCardV1/HotelCardV1';
import BlogCompanent from '../../../../components/BlogPage/BlogCompanent';
import Subscribe from '../../../../components/sections/Subscribe/Subscribe';

const CityDetailsPage = () => {
    const { id } = useParams();
    const [city, setCity] = useState({});
    const [loc, setLoc] = useState({ latitude: null, longitude: null });
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityRes = await axios.get(`http://localhost:8080/api/citys/${id}`);
                setCity(cityRes.data);
                setLoc(locationAdd(cityRes.data));

                const hotelsRes = await axios.get(`http://localhost:8080/api/hotels`);
                setHotels(findCommonItems(hotelsRes.data, cityRes.data.hotels));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    const findCommonItems = (array1, array2) => {
        if (!array2) return [];
        return array1.filter(item1 => array2.some(item2 => item1._id === item2._id));
    };

    const locationAdd = (city) => {
        let [latitude, longitude] = city.loc.split(",");
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        return { latitude, longitude };
    }

    useEffect(() => {
        if (loc.latitude && loc.longitude) {
            const initMap = () => {
                const map = new window.google.maps.Map(document.getElementById('map'), {
                    center: { lat: loc.latitude, lng: loc.longitude },
                    zoom: 10
                });

                const customIcon = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
                    scaledSize: new window.google.maps.Size(32, 32), 
                    origin: new window.google.maps.Point(0, 0), 
                    anchor: new window.google.maps.Point(16, 32) 
                };

                const marker = new window.google.maps.Marker({
                    position: { lat: loc.latitude, lng: loc.longitude },
                    map: map,
                    title: city.title,
                    icon: customIcon,
                    animation: window.google.maps.Animation.DROP 
                });

                const infowindow = new window.google.maps.InfoWindow({
                    content: `<img class="w-100" src="http://localhost:8080/uploads/citys/${city.mainImg}"><h3>${city.title}</h3><p>${city.description}</p>` 
                });

                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            };

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIti55TXeeXhZ1CD05IT9-FYz3zjcHi1s&callback=initMap`;
            script.async = true;
            script.defer = true;
            window.initMap = initMap;
            document.head.appendChild(script);
        }
    }, [loc, city.title, city.description , city.mainImg]);

    return (
        <>
            <PageNotation Title={city.title} Type={"city"} />
            <main className='CityDetailsPage'>
                <CityCarusel data={city.imgs} />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h2 className='fs-4 fw-bold mb-5'>{city.title}</h2>
                            <p className='fs-6 CityDetailsPage__description'>{city.description}</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <div id="map" style={{ height: '300px' }}></div>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='fs-4 fw-bold mt-5 text-center mb-5'>{city.title}</h2>
                        {hotels.length === 0 ? "Loading..." :
                            hotels.map((hotel, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4 mb-5">
                                    <HotelCardV1 Hotel={hotel}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <BlogCompanent/>
                <Subscribe/>
            </main>
        </>
    );
}

export default CityDetailsPage;
