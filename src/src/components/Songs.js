import React from "react";
import PropTypes from "prop-types";
import { ipcRenderer } from "electron";
import { List, Button } from "semantic-ui-react";

import { CHOOSE_FILE } from "../../../constants";

const Songs = props => {
  const { songs, setCurrentSong } = props;

  return (
    <>
      <Button fluid primary onClick={() => ipcRenderer.send(CHOOSE_FILE)}>
        Add Song
      </Button>
      <List divided verticalAlign="middle">
        {songs.map(s => (
          <List.Item
            style={{
              cursor: "pointer"
            }}
            onClick={() => {
              console.log(s);
              setCurrentSong(s);
            }}
          >
            <List.Content>
              {s.title} - {s.artist}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};

Songs.propTypes = {
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired
};

export default Songs;
