import React from "react";
import { ipcRenderer } from "electron";

import {
  CHOOSE_FILE,
  PAUSE_SONG,
  RESUME_SONG,
  STOP_SONG
} from "../../../constants";


const Controls = props => {
  return (
    <>
      <button onClick={() => ipcRenderer.send(CHOOSE_FILE)}>Add Song</button>
      <button onClick={() => ipcRenderer.send(PAUSE_SONG)}>Pause</button>
      <button onClick={() => ipcRenderer.send(RESUME_SONG)}>Resume</button>
      <button onClick={() => ipcRenderer.send(STOP_SONG)}>Stop</button>
    </>
  );
};

export default Controls;
