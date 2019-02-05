import React from "react";
import { ipcRenderer } from "electron";
import _ from "lodash";

class Metadata extends React.Component {
  state = {
    metadata: {}
  };

  componentDidMount() {
    ipcRenderer.on("play-file", (event, data) => {
      this.setState({
        metadata: data.metadata.common
      });
    });
  }

  render() {
    const { metadata } = this.state;
    console.log(this.state);
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
