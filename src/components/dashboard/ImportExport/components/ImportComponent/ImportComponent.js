import React from 'react';
import ImportExportManager from "../../../../../managers/ImportExportManager/ImportExportManager";
import IComponent from '../../../../../core/Components/IComponent/IComponent';

class ImportComponent extends IComponent {
    constructor() {
        super();
        this.state = {
            fileName: "",
            FileHandle: {},
            collection_show: [],
            data: '',
            importMode: false
        };
        this.fileReader;
        this.IEManager = new ImportExportManager();
        this.fileChange = this.fileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showFileData = this.showFileData.bind(this);
    }

    vJson(contentFile) {
        if(this.Json.validate(contentFile)) {
            this.notify('Valid Json.');
            this.setState({collection_show: this.Json.dataForImport(contentFile)});
            this.setState({data: contentFile});
        } else {
            this.notify('Invalid Json.');
            this.setState({collection_show: []});
        }
    }

    showFileData(e) {
        let contentFile = this.fileReader.result;
        this.vJson(contentFile);
    }

    fileChange(event) {
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.showFileData;
        this.fileReader.readAsText(event.target.files[0]);
        this.setState( {fileName: event.target.files[0].name} );
        this.setState( {FileHandle: event.target.files[0]} );
    }

    handleOptionChangeMode(event) {
        this.setState({importMode: !this.state.importMode});
        if(this.state.importMode === true) {
            this.setState({collection_show: []});
        }
    }

    codeChange(event) {
        if(event.target.value !== '') {
            this.vJson(event.target.value);
        }
    }

    async onSubmit(event) {
        try {
            event.preventDefault();
            this.notify("Loading...", true);
            let response;
            if(this.state.collection_show !== null && this.state.collection_show !== undefined && this.state.data !== '') {
                response = await this.IEManager.ImportData(this.state.data);
                if(response.error === false) {
                    this.setState({fileName: ""});
                    this.setState({FileHandle: {}});
                    this.setState({collection_show: []});
                    this.setState({data: ''});
                    this.notify(response.message);
                    document.getElementById("importForm").reset();
                }else {
                    this.notify(response.message);
                }

            } else {
                this.notify("No correct data for import.");
                document.getElementById("importForm").reset();
            }
        } catch (e) {
            this.notify("Error can't connect with the server.");
        }
    }

    render() {
        return (
            <div className={'columns'}>
                <div className={'column is-5'}>
                    <h1 className={'subtitle'}>Import Database</h1>
                    <form id={'importForm'} onSubmit={this.onSubmit}>
                        <div className="field">
                            <input id={'mode1'} className="is-checkradio" type="radio" name="mode" checked={this.state.importMode === false}
                                   onChange={this.handleOptionChangeMode.bind(this)} />
                            <label htmlFor="mode1">File</label>

                            <input id={'mode2'} className="is-checkradio" type="radio" name="mode" checked={this.state.importMode === true}
                                   onChange={this.handleOptionChangeMode.bind(this)} />
                            <label htmlFor="mode2">Code</label>
                        </div>
                        {this.state.importMode === false ? (
                            <div>
                                <label className="label">Upload File</label>
                                <div className="control">
                                    <div className="file has-name is-fullwidth">
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="resume" accept=".json" onChange={this.fileChange} />
                                            <span className="file-cta">
                                                <span className="file-icon icon">
                                                    <i className="typcn typcn-cloud-storage"></i>
                                                </span>
                                                <span className="file-label">
                                                    Choose a file…
                                                </span>
                                            </span>
                                            <span className="file-name">
                                                {this.state.fileName}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="label">Write Code</label>
                                <div className="control">
                                    <textarea className="textarea" name={'resume'} placeholder="e.g. { users: [{'name': 'Alex', }], houses: [...] }" onChange={this.codeChange.bind(this)}></textarea>
                                </div>
                            </div>
                        )}
                        <div className="field is-grouped is-grouped-right"></div>
                        <div className={'controls'}>
                            {this.state.collection_show.length > 0 ? (
                                <input className={'button is-primary'} type="submit" value="Import" />
                            ) : (
                                <button className={'button is-primary'} value="Import" disabled> Import</button>
                            )}
                        </div>
                    </form>
                </div>
                <div className={'column is-3'}>
                    <h1 className={'subtitle'}>Data View</h1>
                    {this.state.collection_show.length > 0 ? (
                        <div className={'data-right'}>
                            <ul className={'data-right-collections'}>
                                {this.state.collection_show.map((doc, key) => {
                                    return (
                                        <li className={'data-right-collections-view'} key={key}>
                                            <div className={'collection-name'}>{doc.name}:&nbsp;</div>
                                            <div className={'collection-total'}>{doc.length}</div>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>) : (
                        <div>
                            <h6>Not data to show.</h6>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }

}

export default ImportComponent