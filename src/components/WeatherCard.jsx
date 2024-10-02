import React from 'react';
import image from '../assets/overcast_icon.png'


const WeatherCard = ({ weather, country }) => {
    if (!weather || !weather.current) {
        return <p>No weather data available.</p>;
    }

    const { current, hourly, daily } = weather;
    const { temperature_2m, time: hourlyTime, wind_speed_10m } = hourly;
    const { temperature_2m_max, temperature_2m_min, time: dailyTime } = daily;
    const { cloud_cover} = current;


    let feedback = '';

    if (cloud_cover < 20) {
        feedback = 'Sunny';
    } else if (cloud_cover >= 20 && cloud_cover < 80) {
        feedback = 'Partly Cloudy';
    } else {
        feedback = 'Overcast';
    }


    const forecast = dailyTime.slice(0, 5).map((date, index) => ({
        date,
        maxTemp: temperature_2m_max[index],
        minTemp: temperature_2m_min[index],
    }));

    const hourlyForecast = hourlyTime.slice(0, 5).map((dateTime, index) => ({
        dateTime,
        temperature: temperature_2m[index],
        windSpeed: (wind_speed_10m[index] * 3.6).toFixed(1), // Convert m/s to km/h
    }));

    return (
        <div className="weather-card">
            <div className='divider'>
                <div className="country-info">
                    <h1>{country}</h1>
                    <p>{current.time}</p>
                </div>
                <div className="weather-details">
                    <div className="main-deta">
                       <p>{current.temperature_2m} °C</p>
                       <p>{current.sunset}</p>
                       <p>{current.sunrise}</p>
                    </div>
                    <div className="weather-icon">
                        <img src={image} style={{width: '90px', height: '80px'}} alt="" />
                        <p>{feedback}</p>
                    </div>
                    <div className="extra-details">
                        <img src="" alt="" />
                        <p>{current.relative_humidity_2m} %</p>
                        <p>{(current.wind_speed_10m * 3.6).toFixed(1)} km/h</p> {/* Convert to km/h */}
                        <p>{current.weather_code}</p>
                    </div>
                </div>
            </div>
            <div className='divider'> 
            <div className="five-days-forecast">
                <h2>5-Day Weather Forecast</h2>
                <ul style={{listStyle: 'none'}}>
                    {forecast.map(({ date, maxTemp, minTemp }) => (
                        <li key={date}>
                            <img src={image} style={{width: '50px', height: '30px'}} alt="" />
                             {maxTemp}°C {date}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hourly-forecast">
                <h2>Hourly Forecast</h2>
                <ul>
                    {hourlyForecast.map(({ dateTime, temperature, windSpeed }) => (
                        <li key={dateTime} style={{display: 'inline-block', margin: '1rem'}}>
                            <img src={image} style={{width: '50px', height: '30px'}} alt="" />
                            {/* <p>{dateTime} </p> */}
                            <p>{temperature}°C</p>
                            <p>{windSpeed} km/h</p>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default WeatherCard;
