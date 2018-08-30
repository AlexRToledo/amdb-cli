import React from 'react';
import IComponent from "../../../../core/Components/IComponent/IComponent";

const bcrypt = require('bcryptjs');

class BcryptComponent extends IComponent{
    constructor() {
        super();
        this.state = {
            salt_hash: 8,
            password: '',
            bcrypted_hash: '',
            copy: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
    }

    async handleCopy() {
        try {
            if(this.state.bcrypted_hash !== "") {
                document.querySelector('#hashCopy').select();
                document.execCommand('copy');
                this.notify("Copy to clipboard.");
            }
        } catch (e) {
            this.notify("Unable to copy to clipboard.");
        }
    }


    async onSubmit(event) {
        try {
            event.preventDefault();
            this.notify("Encrypting...", true);
            let salt = bcrypt.genSaltSync(parseInt(this.state.salt_hash, 10));
            let hash = bcrypt.hashSync(this.state.password, salt);

            this.setState({
                bcrypted_hash: hash
            });

            this.notify("Done.");
        } catch (e) {
            this.notify("Error encrypting password.");
        }
    }



    render() {
        return (
            <div className={'bcrypt-password'}>
                <div className={'columns'}>
                    <div className={'column is-12'}>
                        <h1 className={'subtitle'}>Bcrypt Password</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className={'columns'}>
                                <div className={'column is-1'}>
                                    <div className="field">
                                        <label className="label">Salt:</label>
                                        <div className="control">
                                            <input className="input" type="number" name={'salt_hash'} placeholder="Provide a valid hash." min={'0'} value={this.state.salt_hash} onChange={this.handleFields.bind(this)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className={'column is-4'}>
                                    <div className="field">
                                        <label className="label">Password:</label>
                                        <div className="control">
                                            <input className="input" type="text" name={'password'} placeholder="Enter password" required />
                                        </div>
                                    </div>
                                </div>
                                <div className={'column is-2'}>
                                    <div className={'field'}>
                                        <label className={'label'}>&nbsp;</label>
                                        <div className={'controls mt-2'}>
                                            <input className={'button is-primary'} type="submit" value="Generate" />
                                        </div>
                                    </div>
                                </div>
                                <div className={'column is-4'}>
                                    <div className={'field'}>
                                        <label className={'label'}>Bcrypted:</label>
                                        <div className={'controls mt-2'}>
                                            <input id={"hashCopy"} className={'input'} type="text" value={this.state.bcrypted_hash} readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className={'column is-1'}>
                                    <div className={'field'}>
                                        <label className={'label'}>&nbsp;</label>
                                        <div className={'controls mt-2'}>
                                            {this.state.copy === true ? (
                                                <a>Copied!</a>
                                            ) : (
                                                <a onClick={this.handleCopy.bind(this)}>Copy</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default BcryptComponent;