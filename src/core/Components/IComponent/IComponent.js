import NotificationsComponent from "../NotificationsComponent/NotificationsComponent";
import Json from "../../Json/Json";
import  {Component} from 'react';

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

    handleFields(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

}

export default IComponent;