import React from "react";
import {useHistory} from "react-router-dom";

export default (props) => {

  let history = useHistory();

  function handleClick() {
    history.push(props.link);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={props.className}
    >
      {props.children}
    </button>
  );
}