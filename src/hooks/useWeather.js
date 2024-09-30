import { useEffect, useState } from 'react';
import axios from 'axios';

const useWeather = (latitude, longitude) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (latitude == null || longitude == null) {
                return; // Exit if coordinates are not set
            }

            setLoading(true);
            try {
                const cachedData = localStorage.getItem(`weather_${latitude}_${longitude}`);
                const cachedTimestamp = localStorage.getItem(`weather_${latitude}_${longitude}_timestamp`);

                const now = new Date();
                if (cachedData && cachedTimestamp && now - new Date(cachedTimestamp) < 24 * 60 * 60 * 1000) {
                    setWeatherData(JSON.parse(cachedData));
                } else {
                    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration`);
                    
                    setWeatherData(response.data);
                    localStorage.setItem(`weather_${latitude}_${longitude}`, JSON.stringify(response.data));
                    localStorage.setItem(`weather_${latitude}_${longitude}_timestamp`, now);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [latitude, longitude]);

    return { weatherData, loading, error };
};

export default useWeather;
