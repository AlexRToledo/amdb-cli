import React, { Component } from 'react';
import DocumentManager from "../../../../../managers/DocumentManager/DocumentManager";
import DocumentModalComponent from "../DocumentModalComponent/DocumentModalComponent";
import FieldObjectsComponent from "../../../../../core/Components/FieldObjectsComponent/FieldObjectsComponent";
import IComponent from '../../../../../core/Components/IComponent/IComponent';

class CollectionDataComponent extends IComponent {
    constructor() {
        super();
        this.DocumentManager = new DocumentManager();
        this.state = {
          dataCollection: [],
          documentOpen: [],
          selectedDocument: '',
          createDModal: false
        };
    }

    async componentWillReceiveProps(newProps) {
        try {
            if(newProps.collection !== this.props.collection) {
                this.setState({documentOpen: []});
                if(newProps.collection !== "empty") {
                    let response = await this.DocumentManager.GetDocumentsByCollection(newProps.collection);
                    if(!response.error) {
                        this.setState({dataCollection: response.data});
                    }
                } else {
                    this.setState({dataCollection: []});
                }
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    async removeDocument(collection, key) {
        try {
            this.notify("Loading...", true);
            let response = await this.DocumentManager.DeleteDocument(collection, key);
            if(!response.error) {
                this.notify(response.message);
                let review = await this.DocumentManager.GetDocumentsByCollection(collection);
                if(!review.error) {
                    this.setState({dataCollection: review.data});
                }
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    editDocumentModal(document) {
        this.setState({type: 'edit'});
        this.setState({selectedDocument: JSON.stringify(document, null, '\t')});
        this.openModal();
    }

    openModal() {
        if(this.state.createDModal === true) {
            this.setState({createDModal: false})
        } else {
            this.setState({createDModal: true})
        }
    }

    expandDocument(key) {
        let aux = this.state.documentOpen;
        let index = aux.indexOf(key);
        if(index > -1) {
            aux.splice(index, 1);
        } else {
            aux.push(key);
        }
        this.setState({documentOpen: aux});
    }

    createDocumentModal() {
        this.setState({type: 'create'});
        this.openModal();
    }

    toggleOpened(key) {
        let index = this.state.documentOpen.indexOf(key);
        return index > -1;
    }

    async closeModalD(e) {
        try {
            this.setState({createDModal: false});
            if(e === true) {
                let response = await this.DocumentManager.GetDocumentsByCollection(this.props.collection);
                if(!response.error) {
                    this.setState({dataCollection: response.data});
                }
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    render() {
        const {dataCollection} = this.state;
        if(this.props.collection !== '') {
            return (
                <div className={'documents'}>
                    <h1 className={'subtitle'}>Data Collection - <strong>{this.props.collection}</strong>
                        <a onClick={() => this.createDocumentModal()}>
                            <span className={'icon has-text-primary'}>
                                <i className={'typcn typcn-plus'}></i>
                            </span>
                        </a>
                    </h1>
                    {dataCollection.map((document, key1) =>
                        <div className={'column document'} key={key1}>
                            <a className={'document-expand'} onClick={() => this.expandDocument(key1)}>
                                <span className={(this.toggleOpened(key1) ? 'icon has-text-danger' : 'icon has-text-info')}>
                                    <i className={(this.toggleOpened(key1) ? 'typcn typcn-zoom-out-outline' : 'typcn typcn-zoom-in-outline')}></i>
                                </span>
                            </a>
                            <strong>{'{'}</strong>
                            <ul className={'document-data ' + (this.toggleOpened(key1) ? 'is-opened' : '')}>
                                {Object.entries(document).map(([key, value]) => {
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
                                        if(typeof value === 'boolean') {
                                            return (
                                                <li key={key}>
                                                    <strong>{key}</strong>:&nbsp;
                                                    {value + ''}
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={key}>
                                                    <strong>{key}</strong>:&nbsp;
                                                    {value}
                                                </li>
                                            )
                                        }

                                    }
                                })}
                            </ul>
                            <strong className={'last-brace ' + (this.toggleOpened(key1) ? 'is-opened' : '')}>{'}'}</strong>
                            <a onClick={() => this.removeDocument(this.props.collection, document._id)}>
                                <span className={'icon has-text-danger'}>
                                    <i className={'typcn typcn-trash'}></i>
                                </span>
                            </a>
                            <a onClick={() => this.editDocumentModal(document)}>
                                <span className={'icon has-text-warning'}>
                                    <i className={'typcn typcn-edit'}></i>
                                </span>
                            </a>
                        </div>
                    )}
                    <DocumentModalComponent notify={this.props.notify} activeDM={this.state.createDModal} collection_name={this.props.collection} type={this.state.type} document={this.state.selectedDocument} activeFDM={this.closeModalD.bind(this)}/>
                </div>
            );
        } else {
            return (
                <div className={'documents'}>
                    <h1 className={'subtitle'}>Data Collection</h1>
                    <div className={'column'}>
                        <h4>No collection selected.</h4>
                    </div>
                </div>
            )
        }
    }

}

export default CollectionDataComponent;