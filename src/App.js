import React, { Component } from 'react';
import './App.css';
import Hero from './components/Hero.js'
import WeatherDetails from './components/WeatherDetails'
import Form from './components/Form'



class App extends Component {
 
    state = {

        time: "",
        city: "",
        temperature: "",
        fetching: true,
        error: undefined

    }


    fetchWetherData = async ({city, ...geoData}) => {
        console.log(city)
        console.log(geoData)

        const id = `90063b78cbe9ba03b7a25507256ba316`
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`
        
        fetch(url)
            .then(response => response.json())
            .then(waData => {

                const date = new Date()
                const time = date.getHours()

                console.log(waData)
                
                this.setState({
                        time,
                        city,
                        temperature: waData.main.temp,
                        fetching: false
                    })
                
            })
 
    }

    customFeching = async (event) => {

        event.preventDefault()
        const city = event.target.elements.city.value

        const id = `90063b78cbe9ba03b7a25507256ba316`
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`
       
        try {
            const response = await fetch(url)
            const data = await response.json()

            this.setState({
                city,
                temperature: data.main.temp,
                fetching: false
            })
        } catch(err) {

            console.log(err)
            this.setState({
                error: 'Cant find this city. Please try agan'
            })
            return err
        }

        
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
        
        const { time, city, temperature, fetching, error } = this.state
      

        return  fetching ? 

                <section className="App-wrapper" data-bg={time}>
                    <div className="waiting">Loading...</div>
                </section>   
            :
                <section className="App-wrapper" data-bg={time}>

                    <WeatherDetails city={city} temperature={temperature} />
                    <Hero localtime={time} />
                    <Form weatherMetod={this.customFeching} error={error}/>
                   
                </section>

    } 
}

export default App;
