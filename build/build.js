const fs = require('fs');
const chokidar = require('chokidar');
const md = require("node-markdown").Markdown;
const htmlParser = require('node-html-parser');

const watcher = chokidar.watch('./data', {
    ignored: /(^|[\/\\])\..|\.config\.json$/, // ignore dotfiles
    persistent: true
});

var initialized = false;
var changed = false;
var working = false;

// Add event listeners.
watcher
    .on('addDir', () => change())
    .on('unlinkDir', () => change())
    .on('add', () => change())
    .on('change', () => change())
    .on('unlink', () => change())

execute();

initialized = true;

function change() {

    if (initialized) {
        changed = true;
    }

}




var pageID = 1;
var codeID = 1;

setInterval(execute, 1 * 1000);

function execute() {

    if ((!initialized || changed) && (!working)) {

        console.log('['+getNowFormatDate()+']   '+'Bulid start');

        changed = false;
        working = true;

        const pageDir = './data/pages'
        const pageConfigFile = './data/pages/page.config.json'

        try {
            var pageConfig = [];
            var rootItem = {};
            rootItem.id = pageID = 1;
            rootItem.name = 'pages';
            rootItem.title = '';
            rootItem.children = [];

            var dirs = fs.readdirSync(pageDir);

            for (var dir of dirs) {
                var stat = fs.statSync(pageDir + "/" + dir);

                if (stat.isDirectory()) {

                    generatePageItems(rootItem, pageDir, dir);
                }
            }

            pageConfig.push(rootItem);

            fs.writeFileSync(pageConfigFile, JSON.stringify(pageConfig))
        }
        catch {

        }

        const codeDir = './data/codes'
        const codeConfigFile = './data/codes/code.config.json'

        try {
            var codeConfig = [];
            var rootItem = {};
            rootItem.id = codeID = 1;
            rootItem.name = 'codes';
            rootItem.title = '';
            rootItem.children = [];

            var dirs = fs.readdirSync(codeDir);

            for (var dir of dirs) {
                var stat = fs.statSync(codeDir + "/" + dir);

                if (stat.isDirectory()) {

                    generateCodeItems(rootItem, codeDir, dir);
                }
            }

            codeConfig.push(rootItem);

            fs.writeFileSync(codeConfigFile, JSON.stringify(codeConfig))
        }
        catch {

        }
       
        console.log('['+getNowFormatDate()+']   '+'Bulid finish');

        working = false;
    }


}

function generatePageItems(parent, parentDir, dir) {
    try {
        var stat = fs.statSync(parentDir + '/' + dir);        

        if (stat.isDirectory()) {
            var file = parentDir + '/' + dir + '/index.md';

            if (fs.existsSync(file)) {
                var id = ++pageID;
                var title = dir;
                try {
                    const text = fs.readFileSync(file, 'utf-8');
                    const html = md(text, true, 'h1');
                    const node = htmlParser.parse(html).querySelector('h1');

                    if (node && node.childNodes.length > 0) {
                        title = node.childNodes[0].rawText;
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
                    id: ++pageID,
                    title: dir,
                    path: '',
                    children: []
                }

                var subDirs = fs.readdirSync(parentDir + '/' + dir);

                for (var subDir of subDirs) {
                    var stat = fs.statSync(parentDir + '/' + dir + "/" + subDir);

                    if (stat.isDirectory()) {

                        generatePageItems(item, parentDir + '/' + dir, subDir);
                    }
                }

                parent.children.push(item);
            }
        }
    } catch {

    }

}


function generateCodeItems(parent, parentDir, dir) {
    try {
        var stat = fs.statSync(parentDir + '/' +dir);

        if (stat.isDirectory()) {
            var file = parentDir + '/' +dir + '/index.html';

            if (fs.existsSync(file)) {
                var id = ++codeID;
                var title = dir;
                try {
                    const text = fs.readFileSync(file, 'utf-8');                   
                    const node = htmlParser.parse(text).querySelector('title');

                    if (node && node.childNodes.length > 0) {
                        title = node.childNodes[0].rawText;
                    }
                } catch {

                }

                var path = parentDir + '/' +dir;
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
                    id: ++codeID,
                    title: dir,
                    path: '',
                    children: []
                }
                
                var subDirs = fs.readdirSync(parentDir + '/' +dir);

                for (var subDir of subDirs) {
                    var stat = fs.statSync(parentDir + '/' +dir + "/" + subDir);

                    if (stat.isDirectory()) {

                        generateCodeItems(item, parentDir + '/' +dir, subDir);
                    }
                }

                parent.children.push(item);
            }
        }
    } catch {

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