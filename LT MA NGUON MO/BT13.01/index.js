const { writeFile } = require('fs')
const http = require('http')
const os = require('os')

var information = {
    OSType: os.type(),
    Plaform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
}
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(information, null, 2))
});
const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`Sever running at http://${hostname}:${port}/`)
}
)
writeFile('D:\\Homework\\homework.txt', JSON.stringify(information, null, 2), (err) => {
    if (err) {
        console.log(err)
        return;
    }
})