import React from "react";
//import Tree from "react-animated-tree";
import { getDependencies } from "./services/npm";

export default class Dependency extends React.Component {
  state = {
    dependencies: []
  };

  componentDidMount() {
    if(this.props.loadDepth > 0) {
      this.loadDependencies()
    }
  }

  loadDependencies = async () => {
    this.setState({
      dependencies: await getDependencies(
        this.props.module.name,
        this.props.module.version
      )
    });
  };

  render() {

    return (
      <li onClick={this.loadDependencies}>
        <div>{this.props.module.name} @ {this.props.module.version} </div>
        <ul>
        {
            this.state.dependencies.map(dep => (
                <Dependency loadDepth={this.props.loadDepth-1} module={dep} key={`${dep.name}@${dep.version}`} />
            ))
        }
        </ul>
      </li>
    );
  }
}
