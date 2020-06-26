import React from 'react';
import {Form, Button} from 'react-bootstrap';
import './event-list.scss'

class EventList extends React.Component {
    render() {
        return (
            <div className="main-wrapper">
            <div className="container">
                <div className="content-box mx-auto mt-4">
                    <Form className="p-4">
                        <h2>Event Management</h2>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </div>
            </div>
        </div>
        )
    }
}


export default EventList;