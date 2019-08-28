import React from 'react'


class WeatherDetails extends React.Component {

    render() {
        const { temperature, city } = this.props

        return (
            <section className="weather-details">
                  <p className="weather-details-temp">{ Math.round(temperature) }°</p> 
                  <p className="weather-details-city">{ city }</p>
            </section>
            
        )
    }
}

export default WeatherDetails