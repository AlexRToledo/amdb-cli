import HttpClient from "../../core/HttpClient/HttpClient";

class DocumentManager {
    constructor() {
        this.httpClient = new HttpClient();
    }

    async ImportData (data) {
        try {
            return this.httpClient.Post(`import`, {data: data})
        } catch (e) {

        }
    }

    async ExportData(collections) {
        try {
            return await this.httpClient.Post(`export`, {data: collections});
        } catch (e) {

        }
    }
}

export default DocumentManager;