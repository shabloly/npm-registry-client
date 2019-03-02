import React, { Component } from "react";
import "./App.css";
import testdata from "./Data/testdata.json";
import Dependency from "./Dependency";
import Search from "./components/Search";

class App extends Component {
  state = {
    name: "",
    version: ""
  };

  handleNewSearch = ({ name, version }) => {
    this.setState({ name, version });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search Module dependencies</h1>
        </header>
        <Search onSearch={this.handleNewSearch} />
        <div id="tree" >
            {
                (this.state.name === "")? null :
                <ul>
                    <Dependency module={this.state} loadDepth={1} key={`${this.state.name}@${this.state.version}`} />
                </ul>
            }
        </div>
      </div>
    );
  }
}

export default App;
