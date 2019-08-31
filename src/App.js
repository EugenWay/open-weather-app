import React, { Component } from "react";
import "./App.css";
import Hero from "./components/Hero.js";
import WeatherDetails from "./components/WeatherDetails";
import Form from "./components/Form";

class App extends Component {
    state = {
        time: new Date().getHours(),
        city: "",
        temp: "",
        temp_max: "",
        temp_min: "",
        humidity: "",
        wind: "",
        description: "",
        icon: "",
        fetching: true,
        error: undefined
    };

    fetchWeatherData = async ({ city, ...geoData }) => {

        const id = `90063b78cbe9ba03b7a25507256ba316`;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`;

        try {
            const response = await fetch(url)
            const waData = await response.json()


            this.setState({
                city,
                temp: waData.main.temp,
                temp_max: waData.main.temp_max,
                temp_min: waData.main.temp_min,
                humidity: waData.main.humidity,
                wind: waData.wind.speed,
                description: waData.weather[0].description,
                icon: waData.weather[0].icon,
                fetching: false
            });


        } catch(err) {
            console.log(err)
            return err
        }

    };

    customFeching = async event => {
        event.preventDefault();
        const city = event.target.elements.city.value;

        const id = `90063b78cbe9ba03b7a25507256ba316`;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`;

        try {
            const response = await fetch(url);

            const data = await response.json();

            console.log(data)

            let utcTime = new Date().getUTCHours()
            console.log(utcTime)
            let localTime = utcTime + (data.timezone / 3600)
            console.log(localTime)
            
            this.setState({
                time: localTime,
                city,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                fetching: false,
                error: undefined
            });

        } catch (err) {
            this.setState({
                error: "Can't find this city. Please try again"
            });
            return err;
        }
    };

    componentDidMount() {
        this.fetchIP();
    }

    fetchIP = () => {
        const apiKey = `6fb5855a4485fc870344d7200a3747b1`;

        fetch(`http://api.ipstack.com/check?access_key=${apiKey}`)
            .then(response => response.json())
            .then(data => this.fetchWeatherData(data));
    };

    render() {
        const { 
            time, 
            city, 
            temp,
            temp_max,
            temp_min,
            wind,
            humidity,
            description,
            icon,
            fetching,
            error } = this.state;

        return fetching ? (
            <section className="App-wrapper" data-bg={time}>
                <div className="waiting">Loading...</div>
            </section>
        ) : (
            <section className="App-wrapper" data-bg={time}>
                <WeatherDetails 
                    city={city}
                    temp={temp} 
                    temp_max={temp_max} 
                    temp_min={temp_min} 
                    description={description} 
                    icon={icon}
                    wind={wind}
                    humidity={humidity}
                />
                <Hero localtime={time} />
                <Form weatherMetod={this.customFeching} error={error}/>
            </section>
        );
    }
}

export default App;
