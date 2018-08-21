import React from 'react';

import CollectionManager from "../../../../../managers/CollectionManager/CollectionManager";
import IComponent from '../../../../../core/Components/IComponent/IComponent';

class CollectionCreateModalComponent extends IComponent {

    constructor() {
        super();
        this.CollectionManager = new CollectionManager();
        this.state = {
            active: false,
            name: '',
            oldname: '',
            formAction: 'Create'
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({active: newProps.active});
        this.setState({name: ''});
        if(newProps.type !== 'create') {
            this.setState({name: newProps.collection_name});
            this.setState({formAction: 'Rename'});
        } else {
            this.setState({formAction: 'Create'});
            this.setState({name: ''});
        }
        this.setState({oldname: newProps.collection_name});
    }

    closeModal() {
        this.setState({active: false});
        this.setState({name: ''});
        this.props.activeF(false);
    }

    handleFields(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async onSubmit(event) {
        try {
            event.preventDefault();
            this.notify("Loading...", true);
            let response;
            if(this.props.type !== null && this.props.type !== undefined) {
                if(this.props.type === 'create') {
                    response = await this.CollectionManager.CreateCollection(this.state.name);
                } else {
                    response = await this.CollectionManager.RenameCollection(this.state.oldname, this.state.name);
                }
            }
            if(!response.error) {
                this.props.activeF(true);
            }else {
                this.props.activeF(false);
            }
            this.setState({
                name: ''
            });
            this.notify(response.message);
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    render() {
        return (
            <div id="collectionModal" className={(this.state.active ? 'modal is-active' : 'modal')}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.state.formAction} Collection</p>
                        <button className="delete" aria-label="close" onClick={() => this.closeModal()}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="name" placeholder="Collection name" value={this.state.name} onChange={this.handleFields.bind(this)} required/>
                                </div>
                                <p className="help">This field is required</p>
                            </div>
                            <div className="field is-grouped is-grouped-right">
                                <p className="control">
                                    <button type="submit" className="button is-primary" value={this.state.formAction}>{this.state.formAction}</button>
                                </p>
                                <p className="control">
                                    <a className="button is-light" onClick={() => this.closeModal()}>Cancel</a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default CollectionCreateModalComponent;