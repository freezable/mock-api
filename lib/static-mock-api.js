'use strict';
const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
const recursive = require("recursive-readdir");
const minStatusCode = 100;
const maxStatusCode = 599;
const defaultPort = 3000;

module.exports = class StaticMockApi {

    constructor(options) {
        this.mockApiFoler = options.mockApiFoler ? options.mockApiFoler : 'api';
        this.exclude = options.exclude ? options.exclude : ['.gitignore'];
        this.port = options.port ? options.port : defaultPort;
        this.enableDynamicMocks = options.enableDynamicMocks ? options.enableDynamicMocks : true;
    }

    start() {
        if (fs.existsSync(this.mockApiFoler)) {

            recursive(this.mockApiFoler, this.exclude, function(err, files) {

                let endpoints = [];
                for (const file of files) {
                    const filePath = path.parse(file);
                    const code = parseInt(filePath.name)
                    if (code < minStatusCode || code > maxStatusCode) {
                        console.error('File name should int (HTTP reposnse code):' + filePath.name, filePath)

                        continue;
                    }
                    const endpoint = '/' + filePath.dir;

                    if (!endpoints.includes(endpoint)) {
                        app.all(endpoint, (req, res) => {
                            let status = req.query.code ? req.query.code : 200;
                            let json = {
                                message: 'not-exist'
                            }
                            let jsonPath = path.join(__dirname, filePath.dir, status + '.json')
                            if (fs.existsSync(jsonPath)) {
                                try {
                                    json = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
                                } catch (e) {
                                    console.error('File ' + jsonPath + ' contains not valid JSON')
                                }
                            }
                            res.status(status).json(json)
                        })
                        console.log('Endpoint added: ' + endpoint)
                        endpoints.push(endpoint)
                    }
                }

                if (this.enableDynamicMocks) {
                    for (let status = minStatusCode; status <= maxStatusCode; status++) {
                        let endpoint = '/api/mock/' + status;
                        app.all(endpoint + '/:optional?*', (req, res) => {
                            res.status(status);
                            if (req.query) {
                                res.json(req.query);
                            }
                            res.send();
                        })
                    }
                }

                console.log('Mock endpoins added /api/mock/100 ... /api/mock/599')

                app.listen(this.port, () => {
                    console.log(`Example app listening at http://localhost:${this.port}`)
                })

            });
        } else {
            console.error('Folder "' + folder + '" not exist.');
        }
    }

}