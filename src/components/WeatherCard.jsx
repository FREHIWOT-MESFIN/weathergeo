import React, { useMemo } from 'react';
import icons from '../hooks/images';
import { GiWaterDrop } from 'react-icons/gi';
import { WiStrongWind } from 'react-icons/wi';
import { MdOutlineCompress } from 'react-icons/md';
import { BiSun } from 'react-icons/bi';
import { FaSun, FaMoon } from 'react-icons/fa';

const WeatherCard = ({ weather, country }) => {
    const isWeatherAvailable = weather && weather.current;

    const { current, hourly = {}, daily = {} } = isWeatherAvailable ? weather : { current: {} };
    const { temperature_2m, time: hourlyTime = [], wind_speed_10m = [] } = hourly;
    const { temperature_2m_max = [], temperature_2m_min = [], time: dailyTime = [], weather_code = [], sunrise = [], sunset = [], uv_index_max = [] } = daily;

    const hasDailyData = Array.isArray(dailyTime) && dailyTime.length > 0;

    const { feedback, weatherIcon } = useMemo(() => {
        let feedback = 'Unknown Weather';
        let weatherIcon = icons.overcast;

        if (weather_code.length > 0) {
            if (weather_code.includes(0) || weather_code.includes(1)) {
                feedback = 'Clear';
                weatherIcon = icons.sunny;
            } else if (weather_code.includes(2)) {
                feedback = 'Partly Cloudy';
                weatherIcon = icons.cloudySun;
            } else if (weather_code.includes(3)) {
                feedback = 'Overcast';
                weatherIcon = icons.overcast;
            } else if (weather_code.includes(61) || weather_code.includes(63) || weather_code.includes(65)) {
                feedback = 'Rainy';
                weatherIcon = icons.rain;
            } else if (weather_code.includes(80) || weather_code.includes(81)) {
                feedback = 'Showers';
                weatherIcon = icons.sunnyRain;
            } else if (weather_code.includes(71) || weather_code.includes(73) || weather_code.includes(75)) {
                feedback = 'Snowy';
                weatherIcon = icons.snowy;
            }
        }

        return { feedback, weatherIcon };
    }, [weather_code]);

    const forecast = useMemo(() => 
        hasDailyData ? dailyTime.slice(0, 5).map((date, index) => ({
            date,
            maxTemp: temperature_2m_max[index] !== undefined ? temperature_2m_max[index] : 'N/A',
            minTemp: temperature_2m_min[index] !== undefined ? temperature_2m_min[index] : 'N/A',
        })) : [],
        [hasDailyData, dailyTime, temperature_2m_max, temperature_2m_min]
    );

    const hourlyForecast = useMemo(() => 
        hourlyTime.length > 0 ? hourlyTime.slice(0, 5).map((dateTime, index) => ({
            dateTime,
            temperature: temperature_2m[index] !== undefined ? temperature_2m[index] : 'N/A',
            windSpeed: (wind_speed_10m[index] !== undefined ? wind_speed_10m[index] : 0 * 3.6).toFixed(1),
        })) : [],
        [hourlyTime, temperature_2m, wind_speed_10m]
    );

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
        const dateOptions = { weekday: 'long', day: '2-digit', month: 'short' };
        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
        return { formattedTime, formattedDate };
    };

    const formattedDateTime = isWeatherAvailable ? formatDateTime(current.time) : { formattedTime: 'N/A', formattedDate: 'N/A' };
    const currentDateIndex = hasDailyData ? dailyTime.findIndex(date => date === current.time.split('T')[0]) : -1;
    const sunriseTime = currentDateIndex >= 0 ? sunrise[currentDateIndex] : null;
    const sunsetTime = currentDateIndex >= 0 ? sunset[currentDateIndex] : null;
    const formattedSunrise = sunriseTime ? formatDateTime(sunriseTime) : { formattedTime: 'N/A' };
    const formattedSunset = sunsetTime ? formatDateTime(sunsetTime) : { formattedTime: 'N/A' };
    const uvIndexMax = uv_index_max[0] !== undefined ? uv_index_max[0] : 'N/A';

    if (!isWeatherAvailable) {
        return <p>No weather data available.</p>;
    }

    if (!hasDailyData) {
        return <p>No daily weather data available.</p>;
    }
    return (
        <div className="weather-card">
            <div className='divider'>
                <div className="country-info">
                    <h3>{country}</h3>
                    <h1 style={{ marginTop: '2rem' }}>{formattedDateTime.formattedTime}</h1>
                    <p>{formattedDateTime.formattedDate}</p>
                </div>
                <div className="weather-details">
                    <div className="main-deta">
                        <h1 style={{ fontSize: '3.5rem' }}>{current.temperature_2m} °C</h1>
                        <p style={{ marginBottom: '2rem' }}>Feels like {current.apparent_temperature} °C</p>
                        <div className="sunrise">
                            <FaSun size={30} title="Sunrise" />
                            <span>
                                <p>Sunrise</p>
                                <p>{formattedSunrise.formattedTime}</p>
                            </span>
                        </div>
                        <div className="sunset">
                            <FaMoon size={30} title="Sunset" />
                            <span>
                                <p>Sunset</p>
                                <p>{formattedSunset.formattedTime}</p>
                            </span>
                        </div>
                    </div>
                    <div className="weather-icon" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={weatherIcon} style={{ width: '150px', height: '180px' }} alt={feedback} />
                        <p>{feedback}</p>
                    </div>
                    <div className="extra-details">
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <GiWaterDrop size={60} />
                                <p style={{ marginBottom: '1rem' }}>{current.relative_humidity_2m} %</p>
                                <p>Humidity</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <WiStrongWind size={60} />
                                <p style={{ marginBottom: '1rem' }}>{(current.wind_speed_10m * 3.6).toFixed(1)} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <MdOutlineCompress size={60} />
                                <p style={{ marginBottom: '1rem' }}>{current.pressure_msl}hPa</p>
                                <p>Pressure</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <BiSun size={60} />
                                <p style={{ marginBottom: '1rem' }}>{uvIndexMax}</p>
                                <p>UV</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='divider'>
                <div className="five-days-forecast">
                    <h2>5-Day Weather Forecast</h2>
                    <ul>
                        {forecast.map(({ date, maxTemp, minTemp }) => {
                            const formattedDailyDate = formatDateTime(date);
                            return (
                                <li key={date} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <img src={weatherIcon} style={{ width: '50px', height: '30px' }} alt="" />
                                    <p>{maxTemp}°C</p> 
                                    <p>{formattedDailyDate.formattedDate}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="hourly-forecast">
                    <h2>Hourly Forecast</h2>
                    {hourlyForecast.length > 0 ? (
                        <ul>
                            {hourlyForecast.map(({ dateTime, temperature, windSpeed }) => (
                                <li key={dateTime} className={(weatherIcon === icons.sunny || weatherIcon === icons.sunnyRain) ? 'highlight-background' : ''}>
                                    <p>{formatDateTime(dateTime).formattedTime}</p>
                                    <img src={weatherIcon} style={{ width: '50px', height: '30px' }} alt="" />
                                    <p>{temperature}°C</p>
                                    <img src={icons.direction} alt="" />
                                    <p>{windSpeed} km/h</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hourly data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
