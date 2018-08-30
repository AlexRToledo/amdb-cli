import React, {Component} from 'react';
import BcryptComponent from './components/BcryptComponent';
import NotificationsComponent from "../../../core/Components/NotificationsComponent/NotificationsComponent";

class MainComponent extends Component{
    constructor() {
        super();
        this.state = {
            typeNotify: false
        };
        this.changeType = this.changeType.bind(this);
    }

    changeType(value) {
        this.setState({
            typeNotify: value
        });
    }

    render() {
        return(
            <div className={'utilities'}>
                <BcryptComponent notify={this.changeType}/>
                <NotificationsComponent typeNotify={this.state.typeNotify}/>
            </div>
        )
    }
}

export default MainComponent;