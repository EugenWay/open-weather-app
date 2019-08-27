import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
 
    state = {

        ip: "",
        time: "",
        city: "",
        temperature: "",
        fetching: true

    }


    fetchWetherData = async ({city, ...data}) => {

        const id = `90063b78cbe9ba03b7a25507256ba316`
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`
        
        fetch(url)
            .then(response => response.json())
            .then(waData => {

                const date = new Date()
                const time = date.getHours()

                this.setState({
                        ip: data.ip,
                        time,
                        city,
                        temperature: waData.main.temp,
                        fetching: false
                    })
                
            })

        
    }

    componentDidMount() {
        this.fetchIP()
    }

    fetchIP = () => {
        const apiKey = `6fb5855a4485fc870344d7200a3747b1`

        fetch(`http://api.ipstack.com/check?access_key=${apiKey}`)
                .then(response => response.json())
                .then(data => this.fetchWetherData(data))
        
    }

    render() {
        
        const { ip, time, city, temperature, fetching } = this.state

        return  fetching ? 
            <div className="waiting">Loading...</div>
            :
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>App for know weather in your city</h1>
                    <p>Your city is { city }</p>
                    <p>Now it's { time } o'clock and { temperature }С°</p>
                    <small>{ ip }</small>     
                </header>
            </div>

    } 
}

export default App;
