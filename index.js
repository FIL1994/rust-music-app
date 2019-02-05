const addon = require("./native");
const electron = require("electron");
const { app, BrowserWindow, dialog, ipcMain } = electron;
const mm = require("music-metadata");

const c = require("./constants/index");
const { CHOOSE_FILE, PAUSE_SONG, RESUME_SONG, STOP_SONG, SONG_DETAILS } = c;

require("electron-reload")(__dirname);

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

  win.loadFile("./src/dist/index.html");

  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });

  global.addon = addon;
}

app.on("ready", createWindow);

console.log(c);

ipcMain.on(CHOOSE_FILE, async (event, arg) => {
  const files = chooseFile();
  if (!files) {
    return;
  }

  const file = files[0];
  addon.playSong(file);

  const metadata = await mm.parseFile(file);

  event.sender.send(SONG_DETAILS, {
    file,
    metadata
  });
});

ipcMain.on(PAUSE_SONG, event => addon.pauseSong());
ipcMain.on(RESUME_SONG, event => addon.resumeSong());
ipcMain.on(STOP_SONG, event => addon.stopSong());

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
