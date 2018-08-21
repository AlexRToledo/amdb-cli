import HttpClient from "../../core/HttpClient/HttpClient";

class DocumentManager {
    constructor() {
        this.httpClient = new HttpClient();
        this.api_url = 'collection';
    }

    async GetDocumentsByCollection(collection) {
        try {
            return await this.httpClient.Get(`${this.api_url}/${collection}`);
        } catch (e) {

        }
    }

    async CreateDocument (collection, document) {
        try {
            return this.httpClient.Post(`${this.api_url}/${collection}/create`, {document: document})
        } catch (e) {

        }
    }

    async EditDocument (collection, document, id) {
        try {
            return this.httpClient.Put(`${this.api_url}/${collection}/${id}`, {document: document})
        } catch (e) {

        }
    }

    async DeleteDocument (collection, id) {
        try {
            return this.httpClient.Delete(`${this.api_url}/${collection}/${id}`)
        } catch (e) {

        }
    }
}

export default DocumentManager;