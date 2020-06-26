import React from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import './template.scss'

class Template extends React.Component {
    render() {
        return (
            <>
            <Header />
            <main className="fill">
                {this.props.children}
            </main>
            <Footer />
            </>
        )
    }
}

export default Template;