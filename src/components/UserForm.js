import React from 'react';

const UserForm = (props) => {
  return (
    <form onSubmit={props.getDependecies}>
        <label>Enter Module Name: </label><input style={{ margin:"20px 20px", display:"inline" }} type="text" name="modulename"/>
        <label>version: </label><input style={{ margin:"20px 20px", display:"inline" }} type="text" name="moduleversion"/>
      <button>Submit</button>
    </form>
  );
}

export default UserForm;
