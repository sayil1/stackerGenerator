
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {

win = new BrowserWindow({ icon: __dirname + '/images/brw.PNG', show: false 
})
win.maximize()
win.show()

win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'), //path to your index.html
    protocol: false,
    slashes: true
}));

win.webContents.openDevTools();

win.on('closed', () => {
    win = null;
});

}



app.on('ready', createWindow);