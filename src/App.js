import React, { Component } from "react";
import "./App.css";

import Preloader from "./components/Preloader";
import WeatherAppWrapper from "./components/WeatherAppWrapper";
import env from "./settings";

class App extends Component {
    constructor(props) {
        super(props);

        let bookmarks;
        localStorage.citis
            ? (bookmarks = JSON.parse(localStorage.citis))
            : (bookmarks = []);

        this.state = {
            time: new Date().getHours(),
            bookmarks: bookmarks,
            fetching: true
        };
    }

    fetchWeatherData = async (event, start_city) => {
        event && event.preventDefault();

        let city;
        event ? (city = event.target.elements.city.value) : (city = start_city);

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${env.weather_id}`;

        try {
            const response = await fetch(url);

            const data = await response.json();

            let utcTime = new Date().getUTCHours();
            let localTime = utcTime + data.timezone / 3600;

            if (localTime === 24) {
                localTime = 0;
            }

            if (localTime >= 25) {
                localTime = localTime - 24;
            }

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

    saveCity = () => {
        let citis = this.state.bookmarks;

        if (citis.includes(this.state.city)) {
            this.setState({
                error: "City allready exists in bookmarks"
            });
        } else {
            citis.push(this.state.city);
            localStorage.citis = JSON.stringify(citis);

            this.setState(
                {
                    bookmarks: citis
                },
                console.log(this.state.bookmarks)
            );
        }
    };

    deleteCity = event => {
        const city = event.target.dataset.city;
        let citis = this.state.bookmarks;

        const result = citis.filter(el => el.indexOf(city) === -1);
        localStorage.citis = JSON.stringify(result);

        this.setState(
            {
                bookmarks: result
            },

            console.log(`deleted ${city}`)
        );
    };

    fetchByBookmarks = event => {
        const city = event.target.dataset.city;
        console.log(city);

        this.fetchWeatherData(null, city);
    };

    componentDidMount() {
        fetch(`http://api.ipstack.com/check?access_key=${env.geoip_id}`)
            .then(response => response.json())
            .then(data => this.fetchWeatherData(null, data.city))
            .catch(error => error);
    }

    render() {
        let response;
        this.state.fetching
            ? (response = <Preloader time={this.state.time} />)
            : (response = (
                  <WeatherAppWrapper
                      data={this.state}
                      weatherMethod={this.fetchWeatherData}
                      saveMethod={this.saveCity}
                      bookmarkMethod={this.fetchByBookmarks}
                      deleteMethod={this.deleteCity}
                  />
              ));

        return response;
    }
}

export default App;
