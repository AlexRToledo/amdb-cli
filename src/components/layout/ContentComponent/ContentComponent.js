import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CRUDCollections from '../../dashboard/CRUDCollections/MainComponent';
import ImportExport from '../../dashboard/ImportExport/MainComponent';
import Utilities from '../../dashboard/Utilities/MainComponent';

class ContentComponent extends Component{
    render() {
        return (
            <section className={'hero'}>
                <div className={'hero-body'}>
                    <div className={'container'}>
                        <h1 className={'title'}>AMDB Dashboard</h1>
                        <Switch>
                            <Route exact path='/collections' component={CRUDCollections} />
                            <Route exact path='/import-export' component={ImportExport} />
                            <Route exact path='/utils' component={Utilities} />
                        </Switch>
                    </div>
                </div>
            </section>
        );
    }
}

export default ContentComponent;