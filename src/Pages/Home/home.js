import React from 'react';
import './home.scss'
import userIcon from "../../Assets/images/media/user_icon.svg"
import manImage from "../../Assets/images/media/man_image.svg"
import AuthService from "../../Services/auth-service";

class Home extends React.Component {
    constructor() {
        super();
        this.state = { username: ''};
    }

    async componentDidMount() {
        await (AuthService.getUserName()).then( user => {
           this.setState({ username: user.username });
        });
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="container">
                    <div className="textbox">
                        <div className="columnaIzq">
                            <img className="user-img" alt="user icon" src={userIcon}/>
                            <p>
                                <b>BIENVENIDO</b> <br></br> {this.state.username} 
                            </p>
                        </div>
                        <div className="man">
                            <img src={manImage} alt="welcome" width="470px" align="right" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;