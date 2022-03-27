import React, { useState, useEffect } from 'react';

const WeatherDetails = ({
	temp,
	humidity,
	pressure,
	temp_max,
	temp_min,
	name,
	sunrise,
	sunset,
	weatherCondition,
	icon,
	speed,
	deg,
}) => {
	const [weatherState, setWeatherState] = useState('');

	useEffect(() => {
		if (weatherCondition) {
			switch (weatherCondition) {
				case 'Clouds':
					setWeatherState('wi-day-cloudy');
					break;
				case 'Haze':
					setWeatherState('wi-fog');
					break;
				case 'Clear':
					setWeatherState('wi-day-sunny');
					break;
				case 'Mist':
					setWeatherState('wi-dust');
					break;
				default:
					setWeatherState('wi-day-sunny');
					break;
			}
		}
	}, [weatherCondition]);
	return (
		<div
			className="weather--details--container"
			style={{
				background:
					`${icon}` === 'd'
						? `linear-gradient(
            90deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(75, 81, 189, 0.63) 40%,
            rgba(0, 212, 255, 1) 100%
        )`
						: `linear-gradient(90deg,
        rgb(0, 0, 0) 0%,
        rgba(106, 107, 124, 0.63) 40%,
        rgb(97, 101, 102) 100%`,
			}}
		>
			<div className="weather--icon--container">
				<i className={`wi ${weatherState}`}></i>.
			</div>
			<div className="weather--info">
				<div className="temperature">
					<span>{temp} &deg;</span>
				</div>
				<div className="description">
					<div className="weather-condition">{weatherCondition}</div>
					<div className="place">{name}</div>
				</div>
			</div>
			<div className="date">{new Date().toLocaleString()}</div>
			<div className="extra-temp--info">
				<div className="weather--max--min">
					<div className="two-side-section">
						<p>
							<i className={'wi wi-sunset'}></i>
						</p>
						<p className="extra--info--left-side">
							{sunset}
							<br />
							Sunset
						</p>
					</div>
				</div>

				<div className="weather--max--min">
					<div className="two-side-section">
						<p>
							<i className={'wi wi-humidity'}></i>
						</p>
						<p className="extra--info--left-side">
							{humidity}
							<br />
							Humidity
						</p>
					</div>
				</div>
				<div className="weather--max--min">
					<div className="two-side-section">
						<p>
							<i className={'wi wi-rain'}></i>
						</p>
						<p className="extra--info--left-side">
							{pressure}
							<br />
							Presuure
						</p>
					</div>
				</div>
				<div className="weather--max--min">
					<div className="two-side-section">
						<p>
							<i className={'wi wi-strong-wind'}></i>
						</p>
						<p className="extra--info--left-side">
							{speed}
							<br />
							Speed
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherDetails;
