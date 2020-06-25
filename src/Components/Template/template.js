import React from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';

class Template extends React.Component {
    render() {
        return (
            <>
            <Header />
            <main>
                {this.props.children}
            </main>
            <Footer />
            </>
        )
    }
}

export default Template;