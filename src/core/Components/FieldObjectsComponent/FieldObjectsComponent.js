import React, { Component } from 'react';

class FieldObjectsComponent extends Component{

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.setState({data: this.props.data_field});
    }


    render() {
        return(
            <div>
                {Object.entries(this.state.data).map(([key, value]) => {
                    if(typeof value === 'object' && value !== null) {
                        return(
                            <li key={key}>
                                <strong>{key}</strong>:&nbsp;
                                <strong>{'{'}</strong>
                                    <ul>
                                        <FieldObjectsComponent data_field={value}/>
                                    </ul>
                                <strong>{'}'}</strong>
                            </li>
                        )
                    } else {
                        return typeof value === 'boolean' ? (
                            <li key={key}>
                                <strong>{key}</strong>:&nbsp;
                                {value + ''}
                            </li>
                        ) : (
                            <li key={key}>
                                <strong>{key}</strong>:&nbsp;
                                {value}
                            </li>
                        );
                    }
                })}
            </div>
        )
    }

}

export default FieldObjectsComponent;