const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let downloader = require('./modules/DownloadManager')();

app.use(express.json());

// Auth middleware
/*app.use((req, res, next) => {
    const auth = {login: 'thibault', password: 'yoga260'}; // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

    // Verify login and password are set and correct
    if (!login || !password || login !== auth.login || password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
        return
    }

    // Access granted...
    next()
});*/

app.get('/downloadManager', (req, res) => {
   return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/api/downloadManager', (req, res) => {
    downloader.downloadFile(req.body.url, req.body.name);
    return res.json(downloader);
});

app.get('/api/downloadManager', (req, res) => {
    return res.json(downloader);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});