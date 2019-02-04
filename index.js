const addon = require("./native");
const electron = require("electron");
const { app, BrowserWindow, dialog, ipcMain } = electron;
require('electron-reload')(__dirname);

function createWindow() {
  let win = new BrowserWindow({
    title: "Electron & Neon",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      webgl: false
    }
  });

  // win.loadFile("./index.html");
  win.loadFile("./src/dist/index.html");

  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });

  global.addon = addon;
}

app.on("ready", createWindow);

ipcMain.on("choose-file", (event, arg) => {
  const files = chooseFile();
  if (!files) {
    vent.sender.send("cancelled-file-select");
    return;
  }

  const file = files[0];
  addon.playSong(file);

  event.sender.send("play-file", file);
});

function chooseDirectory() {
  const path = dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  return path;
}

function chooseFile() {
  const paths = dialog.showOpenDialog({
    properties: ["openFile"],
    buttonLabel: "Play",
    filters: [{ name: "Songs", extensions: ["mp3", "flac", "wav", "ogg"] }]
  });

  return paths;
}
