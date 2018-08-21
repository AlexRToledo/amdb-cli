class FileDownload {
    constructor() {}

    /**
     *   Download function
     *   @param {Blob} Uri - File for download
     *   @param {String} Filename - Name of the file
     */
    Download(data, filename) {
        try {
            let element = document.createElement("a");
            let blob = new Blob([data], {type: "text/json;charset=utf-8"});
            element.href = URL.createObjectURL(blob);
            element.download = filename;
            element.click();
            document.body.removeChild(element);
        } catch (e) {
            console.log('Error')
        }
    }

}

export default FileDownload