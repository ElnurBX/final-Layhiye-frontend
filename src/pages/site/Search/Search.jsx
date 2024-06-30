import React, { useEffect, useState, useRef } from 'react';
import './Search.scss';
import SearchSections from '../../../components/sections/SearchSections/SearchSections';
import axios from 'axios';
import HotelCardV1 from '../../../components/Cards/HotelCardV1/HotelCardV1';

const Search = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCIti55TXeeXhZ1CD05IT9-FYz3zjcHi1s';
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
                script.onload = () => {
                    console.log('Google Maps script loaded.');
                    setMapLoaded(true);
                };
                script.onerror = () => {
                    console.error('Google Maps script failed to load.');
                    setError({ message: 'Google Maps script failed to load.' });
                };
            } else {
                setMapLoaded(true);
            }
        };

        loadGoogleMaps();
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            setTimeout(() => {
                initializeMap();
            }, 1000); // 1 saniye bekleyerek harita konteynerinin render edilmesini bekliyoruz
        }
    }, [mapLoaded]);

    const initializeMap = () => {
        if (!mapRef.current) {
            console.error('Map container is not yet available.');
            return;
        }

        console.log('Initializing map');
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 39.9334, lng: 32.8597 }, // Ankara
            zoom: 8
        });

        console.log('Map initialized:', map);
    };

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/Hotels')
            .then(res => {
                console.log('Hotels fetched:', res.data);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch hotels:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hoteller yüklenirken bir hata oluştu: {error.message}</p>;

    return (
        <main className="searchPage">
            <div className="mb-5 pt-5 searchPage__search">
                <SearchSections />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-12 searchPage__cards">
                        <div className="row mt-3">
                            {data.map((item, index) => (
                                <div key={index} className="col-md-6 col-12">
                                    <HotelCardV1 Hotel={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6 col-12 d-none d-md-block">
                        <div ref={mapRef} id="map" className="map" ></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Search;
