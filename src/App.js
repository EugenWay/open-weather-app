import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
 
    state = {

        ip: '',
        time: 1,
        city: '',
        temperature: '',
        fetching: true

    }


    fetchWetherData = async ({city, ...data}) => {
        console.log(city)
        console.log(data)

        const id = `90063b78cbe9ba03b7a25507256ba316`
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`
        
        const response = await fetch(url)
        const waData = await response.json()

        console.log(waData)
        
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

        return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                App for know weather in your city - 
            </p>
            
            </header>
        </div>
        )
    } 
}

export default App;
