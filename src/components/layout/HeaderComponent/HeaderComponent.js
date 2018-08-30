import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    constructor() {
        super();
        this.state = {
            active: null,
            routes: [
                {to: '/collections', name: 'Collections'},
                {to: '/import-export', name: 'Import/Export'},
                {to: '/utils', name: 'Utility'}
            ]
        };
    }

    handlerActive(index) {
        this.setState({active: index});
    }

    verifyActive(index) {
        return this.state.active === index;
    }

    render() {
        return (
            <nav className="navbar" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className={'navbar-item'}>
                        AMDB
                    </div>
                </div>
                <div className="navbar-menu">
                    {this.state.routes.map((element, index) =>
                        <Link key={index} className={'navbar-item ' + (this.verifyActive(index) ? 'link-active' : '')} to={element.to} onClick={() => this.handlerActive(index)}>{element.name}</Link>,
                    )}
                </div>
            </nav>
        );
    }
}

export default HeaderComponent;