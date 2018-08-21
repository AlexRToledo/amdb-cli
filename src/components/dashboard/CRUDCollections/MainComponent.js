import React from 'react';

import CollectionDataComponent from "./components/CollectionDataComponent/CollectionDataComponent";
import CollectionCreateModalComponent from "./components/CollectionModalComponent/CollectionModalComponent";
import CollectionManager from "../../../managers/CollectionManager/CollectionManager";
import NotificationsComponent from "../../../core/Components/NotificationsComponent/NotificationsComponent";
import IComponent from "../../../core/Components/IComponent/IComponent";


class MainComponent extends IComponent{
    constructor() {
        super();
        this.CollectionManager = new CollectionManager();
        this.state = {
            collections: [],
            collectionActive: '',
            createCModal: false,
            typeNotify: false
        };

        this.changeType = this.changeType.bind(this);
    }

    changeType(value) {
        this.setState({
            typeNotify: value
        });
    }

    notify(message, value = false) {
        this.Notifications.Show(message);
    }

    async componentWillMount() {
        try {
            let response = await this.CollectionManager.GetAllCollections();
            if(!response.error) {
                this.setState({collections: response.data});
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    };

    selectCollection(name, index) {
        this.setState({collectionActive: name});
        this.setState({collectionActiveIndex: index});
    }

    setActive(index) {
        return this.state.collectionActiveIndex === index;
    }

    async dropCollection(name, index) {
        try {
            this.notify("Loading...", true);
            let response = await this.CollectionManager.DropCollection(name);
            if(!response.error) {
                this.state.collections.map((collection, key) => {
                    if(key === index) {
                        delete this.state.collections[index];
                    }
                });
                this.setState({collections: this.state.collections});
                this.Notifications.Show(response.message);
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    async clearCollection(name, index) {
        try {
            this.notify("Loading...", true);
            let response = await this.CollectionManager.ClearCollection(name);
            if(!response.error) {
                this.setState({collectionActive: "empty"});
                this.setState({collectionActiveIndex: index});
                this.Notifications.Show(response.message);
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    createCollectionModal() {
        this.setState({type: 'create'});
        if(this.state.createCModal === true) {
            this.setState({createCModal: false})
        } else {
            this.setState({createCModal: true})
        }
    }

    renameCollection(name, index) {
        this.setState({collectionActive: name});
        this.setState({type: 'edit'});
        if(this.state.createCModal === true) {
            this.setState({createCModal: false})
        } else {
            this.setState({createCModal: true})
        }
    }

    async closeModal(e) {
        this.setState({createCModal: false});
        if(e === true) {
            let response = await this.CollectionManager.GetAllCollections();
            if(!response.error) {
                this.setState({collections: response.data});
            }
        }
    }

    render() {
        const { collections } = this.state;
        return (
            <div className={'manage'}>
                <h1 className={'subtitle'}>Collections Management</h1>
                <div className={'columns'}>
                    <div className={'column is-3'}>
                        <div className={'menu-left'}>
                            <h1 className={'subtitle'}>
                                Collections
                                <a onClick={() => this.createCollectionModal()}>
                            <span className={'icon has-text-primary'}>
                                <i className={'typcn typcn-plus'}></i>
                            </span>
                                </a>
                            </h1>
                            <ul className={'collection-list'}>
                                {collections.map((collection, index) =>
                                    <li className={'collection'} key={index}>
                                        <div className="dropdown is-hoverable">
                                            <div className="dropdown-trigger">
                                                <a className="gear" aria-haspopup="true" aria-controls="dropdown-menu4">
                                            <span className="icon">
                                                <i className="typcn typcn-cog-outline" aria-hidden="true"></i>
                                            </span>
                                                </a>
                                            </div>
                                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                                <div className="dropdown-content">
                                                    <div className="dropdown-item">
                                                        <a className={'dropdown-item'} onClick={() => this.dropCollection(collection.name, index)}>
                                                    <span className={'icon has-text-danger'}>
                                                        <i className={'typcn typcn-trash'}></i>
                                                    </span>
                                                            Drop Collection
                                                        </a>
                                                        <a className={'dropdown-item'} onClick={() => this.clearCollection(collection.name, index)}>
                                                    <span className={'icon has-text-info'}>
                                                        <i className={'typcn typcn-arrow-loop'}></i>
                                                    </span>
                                                            Clear Collection
                                                        </a>
                                                        <a className={'dropdown-item'} onClick={() => this.renameCollection(collection.name, index)}>
                                                    <span className={'icon has-text-warning'}>
                                                        <i className={'typcn typcn-edit'}></i>
                                                    </span>
                                                            Rename Collection
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a onClick={() => this.selectCollection(collection.name, index)} className={(this.setActive(index) ? 'is-active' : '')}>
                                            {collection.name}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={'column is-10'}>
                        <div className={'data-right'}>
                            <CollectionDataComponent notify={this.changeType} collection={this.state.collectionActive}/>
                        </div>
                    </div>
                    <CollectionCreateModalComponent notify={this.changeType} active={this.state.createCModal} type={this.state.type} collection_name={this.state.collectionActive} activeF={this.closeModal.bind(this)}/>
                    <NotificationsComponent typeNotify={this.state.typeNotify}/>
                </div>
            </div>
        );
    }
}

export default MainComponent;