const request = require('request');
const fs = require('fs');
const path = require('path');

const DIRECTORY = "downloads/";

module.exports = function(url, name) {
    return {
        request: null,
        url: url,
        name: name,
        totalSize: 0,
        status: "Downloading",
        startDownload() {
            this.request = request(this.url);

            this.request.on('response', response => {
                this.totalSize = response.headers['content-length'];
            });
            this.request.on('error', error => {
                this.status = "Error";
            });

            let stream = this.request.pipe(fs.createWriteStream(DIRECTORY + this.name));
            stream.on('finish', () => {
                this.status = "Completed";
            });
            stream.on('error', (error) => {
                console.error(error);
                this.status = "Error";
            });
        },
        get percentageDone() {
            if(this.totalSize === 0)
                return 0;


            if(fs.existsSync(DIRECTORY + this.name)) {
                    let stats = fs.statSync(DIRECTORY + this.name);
                    return stats["size"] / this.totalSize;
            } else {
                return 100;
            }
        }
    }
};
