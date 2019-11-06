const fs = require('fs');
const os = require('os');
const chokidar = require('chokidar');
const md = require("node-markdown").Markdown;
const htmlParser = require('node-html-parser');
const opener = require('opener');
const colors = require('colors/safe');


var ifaces = os.networkInterfaces();

var changed = false;

var appConfig;

try {
    var data = fs.readFileSync('./data/app.config.json');

    appConfig = JSON.parse(data);

    if (appConfig) {
        initialize();
        execute();
    }



} catch (e) {
    console.log(e.message)
}


function initialize() {
    const watcher = chokidar.watch('./data', {
        ignored: /(^|[\/\\])\..|sitemap\.json$|\.config\.json/, // ignore dotfiles
        persistent: true
    });

    watcher
        .on('addDir', () => change())
        .on('unlinkDir', () => change())
        .on('add', () => change())
        .on('change', () => change())
        .on('unlink', () => change())

    var HttpServer = require("http-server");

    var host = '0.0.0.0';
    var port = 50000;
    var protocol = 'http://'
    var open = true;

    var server = HttpServer.createServer({
        root: './',
        cache: -1
    })

    server.listen(port, host, function () {
        var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host;

        console.log([colors.yellow('Starting up http-server, serving '),
        colors.cyan(server.root),
        colors.yellow('\nAvailable on:')
        ].join(''));

        if (host !== '0.0.0.0') {
            console.log(('  ' + protocol + canonicalHost + ':' + colors.green(port.toString())));
        }
        else {
            Object.keys(ifaces).forEach(function (dev) {
                ifaces[dev].forEach(function (details) {
                    if (details.family === 'IPv4') {
                        console.log(('  ' + protocol + details.address + ':' + colors.green(port.toString())));
                    }
                });
            });
        }

        console.log('Hit CTRL-C to stop the server');

        if (open) {
            opener(protocol + canonicalHost + ':' + port + '/index.html');
        }
    });

}


var ids = {

};

function change() {
    changed = true;
}

function execute() {
    if (changed) {
        changed = false;

        console.log('[' + getNowFormatDate() + ']   ' + 'Bulid start');

        for (var content of appConfig.contents) {

            if (content.type != 'page') {
                const contentDir = './data/' + content.name;
                const contentSitemapFile = './data/' + content.name + '/sitemap.json';

                try {
                    var sitemap = [];
                    var rootItem = {};
                    rootItem.id = ids[content.name] = 1;
                    rootItem.title = content.title;
                    rootItem.children = [];

                    var dirs = fs.readdirSync(contentDir);

                    for (var dir of dirs) {
                        var stat = fs.statSync(contentDir + "/" + dir);

                        if (stat.isDirectory()) {
                            generateItems(content, rootItem, contentDir, dir);
                        }
                    }

                    sitemap.push(rootItem);

                    fs.writeFileSync(contentSitemapFile, JSON.stringify(sitemap));

                }
                catch {

                }
            }
        }

        console.log('[' + getNowFormatDate() + ']   ' + 'Bulid finish');
    }

    setTimeout(execute, 1 * 1000);


}

function generateItems(content, parent, parentDir, dir) {
    try {
        var stat = fs.statSync(parentDir + '/' + dir);

        if (stat.isDirectory()) {

            var file;

            if (content.type == 'code') {
                file = parentDir + '/' + dir + '/index.html';
            } else {
                file = parentDir + '/' + dir + '/index.md';
            }

            if (fs.existsSync(file)) {
                var id = ++ids[content.name];
                var title = dir;
                try {
                    const text = fs.readFileSync(file, 'utf-8');
                    if (content.type == 'code') {
                        const html = md(text, true, 'h1');
                        const node = htmlParser.parse(html).querySelector('h1');

                        if (node && node.childNodes.length > 0) {
                            title = node.childNodes[0].rawText;
                        }
                    } else {
                        const node = htmlParser.parse(text).querySelector('title');

                        if (node && node.childNodes.length > 0) {
                            title = node.childNodes[0].rawText;
                        }
                    }
                } catch {

                }

                var path = parentDir + '/' + dir;
                if (path.startsWith('./data')) {
                    path = path.substring(6, path.length);
                }

                parent.children.push({
                    id: id,
                    title: title,
                    path: path
                })
            } else {
                var item = {
                    id: ++ids[content.name],
                    title: dir,
                    path: '',
                    children: []
                }

                var subDirs = fs.readdirSync(parentDir + '/' + dir);

                for (var subDir of subDirs) {
                    var stat = fs.statSync(parentDir + '/' + dir + "/" + subDir);

                    if (stat.isDirectory()) {

                        generateItems(content, item, parentDir + '/' + dir, subDir);
                    }
                }

                parent.children.push(item);
            }
        }
    } catch(e) {
        console.log(e.message)
    }

}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}