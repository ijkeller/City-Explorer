import React, { Component } from 'react';
// import SearchForm from './components/SearchForm';
import './App.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      mapData: {},
      lat: '',
      lon: '',
      error: false,
      errorMessage: '',
    }
  }

  handleGetData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.text}&format=json`
      let cityData = await axios.get(url);

      this.setState({
        mapData: cityData.data[0],
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        error: false
      })
      console.log(this.state)

    } catch (error) {
      console.alert(error)
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
      </div>
    )
  }
}

export default App;
