import React, { Component } from 'react';
// import SearchForm from './components/SearchForm';
import './App.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      text: '',
      mapLocation: {},
      mapUrl: '',
      displayName: '',
      lat: '',
      lon: '',
      error: false,
      errorMessage: '',
    }
  }

  // https://maps.locationiq.com/v3/staticmap?key=<YOUR_ACCESS_TOKEN>&center=17.450419,78.381149&size=600x600&zoom=14&path=fillcolor:%2390EE90|weight:2|color:blue|enc:}woiBkrk}Mb@iKtC`CEhBsD|C

  handleGetData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.text}&format=json`;
      let cityData = await axios.get(url);
      let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&size=700x900&zoom=14`;

      this.setState({
        mapLocation: cityData.data[0],
        mapUrl: mapurl,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        error: false,
        display: true,
        displayName: cityData.data[0].display_name.split(',')
      })
      
    } catch (error) {
      console.log(error)
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
      <div className="App">App
        <form>Form
          <label>Search Location
          <input type="text" onChange={this.onChange}/>
          </label>
          <button type="submit" onClick={this.handleGetData} >Explore!</button>
        </form>
        {
          this.state.display 
          ?
          <div>
            <img src={this.state.mapUrl} />
            <h3>{this.state.displayName}</h3>
            <h3>{this.state.mapLocation.lat}</h3>
            <h3>{this.state.mapLocation.lon}</h3>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default App;
