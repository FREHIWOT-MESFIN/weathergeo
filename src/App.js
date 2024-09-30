import React, { useState, useEffect } from 'react';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';
import Nav from './components/Navbar/Nav';
import './styles/App.scss';
import axios from 'axios';

const App = () => {
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [country, setCountry] = useState('');
    const { weatherData, loading, error } = useWeather(latitude, longitude);

    const handleSearch = (city) => {
        setLocation(city);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => console.error(error)
            );
        }
    }, []);

    useEffect(() => {
        const fetchCountry = async () => {
            if (latitude && longitude) {
                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    setCountry(response.data.address.country);
                } catch (error) {
                    console.error('Error fetching country:', error);
                }
            }
        };

        fetchCountry();
    }, [latitude, longitude]);
  console.log(weatherData)
    return (
        <div className="app">
            <Nav value={location} onChange={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weatherData && <WeatherCard weather={weatherData} country={country} />}
        </div>
    );
};

export default App;
