import Axios from 'axios';
import Config from '../../config';

class HttpClient {
    constructor() {
        return this._apiUrl = Config[Config.mode].api;
    }

    async Get (url) {
       try {
           return this.Response(await Axios.get(this._apiUrl + url));
       } catch (e) {

       }
    }

    async Post (url, data) {
        try {
            return this.Response(await Axios.post(this._apiUrl + url, data));
        } catch (e) {

        }
    }

    async Delete (url) {
        try {
            return this.Response(await Axios.delete(this._apiUrl + url));
        } catch (e) {

        }
    }

    async Put (url, data) {
        try {
            return this.Response(await Axios.put(this._apiUrl + url, data));
        } catch (e) {

        }
    }

    async Response (response) {
        if (response.data) {
            return response.data
        }
    }
}

export default HttpClient;