import React from 'react';

class Weather extends React.Component {

    render() {
        return (
            <>
                <p>{this.props.date}</p>
                <img src={this.props.icon} alt={`${this.props.description} weather icon`} />
                <p>{this.props.description}</p>
                <p>High: {this.props.high_temp}</p>
                <p>Low: {this.props.low_temp}</p>
                <p>💧: {this.props.precip}</p>
            </>
        )
    }
}

export default Weather;