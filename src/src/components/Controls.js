import React from "react";
import PropTypes from "prop-types";
import { ipcRenderer } from "electron";
import { Button, Divider } from "semantic-ui-react";

import {
  PAUSE_SONG,
  RESUME_SONG,
  STOP_SONG,
  PLAY_SONG
} from "../../../constants";

const Controls = props => {
  return (
    <>
      <Divider />
      <Button
        onClick={() => ipcRenderer.send(PLAY_SONG, props.currentSong.path)}
      >
        Play
      </Button>
      <Button onClick={() => ipcRenderer.send(PAUSE_SONG)}>Pause</Button>
      <Button onClick={() => ipcRenderer.send(RESUME_SONG)}>Resume</Button>
      <Button onClick={() => ipcRenderer.send(STOP_SONG)}>Stop</Button>
    </>
  );
};

Controls.propTypes = {
  currentSong: PropTypes.object.isRequired
};

export default Controls;
