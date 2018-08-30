import React from 'react';

import DocumentManager from "../../../../../managers/DocumentManager/DocumentManager";
import IComponent from '../../../../../core/Components/IComponent/IComponent';

class DocumentModalComponent extends IComponent{

    constructor() {
        super();
        this.DocumentManager = new DocumentManager();
        this.state = {
            activeDM: false,
            document: '',
            formAction: 'Create'
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({activeDM: newProps.activeDM});
        this.setState({document: newProps.document});
        this.setState({oldocument: newProps.document});
        if(newProps.type === 'create') {
            this.setState({formAction: 'Create'});
            this.setState({document: ''});
        } else {
            this.setState({formAction: 'Edit'});
        }
    }

    closeModalD() {
        this.setState({activeDM: false});
        this.setState({document: ''});
        this.props.activeFDM(false);
    }

    async onSubmit(event) {
        try {
            event.preventDefault();
            this.notify("Loading...", true);
            let response;
            if(this.Json.validate(this.state.document)) {
                if(this.props.type !== null && this.props.type !== undefined) {
                    if(this.props.type === 'create') {
                        response = await this.DocumentManager.CreateDocument(this.props.collection_name, this.state.document);
                    } else {
                        response = await this.DocumentManager.EditDocument(this.props.collection_name, this.state.document, JSON.parse(this.state.document)._id);
                    }
                }
                if(!response.error) {
                    this.props.activeFDM(true);
                }else {
                    this.props.activeFDM(false);
                }
                this.setState({
                    document: ''
                });
                this.notify(response.message);
            } else {
                this.notify("No valid json document.");
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    render() {
        return (
            <div id="documentModal" className={(this.state.activeDM ? 'modal is-active' : 'modal')}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.state.formAction} Document</p>
                        <button className="delete" aria-label="close" onClick={() => this.closeModalD()}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="field">
                                <label className="label">Document</label>
                                <div className="control">
                                    <textarea className="textarea" name="document" placeholder='e.g { "name": "John", "lastname": "Snow"}' value={this.state.document} onChange={this.handleFields.bind(this)} rows="20" required/>
                                </div>
                                <p className="help">This field is required</p>
                            </div>
                            <div className="field is-grouped is-grouped-right">
                                <p className="control">
                                    <button type="submit" className="button is-primary" value={this.state.formAction}>{this.state.formAction}</button>
                                </p>
                                <p className="control">
                                    <a className="button is-light" onClick={() => this.closeModalD()}>Cancel</a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default DocumentModalComponent;