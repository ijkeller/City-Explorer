import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import './App.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      location: '',
      mapData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleGetData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.location}&format=json`

      let cityData = await axios.get(url);

      this.setState({
        mapData: cityData.data.results[0],
        error: false
      })

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
    this.setState({ text: e })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ location: this.state.text })
  }

  render() {

    return (
      <div className="App">
        <SearchForm changeHandler={this.onChange} submitHandler={this.onSubmit} />
        {
          this.state.error ?
            <p>{this.state.errorMessage}</p> :
            <>
              <h3>{this.state.mapData.display_name}</h3>
              <h3>{this.state.mapData.latitude}</h3>
              <h3>{this.state.mapData.longitude}</h3>
            </>
        }
      </div>
    )
  }
}

export default App;
