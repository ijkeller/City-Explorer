import React from 'react';

class Weather extends React.Component {

    render() {
        return (
            <>
                <p>{this.props.date}</p>
                <img src={this.props.icon} />
                <p>{this.props.description}</p>
                <p>{this.props.high_temp}</p>
                <p>{this.props.low_temp}</p>
                <p>{this.props.precip}</p>
            </>
        )
    }
}

export default Weather;