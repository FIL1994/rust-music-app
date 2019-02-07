import React, { useState } from "react";
import PropTypes from "prop-types";
import { ipcRenderer } from "electron";
import { List, Button } from "semantic-ui-react";

import { CHOOSE_FILE } from "../../../constants";

const Songs = props => {
  const [image, setImage] = useState();
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

              const { data } = s.picture[0];
              const base64Image = Buffer.from(data).toString("base64");
              setImage(base64Image);
            }}
          >
            <List.Content>
              {s.title} - {s.artist}
            </List.Content>
          </List.Item>
        ))}
      </List>
      {image && <img src={`data:image/png;base64, ${image}`} />}
    </>
  );
};

Songs.propTypes = {
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired
};

export default Songs;
