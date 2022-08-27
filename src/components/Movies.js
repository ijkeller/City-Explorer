import React from 'react';

class Movies extends React.Component {

    render() {
        return (
            <>
                <h3>{this.props.title}</h3>
                <img src={this.props.poster} />
                <p>{this.props.release_date}</p>
            </>
        )
    }
}

export default Movies;