import React from 'react';
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {

    render() {
        return (
            <Card style={{ display: 'inline-block', padding: '0 .5rem', width: '3.8rem', background: 'rgba(255, 255, 255, 0.8)', }} className='weather-card'>
                <p className='weather-date' >{(this.props.date).slice(5)}</p>
                <img className='weather-image' src={this.props.icon} alt={`${this.props.description} weather icon`} style={{ width: '2.5rem', }} />
                <p className='weather-description' style={{ font: '1rem' }} >{this.props.description}</p>
                <p className='high' >High: {this.props.high_temp}</p>
                <p className='low' >Low: {this.props.low_temp}</p>
                <p className='precip' >💧: {this.props.precip}</p>
            </Card>
        )
    }
}

export default Weather;