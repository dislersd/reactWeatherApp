import React from "react";
import Titles from "./components/Titles";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "38137445bf638664cef728f642857ddd";


class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""

    });
  } else {
    this.setState ({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      })
  }
};

render() {
    return (
      <div>
          <div class="wrapper">
            <div class="main">
              <div class="container">
                <div class="row">
                  <div class="title-container">
                    
                    <Titles />
                    
                  </div>
                  <div class="form-container">
                    
                    <Form getWeather={this.getWeather}/>
                    <Weather 
                      temperature = {this.state.temperature}
                      city = {this.state.city}
                      country = {this.state.country}yan
                      humidity = {this.state.humidity}
                      description = {this.state.description}
                      error = {this.state.error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      
    );
  }
};


export default App;