import React from "react";
import Metadata from "./Metadata";
const { ipcRenderer, remote } = require("electron");
const addon = remote.getGlobal("addon");

const App = props => (
  <div>
    React Template!
    <hr />
    <button onClick={() => ipcRenderer.send("choose-file")}>Open File</button>
    <Metadata />
  </div>
);

export default App;
