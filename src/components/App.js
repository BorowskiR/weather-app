import React, {Component} from 'react';
import './App.css';
import Form from './Form'
import Result from './Result'

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    err: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = (e) => {
    e.preventDefault()
    //console.log("potwierdzony formularz")
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=f5b39ff1990cc61875506cfc86689838&units=metric`;

    fetch(API)
    .then(response => {
      if(response.ok) {
        return response 
      }
      throw Error("nie udało sie")
    })
    .then(response => response.json())
    .then(result => {
      const time = new Date().toLocaleString()
      this.setState(prevState => ({ //funkcja ktora zwraca obiekt
        err: false,
        date: time,
        city: this.state.value,
        sunrise: result.sys.sunrise,
        sunset: result.sys.sunset,
        temp: result.main.temp,
        wind: result.wind.speed,
        pressure: result.main.pressure,
      }))
    })
    .catch(err => {
      this.setState(prevState => ({
        err: true,
        city: prevState.value
      }))
    })
  }

  render() {
  return (
    <div className="App">
      <Form value={this.state.value}
      change={this.handleInputChange}
      submit={this.handleCitySubmit}/>
      <Result weather={this.state}/>
    </div>
  );
}
}

export default App;
