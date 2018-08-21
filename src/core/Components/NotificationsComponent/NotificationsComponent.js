import React, { Component } from 'react';

import {MDCSnackbar} from '@material/snackbar';

class NotificationsComponent extends Component{

    constructor() {
        super();
        this.state = {
          typeNotify: false
        };
    }

    async componentWillReceiveProps(newProps) {
        if(newProps.typeNotify !== this.props.typeNotify) {
            console.log(newProps.typeNotify !== this.props.typeNotify);
            this.setState({typeNotify: newProps.typeNotify});
        }
    }

    Show(message, action = 'X') {
        const snackbar =  new MDCSnackbar(document.querySelector('.mdc-snackbar'));
        let dataObj = {
            message: message,
            actionText: action,
            actionHandler: function () {
                console.log('my cool function');
            }
        };

        if(this.state.typeNotify === true) {
            dataObj.actionText = ' ';
        }
        snackbar.show(dataObj);
    }

    render() {
        return(
            <div className="mdc-snackbar mdc-snackbar--align-start"
                 aria-live="assertive"
                 aria-atomic="true"
                 aria-hidden="true">
                <div className="mdc-snackbar__text"></div>
                <div className="mdc-snackbar__action-wrapper">
                    { this.state.typeNotify === false ? (
                        <button type="button" className={'mdc-snackbar__action-button'}></button>
                    ): (
                        <button className={'mdc-snackbar__action-button button is-loading'}></button>
                    )}
                </div>
            </div>
        )
    }

}

export default NotificationsComponent;