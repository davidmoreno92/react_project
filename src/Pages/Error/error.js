import React from 'react';
import { Link } from 'react-router-dom';

class Error extends React.Component {
    render() {
        return (
            <div className="main-wrapper">
                <div className="container">
                    <div className="textbox">
                        <div className="w-100 m-0-auto text-center pt-5">
                            <h2> Error 404 </h2>
                            <p className="pt-5"> 
                                <span> 
                                    Return to <Link className="text-primary" to="/">home</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;