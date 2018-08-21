import NotificationsComponent from "../NotificationsComponent/NotificationsComponent";
import Json from "../../Json/Json";
import React, {Component} from 'react';

class IComponent extends Component{
    constructor() {
        super();
        this.Notifications = new NotificationsComponent();
        this.Json = new Json();
    }

    notify(message, value = false) {
        this.props.notify(value);
        this.Notifications.Show(message);
    }

}

export default IComponent;