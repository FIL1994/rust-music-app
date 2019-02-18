const { db } = require("./electron/db");
const isDev = require("electron-is-dev");
const addon = require("./native");
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const contextMenu = require("electron-context-menu");
const mm = require("music-metadata");

const {
  CHOOSE_FILE,
  PAUSE_SONG,
  RESUME_SONG,
  STOP_SONG,
  SONG_DETAILS,
  PLAY_SONG
} = require("./constants/index");

if (isDev) {
  require("electron-reload")(__dirname);
}

contextMenu();

function createWindow() {
  let win = new BrowserWindow({
    title: "Electron & Neon",
    width: 1000,
    height: 800,
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

ipcMain.on(CHOOSE_FILE, async (event, arg) => {
  const files = chooseFile();
  if (!files) {
    return;
  }

  const path = files[0];
  // addon.playSong(file);

  const metadata = await mm.parseFile(path);

  event.sender.send(SONG_DETAILS, {
    path,
    metadata
  });
});

ipcMain.on(PAUSE_SONG, event => addon.pauseSong());
ipcMain.on(RESUME_SONG, event => addon.resumeSong());
ipcMain.on(STOP_SONG, event => addon.stopSong());
ipcMain.on(PLAY_SONG, (event, data) => addon.playSong(data));

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
