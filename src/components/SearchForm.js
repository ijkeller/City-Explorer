import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SearchForm extends Component {
    

    render() {
        return (
            <form onSubmit={this.props.submitHandler}>
                <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" onChange={() => this.props.changeHandler(target.value)} placeholder='Search Location' />
                </Form.Group>
                <Button variant="secondary" type="submit">Explore!</Button>
            </form>
        )
    }
}

export default SearchForm;