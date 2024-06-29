import React, { useState, useEffect, useCallback } from 'react';

const Map = ({ model }) => {
    const [loc, setLoc] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (model && model.loc) {
            const [latitude, longitude] = model.loc.split(",");
            setLoc({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            });
        }
    }, [model]);

    const loadMap = useCallback(() => {
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
                title: model.title,
                icon: customIcon,
                animation: window.google.maps.Animation.DROP
            });

            const infowindow = new window.google.maps.InfoWindow({
                content: `<img class="w-100" src="http://localhost:8080/uploads/${model.modelName}/${model.mainImg}"><h3>${model.title}</h3><p>${model.description}</p>`
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
    }, [loc.latitude, loc.longitude, model]);  

    useEffect(() => {
        if (loc.latitude && loc.longitude) {
            loadMap();
        }
    }, [loc, loadMap]);

    return (
        <div id='map' style={{ height: '300px' }}></div>
    );
}

export default Map;
