import React from "react";
import { ipcRenderer } from "electron";
import _ from "lodash";

import { SONG_DETAILS } from "../../../constants";

class Metadata extends React.Component {
  state = {
    metadata: {}
  };

  componentDidMount() {
    ipcRenderer.on(SONG_DETAILS, (event, data) => {
      this.setState({
        metadata: data.metadata.common
      });
    });
  }

  render() {
    const { metadata } = this.state;

    return (
      <>
        <h3>Metadata</h3>
        {!_.isEmpty(metadata) && (
          <>
            {metadata.artist} - {metadata.title}
          </>
        )}
      </>
    );
  }
}

export default Metadata;
