import React from "react";
import tempRound from "../helpers/tempRound";

class WeatherDetails extends React.Component {
    render() {
        const {
            temp,
            city,
            temp_min,
            temp_max,
            description,
            icon,
            humidity,
            wind
        } = this.props;

        return (
            <section className="weather-details">
                <div className="weather-details-temp">{Math.round(temp)}°</div>
                <div className="weather-details-city">{city}</div>
                <div className="weather-details-more">
                    <div className="weather-details-item icon">
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}.png`}
                            alt=""
                        />
                        <span>{description}</span>
                    </div>
                    <div className="weather-details-item">
                        min: {tempRound(temp_min)}
                    </div>
                    <div className="weather-details-item">
                        max: {tempRound(temp_max)}
                    </div>
                    <div className="weather-details-item">hum: {humidity}%</div>
                    <div className="weather-details-item">wind: {wind} m/s</div>
                </div>
            </section>
        );
    }
}

export default WeatherDetails;
