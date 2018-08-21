import HttpClient from "../../core/HttpClient/HttpClient";

class CollectionManager {
    constructor() {
        this.httpClient = new HttpClient();
        this.api_url = 'collections';
    }

    async GetAllCollections() {
        try {
            return await this.httpClient.Get(this.api_url);
        }  catch (e) {

        }
    }

    async DropCollection(name) {
        try {
            return await this.httpClient.Delete(`${this.api_url}/${name}/remove`);
        } catch (e) {

        }
    }

    async ClearCollection(name) {
        try {
            return await this.httpClient.Delete(`${this.api_url}/${name}/clear`);
        } catch (e) {

        }
    }

    async CreateCollection (name) {
        try {
            return this.httpClient.Post(`${this.api_url}/create`, {name: name})
        } catch (e) {

        }
    }

    async RenameCollection (oldname, name) {
        try {
            return this.httpClient.Post(`${this.api_url}/${oldname}/rename`, {name: name})
        } catch (e) {

        }
    }
}

export default CollectionManager;