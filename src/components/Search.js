import React from "react";

class Search extends React.Component {
  state = {
    name: "",
    version: ""
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.onSearch(this.state);
          this.setState({
            name: "",
            version: ""
          });
        }}
      >
        <label>Enter Module Name: </label>
        <input
          style={{ margin: "20px 20px", display: "inline" }}
          type="text"
          name="modulename"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <label>version: </label>
        <input
          style={{ margin: "20px 20px", display: "inline" }}
          type="text"
          name="moduleversion"
          value={this.state.version}
          onChange={e => this.setState({ version: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
