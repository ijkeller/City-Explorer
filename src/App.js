import React, { Component } from 'react';
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';
import DataContainer from './components/DataContainer';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      text: '',
      mapLocation: {},
      mapUrl: '',
      weatherUrl: '',
      weatherData: {},
      moviesUrl: '',
      moviesData: {},
      displayName: '',
      lat: '',
      lon: '',
      error: false,
      errorMessage: '',
    }
  }

  handleGetData = async (e) => {
    e.preventDefault();
    try {
      let LAB = process.env.REACT_APP_LAB_SERVER;
      let DEPLOYED = process.env.REACT_APP_DEPLOYED_SERVER;
      let ACTIVE_SERVER =
        // LAB
        DEPLOYED
        ;


      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.text}&format=json`;
      let cityData = await axios.get(url);
      let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&size=${window.innerWidth}x${window.innerHeight}&zoom=14`;
      let weatherUrl = `${ACTIVE_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`
      let moviesUrl = `${ACTIVE_SERVER}/movies?search=${this.state.text}`

      let servers = {
        lab: LAB,
        deployed: DEPLOYED,
        active: ACTIVE_SERVER,
      }
      console.table(servers)
      console.log(weatherUrl)
      console.log(moviesUrl)

      let weatherData = await axios.get(weatherUrl)
      let moviesData = await axios.get(moviesUrl)

      this.setState({
        mapLocation: cityData.data[0],
        mapUrl: mapurl,
        weatherUrl: weatherUrl,
        weatherData: weatherData.data,
        moviesUrl: moviesUrl,
        moviesData: moviesData.data,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        error: false,
        display: true,
        displayName: cityData.data[0].display_name
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `Error Occured: ${error.message}`
      })
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ text: e.target.value })
  }

  
  render() {
    return (
      <div className="App">
        <form className='form'>
          <label>Search Location: </label>
          <input type="text" onChange={this.onChange} />
          <button type="submit" onClick={this.handleGetData} >Explore!</button>
        </form>

        {
          this.state.display
            ?
            <>
              <Image fluid className='map' src={this.state.mapUrl} />
              <div className='displayName' >
                <h3>{this.state.displayName}</h3>
              </div>
              <DataContainer className='container'
                weatherData={this.state.weatherData}
                moviesData={this.state.moviesData} />
              <div>
                <ul> {this.state.weatherData[0].date} </ul>
              </div>

            </>
            :
            null
        }
        {
          this.state.error
            ?
            <Alert key='danger' variant='danger' className='error'>
              {this.state.errorMessage}
            </Alert>
            :
            null
        }
      </div>
    )
  }
}

export default App;
