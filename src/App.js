import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Tree from 'react-animated-tree'

import UserForm from "./components/UserForm";

class App extends Component {

  state = {
    name:String,
    version:String,
    dependencies: []
  }

  printData = (key,val,e) =>{
    //e.preventDefault();
    console.log(key + " " + val);
  }

  getDependecies = (e) => {
    e.preventDefault();
    const moduleName = e.target.elements.modulename.value.trim();
    const moduleVersion = e.target.elements.moduleversion.value.trim();
    //const moduleName = 'express';
    //const moduleVersion = 'latest';
    if (moduleName && moduleVersion) {
      let url = 'http://localhost:8000/getModuleDependencies/'+ moduleName +'/'+ moduleVersion;
      console.log(url);
      axios.get(url).then((res) => {
        console.log(res.data.dependencies);
        const depCount = res.data.count;
        const dependencies = res.data.dependencies;

        if(depCount > 0)
          this.setState({ dependencies :dependencies });
        else
          this.setState({ dependencies :[] });

        this.setState({name:moduleName,version:moduleVersion});
      })
    } else return;
  }

  render() {
    const treeData = this.state;
    let depList;
    if(treeData.dependencies.length > 0) {
      depList =  treeData.dependencies.map((key) => (
          <Tree content={key[0] + ' ' + key[1]} style={{color: 'blue',  verticalAlign: 'left'}} canHide open onClick={this.printData(key[0], key[1])}/>
      ));
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
        <Tree  content={treeData.name + ' ' + treeData.version} open visible canHide>
          {depList}
        </ Tree>
      </div>
    );
  }
};

export default App;
