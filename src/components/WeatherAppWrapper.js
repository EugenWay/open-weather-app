import React, { Component } from "react";

import WeatherDetails from "./WeatherDetails";
import Hero from "./Hero";
import Form from "./Form";
import SeveCity from "./SaveCity";

export default class WeatherAppWrapper extends Component {
    render() {
        const data = this.props.data;

        return (
            <section className="App-wrapper" data-bg={data.time}>
                <WeatherDetails
                    city={data.city}
                    temp={data.temp}
                    temp_max={data.temp_max}
                    temp_min={data.temp_min}
                    description={data.description}
                    icon={data.icon}
                    wind={data.wind}
                    humidity={data.humidity}
                    bookmarks={data.bookmarks}
                    bookmarkMethod={this.props.bookmarkMethod}
                />
                <SeveCity saveCity={this.props.saveMethod} />
                <Hero localtime={data.time} city={data.city} />
                <Form
                    weatherMethod={this.props.weatherMethod}
                    error={data.error}
                />
            </section>
        );
    }
}
