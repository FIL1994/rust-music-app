import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import {
  CHOOSE_FILE,
  PAUSE_SONG,
  RESUME_SONG,
  STOP_SONG,
  SONG_DETAILS
} from "../../../constants";

const Controls = props => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const onAddSong = (event, data) => {
      let newSongs = [...songs];
      newSongs.push(data.metadata.common);
      setSongs(newSongs);
    };

    ipcRenderer.on(SONG_DETAILS, onAddSong);

    return () => {
      ipcRenderer.removeListener(SONG_DETAILS, onAddSong);
    };
  });

  console.log("songs", songs);

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
