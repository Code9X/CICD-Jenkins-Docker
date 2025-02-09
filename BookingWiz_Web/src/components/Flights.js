import React, { useState, useEffect } from 'react';
import './Flights.css';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const URL = `${BASE_URL}/admin/flight/list`;

    // Function to fetch data
    const fetchFlights = () => {
        setLoading(true); // Start loading state
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setFlights(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchFlights();
    }, [URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading flights: {error.message}</div>;
    }

    return (
        <div className="flights-container">
            <h1>Flights</h1>
            <div className="flights-grid">
                {flights.length === 0 ? (
                    <p>No flights available</p>
                ) : (
                    flights.map((flight) => (
                        <div key={flight.id} className="flight-card">
                            <img
                                src={flight.image || 'https://via.placeholder.com/150'}
                                alt={flight.name}
                                className="flight-image"
                            />
                            <div className="flight-info">
                                <h2>{flight.name}</h2>
                                <p>{flight.location || 'Location not available'}</p>
                                <p>Price: ${flight.price}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Flights;
