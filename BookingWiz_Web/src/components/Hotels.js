import React, { useState, useEffect } from 'react';
import './Hotels.css';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const URL = `${BASE_URL}/admin/hotel/list`;

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setHotels(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading hotels: {error.message}</div>;
    }

    return (
        <div className="hotels-container">
            <h1>Hotels</h1>
            <div className="hotels-grid">
                {hotels.length === 0 ? (
                    <p>No hotels available</p>
                ) : (
                    hotels.map((hotel) => (
                        <div key={hotel.id} className="hotel-card">
                            <img
                                src={hotel.image || 'https://via.placeholder.com/150'}
                                alt={hotel.name}
                                className="hotel-image"
                            />
                            <div className="hotel-info">
                                <h2>{hotel.name}</h2>
                                <p>{hotel.location || 'Location not available'}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Hotels;
