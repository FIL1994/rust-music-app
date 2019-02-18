import React, { useState, useEffect } from "react";
import { ipcRenderer, remote } from "electron";

import {
  SONG_DETAILS,
  GET_ALL_SONGS,
  RECEIVE_ALL_SONGS
} from "../../../constants";
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

  useEffect(() => {
    const getSongs = (event, data) => {
      console.log("songs from db", data);
    };

    ipcRenderer.on(RECEIVE_ALL_SONGS, getSongs);

    ipcRenderer.send(GET_ALL_SONGS);

    return () => {
      ipcRenderer.removeListener(RECEIVE_ALL_SONGS, getSongs);
    };
  }, []);

  return (
    <>
      <Songs songs={songs} setCurrentSong={setCurrentSong} />
      <Metadata />
      <Controls currentSong={currentSong} />
    </>
  );
};

export default App;
