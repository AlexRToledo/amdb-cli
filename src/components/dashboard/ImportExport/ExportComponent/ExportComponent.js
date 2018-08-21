import React from 'react';
import IComponent from "../../../../core/Components/IComponent/IComponent";
import ImportExportManager from "../../../../managers/ImportExportManager/ImportExportManager";
import CollectionManager from "../../../../managers/CollectionManager/CollectionManager";
import FileDownload from '../../../../core/FileDownload/FileDownload';

class ExportComponent extends IComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            collections: []
        };

        this.fileDownload = new FileDownload();
        this.IEManager = new ImportExportManager();
        this.CollectionManager = new CollectionManager();
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await this.CollectionManager.GetAllCollections();
            if(!response.error) {
                this.setState({collections: response.data});
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    handleSelectCollections(event) {
        let aux = this.state.data;
        if(event.target.checked === true) {
            aux.push(event.target.name);
        } else {
            let index = aux.indexOf(event.target.name);
            aux.splice(index, 1);
            console.log(aux)
        }
        this.setState({data: aux});
    }


    async onSubmit(event) {
        try {
            event.preventDefault();
            this.notify("Loading...", true);
            let response;
            if(this.state.data.length > 0) {
                response = await this.IEManager.ExportData(this.state.data);
                if(response.error === false) {
                    this.fileDownload.Download(JSON.stringify(response.data), 'database.json');
                    this.setState({data: []});
                    document.getElementById("exportForm").reset();
                    this.notify('Export data successful.');
                } else {
                    this.notify(response.message);
                }
            }else {
                this.notify("No correct data for export.");
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    render() {
        let collections = this.state.collections;
        return(
            <div className={'export-module'}>
                <h1 className={'subtitle'}>Export Database</h1>
                <div className={'columns'}>
                    <form id={'exportForm'} onSubmit={this.onSubmit}>
                        {collections.map((collection, index) =>
                            <div className={'field'} key={index}>
                                <input className="is-checkradio" id={'cexport_' + index} type="checkbox" name={collection.name} onChange={this.handleSelectCollections.bind(this)}/>
                                <label htmlFor={'cexport_' + index}>{collection.name}</label>
                            </div>
                        )
                        }
                        <div className={'controls'}>
                            {this.state.data.length > 0 ? (
                                <input className={'button is-primary'} type='submit' value={'Export'}></input>
                            ) : (
                                <button className={'button is-primary'} type='button' disabled>Export</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    }



}

export default ExportComponent;