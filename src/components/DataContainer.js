import React from 'react';
import Weather from './Weather.js';
import Movies from './Movies.js';
import { Container } from 'react-bootstrap';


class DataContainer extends React.Component {




    render() {

        let weatherData = this.props.weatherData
        let moviesData = this.props.moviesData

        return (

            <Container>
                {
                    weatherData.map(dayForecast => {
                        return <Weather
                            key={dayForecast.date}
                            date={dayForecast.date}
                            icon={dayForecast.icon}
                            description={dayForecast.description}
                            high_temp={dayForecast.high_temp}
                            low_temp={dayForecast.low_temp}
                            precip={dayForecast.precip}
                        />
                    })
                }
                {
                    moviesData.map(movie => {
                        return <Movies
                            key={movie.id}
                            title={movie.title}
                            release_date={movie.release_date}
                            poster={movie.poster}
                            backdrop={movie.backdrop}
                        />
                    })
                }
            </Container>
        )
    }
}

export default DataContainer