const crypto = require('crypto'),
    fs = require('fs');

function getFileHash(fileName) {
    
    const hash = crypto.createHash('md5'),
        stream = fs.createReadStream(fileName);


    stream.on('data', function (data) {
        hash.update(data, 'utf8')
    })

    let fileHash = "";
    stream.on('end', function () {
        fileHash = hash.digest('hex') 
    });
    return fileHash;
}

//TODO : handle errors
function readFile(fileName) {
    let content = fs.readFileSync(fileName).toString();
    return content;
}

function readJSONfile(fileName) {
    let content = readFile(fileName);
    return JSON.parse(content);
}

function writeFile(fileName, content) {
    fs.writeFileSync(fileName, content);
}

function writeJSONFile(fileName, content) {
    writeFile(fileName, JSON.stringify(content));
}

module.exports = {
    getFileHash, 
    readFile, 
    readJSONfile, 
    writeFile, 
    writeJSONFile
}