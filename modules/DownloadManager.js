const DownloadFile = require('./DownloadFile');

module.exports = () => {
    return {
        files: [],
        downloadFile(url, name) {
            let downloadFile = DownloadFile(url,name);
            downloadFile.startDownload();
            this.files.unshift(downloadFile);
        }
    }
};