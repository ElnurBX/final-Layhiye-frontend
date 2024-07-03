import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import './Search.scss';
import SearchSections from '../../../components/sections/SearchSections/SearchSections';
import axios from 'axios';
import HotelCardV1 from '../../../components/Cards/HotelCardV1/HotelCardV1';
import MainContext from '../../../context/context';

const Search = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc for ascending, desc for descending
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const { PriceRefund } = useContext(MainContext);

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

    const initializeMap = useCallback(() => {
        if (!mapRef.current) {
            console.error('Map container is not yet available.');
            return;
        }

        const firstHotel = filteredData[0];
        const [lat, lng] = firstHotel.loc.split(",").map(coord => parseFloat(coord.trim()));

        console.log('Initializing map');
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 8
        });

        console.log('Map initialized:', map);

        filteredData.forEach(hotel => {
            if (hotel.loc) {
                const [lat, lng] = hotel.loc.split(",").map(coord => parseFloat(coord.trim()));
                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new window.google.maps.Marker({
                        position: { lat, lng },
                        map: map,
                        title: hotel.title,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        }
                    });

                    const infoWindowContent = `
                        <div style="font-size: 14px;">
                            <h3>${hotel.title}</h3>
                            <p>Price: ${PriceRefund(hotel.rooms[1].price)}</p>
                            <img className="w-100" src="http://localhost:8080/uploads/Hotels/${hotel.imgs[0]}" alt="${hotel.title}" style="width: 100px; height: auto;" />
                            <br />
                            <a href="details/hotel/${hotel._id}" target="_blank">View Hotel</a>
                        </div>
                    `;

                    const infoWindow = new window.google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });
                } else {
                    console.error('Invalid location data for hotel:', hotel);
                }
            } else {
                console.error('No location data for hotel:', hotel);
            }
        });
    }, [filteredData, PriceRefund]);

    useEffect(() => {
        if (mapLoaded && filteredData.length > 0) {
            initializeMap();
        }
    }, [mapLoaded, filteredData, initializeMap]);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/Hotels')
            .then(res => {
                console.log('Hotels fetched:', res.data);
                setData(res.data);
                setFilteredData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch hotels:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        filterAndSortData(event.target.value, sortOrder);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        filterAndSortData(searchTerm, order);
    };

    const filterAndSortData = (searchTerm, sortOrder) => {
        let filtered = data.filter(hotel => hotel.title.toLowerCase().includes(searchTerm.toLowerCase()));

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    };

  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred while loading hotels: {error.message}</p>;

    return (
        <main className="searchPage">
            <div className="mb-5 pt-5 searchPage__search">
                <SearchSections />
            </div>
            <div className="container-fluid">
                <input
                    type="text"
                    placeholder="Search by hotel title..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-4"
                />
                <div className="d-flex justify-content-end mb-4">
                    <button onClick={() => handleSort('asc')} className="btn btn-primary me-2">A-Z</button>
                    <button onClick={() => handleSort('desc')} className="btn btn-secondary">Z-A</button>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12 searchPage__cards">
                        <div className="row mt-3">
                            {currentItems.map((item, index) => (
                                <div key={index} className="col-md-6 col-12">
                                    <HotelCardV1 Hotel={item} />
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(number => (
                                <button key={number + 1} onClick={() => paginate(number + 1)} className="btn btn-light">
                                    {number + 1}
                                </button>
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
  