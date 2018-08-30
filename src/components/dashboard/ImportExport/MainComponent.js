import React, { Component } from 'react';
import NotificationsComponent from "../../../core/Components/NotificationsComponent/NotificationsComponent";
import ImportComponent from "./components/ImportComponent/ImportComponent";
import ExportComponent from "./components/ExportComponent/ExportComponent";

class MainComponent extends Component {
    constructor() {
        super();
        this.state = {
            typeNotify: false,
            active: ''
        };

        this.changeType = this.changeType.bind(this);
    }

    changeType(value) {
        this.setState({
            typeNotify: value
        });
    }

    handleSelectActive(value) {
        this.setState({active: value});
    }

    render() {
        return(
            <div className={'import-export'}>
                {this.state.active === 'import' ? (
                        <div className={'view-import'}>
                            <div className={'arrow-back'}>
                                <a onClick={() => this.handleSelectActive('')}>
                                    <i className={'typcn typcn-arrow-left'}></i>
                                </a>
                            </div>
                            <ImportComponent notify={this.changeType}/>
                        </div>
                    ) :
                    this.state.active === 'export' ? (
                            <div className={'view-export'}>
                                <div className={'arrow-back'}>
                                    <a onClick={() => this.handleSelectActive('')}>
                                        <i className={'typcn typcn-arrow-left'}></i>
                                    </a>
                                </div>
                                <ExportComponent notify={this.changeType}/>
                            </div>
                        ) :
                        <div className={'selection'}>
                            <div className={'column is-12'}>
                                <h1 className={'subtitle'}>Please select an option:</h1>
                            </div>
                            <div className={'columns'}>
                                <div className={'column is-6 has-text-centered'}>
                                    <a onClick={() => this.handleSelectActive('import')}>
                                        <div className={'select-import'}>
                                        <span className={'icon is-large'}>
                                            <i className={'typcn typcn-cloud-storage-outline'}></i>
                                        </span>
                                            <h1>
                                                Import
                                            </h1>
                                        </div>
                                    </a>
                                </div>
                                <div className={'column is-6 has-text-centered'}>
                                    <a onClick={() => this.handleSelectActive('export')}>
                                        <div className={'select-export'}>
                                        <span className={'icon is-large'}>
                                            <i className={'typcn typcn-export-outline'}></i>
                                        </span>
                                            <h1>

                                                Export
                                            </h1>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                }
                <NotificationsComponent typeNotify={this.state.typeNotify}/>
            </div>
        );
    }
}

export default MainComponent;