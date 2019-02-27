import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Tree from 'react-animated-tree';
import testdata from './Data/testdata.json';

import UserForm from "./components/UserForm";

class App extends Component {

  state = {
    name:String,
    version:String,
    dependencies: []
  }

  //use test data
  componentDidMount() {
    const data = testdata;
    this.setState({name:'express',version:'latest',dependencies:data.dependencies});
  }

  getDependecies = async (e) => {
    e.preventDefault();
    const moduleName = e.target.elements.modulename.value.trim();
    const moduleVersion = e.target.elements.moduleversion.value.trim();

    if (moduleName && moduleVersion) {
      let url = 'http://localhost:8000/getModuleDependencies/'+ moduleName +'/'+ moduleVersion;
      const res =  await axios.get(url);
        const depCount = res.data.count;
        const dependencies = res.data.dependencies;

        if(depCount > 0)
          this.setState({ dependencies :dependencies });
        else
          this.setState({ dependencies :[] });

        this.setState({name:moduleName,version:moduleVersion});
      }
    else return;
    }

  render() {
    const treeData = this.state;
    let depList;
    if(treeData.dependencies.length > 0) {
      depList =
          <Tree key='main'  content={treeData.name + ' ' + treeData.version}  >
            {
              treeData.dependencies.map((key,index) => (
                <Tree key={index}
                    content={key[0] + ' ' + key[1]}
                      style={{color: 'blue',  verticalAlign: 'left'}}
                />
              ))
            }
          </ Tree>;
    }
    else {
      depList = <h3>No Dependencies Found</h3>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search Module dependencies</h1>
        </header>
        <UserForm getDependecies ={this.getDependecies} />
        <div id='tree'>
          {depList}
        </div>
      </div>
    );
  }
};

export default App;
