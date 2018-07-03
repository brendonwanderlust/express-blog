const express = require('express');
const util = require('util');
const fs = require('fs');
const app = express();

const readFile = util.promisify(fs.readFile);

app.get('/', (request, response) => {
    readFile('data.json')
        .then((data) => {
            response.json(JSON.parse(data));
        });
});

app.get('/blog/:id', (request, response) => {
    const id = Number(request.params.id);

    readFile('data.json')
        .then((data) => {
            const blogData = JSON.parse(data)
            if (blogData[id]) {
                response.json(blogData[id]);
            } else {
                response.json({});
            }
        });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
