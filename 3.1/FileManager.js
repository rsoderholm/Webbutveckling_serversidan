'use strict';

let fileSystem = require('fs');


class FileManager {

    constructor() {
        this.counter = 0;
        this.filename = 'visitorcount.txt';
        this.html = './index.html'
    }

    getVisitorCount() {
        let data;
        try {
            data = fileSystem.readFileSync(this.filename, 'utf8');
        } catch (e) {
            console.log("Error: " + e.stack);
        }
        return data;
    }


    increaseVisitorCount() {
        this.counter++;
        fileSystem.writeFileSync(this.filename, this.counter);
    }

    getHTML() {
        let data;
        try {
            data = fileSystem.readFileSync(this.html, 'utf8');
        } catch (e) {
            console.log("Error: " + e.stack);
        }
        return data;
    }

}

module.exports = FileManager;