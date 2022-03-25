import React, { useState, useEffect } from 'react';
import '../assets/style.css';
import WeatherDetails from './WeatherDetails';
import banner from '../img/banner.svg';
import bannerNight from '../img/banner-night.svg';
const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [weatherData, setWeatherdata] = useState({});
	const defaultValue = searchTerm ? searchTerm : 'Barcelona';
	const getTime = unixTime => {
		const convertTime = unixTime * 1000;
		const date = new Date(convertTime);
		const time = date.toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		return time;
	};
	const getWeatherInfo = async () => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultValue}&units=metric&appid=5ec058da87e5012975ef3a71ff6c9603`;
			let result = await fetch(url);
			let data = await result.json();
			const { temp, humidity, pressure, temp_max, temp_min } = data.main;
			const { name } = data;
			const { sunrise, sunset } = data.sys;
			const { main: weatherCondition, icon } = data.weather[0];
			const { speed, deg } = data.wind;
			const weatherObj = {
				temp,
				humidity,
				pressure,
				temp_max,
				temp_min,
				name,
				sunrise: getTime(sunrise),
				sunset: getTime(sunset),
				weatherCondition,
				icon: icon[2],
				speed,
				deg,
			};
			setWeatherdata(weatherObj);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getWeatherInfo();
	}, []);
	const onSubmitHandler = e => {
		e.preventDefault();
		console.log('onSubmitHandler', e);
	};
	return (
		<div
			className="container"
			style={
				weatherData.icon === 'd'
					? { backgroundImage:`url(${banner})` ,backgroundColor: '#95bef4' } 
					: { backgroundImage:`url(${bannerNight}` ,backgroundColor: '#494d52'}
			}
		>
			<form onSubmit={onSubmitHandler}>
				<div className="search">
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search by city"
						onChange={event => setSearchTerm(event.target.value)}
						value={searchTerm}
					/>
				</div>
				<div className="search--button--container">
					<button className="search--button info" onClick={getWeatherInfo}>
						Search
					</button>
				</div>
			</form>
			<WeatherDetails {...weatherData} />
			{/* {getWeatherData} */}
		</div>
	);
};

export default Search;
