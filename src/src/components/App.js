import React from "react";
const { ipcRenderer, remote } = require("electron");
const addon = remote.getGlobal("addon");

const App = props => <div>React Template!</div>;

export default App;
