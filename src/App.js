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

    const handleSearch = async (city) => {
        if (city.trim() === '') return; // Prevent searching for empty strings
    
        // Handle search logic
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: city,
                    format: 'json',
                    limit: 1,
                }
            });
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setLatitude(lat);
                setLongitude(lon);
            } else {
                console.error('City not found');
            }
        } catch (err) {
            console.error('Error fetching city data:', err);
        }
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
                    console.log(country)
                } catch (error) {
                    console.error('Error fetching country:', error);
                }
            }
        };
       
        fetchCountry();
    }, [latitude, longitude]);
    console.log(weatherData)

    return (
        <div className="app dark">
            <Nav value={location} onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weatherData && <WeatherCard weather={weatherData} country={country} />}
        </div>
    );
};

export default App;
