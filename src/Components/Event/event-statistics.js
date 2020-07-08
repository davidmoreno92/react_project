import React from 'react';
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