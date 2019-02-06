import React from "react";
import { ipcRenderer, remote } from "electron";

import Metadata from "./Metadata";
import Controls from "./Controls";

const addon = remote.getGlobal("addon");

const App = props => {
  return (
    <div>
      React Template!
      <hr />
      <Controls />
      <Metadata />
    </div>
  );
};

export default App;
