import React from 'react';
import { Form, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Trophy } from 'react-bootstrap-icons';
import './event-statistics.scss'

class EventStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameEvents: this.props.gameEvents
        };
    }

    render() {
        return (
            <div>
                Event statistics
            </div>
        )
    }
}


export default EventStatistics;