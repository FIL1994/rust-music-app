import React, { useState, useEffect } from "react";
import { ipcRenderer, remote } from "electron";

import { SONG_DETAILS } from "../../../constants";
import Metadata from "./Metadata";
import Controls from "./Controls";
import Songs from "./Songs";

// const addon = remote.getGlobal("addon");

const App = props => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState();

  useEffect(() => {
    const onAddSong = (event, data) => {
      let newSongs = [...songs];
      newSongs.push(data);
      setSongs(newSongs);
    };

    ipcRenderer.on(SONG_DETAILS, onAddSong);

    return () => {
      ipcRenderer.removeListener(SONG_DETAILS, onAddSong);
    };
  });

  return (
    <>
      <Songs songs={songs} setCurrentSong={setCurrentSong} />
      <Metadata />
      <Controls currentSong={currentSong} />
    </>
  );
};

export default App;
