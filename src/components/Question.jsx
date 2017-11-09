import React from "react";
import PropTypes from "prop-types";

const Question = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <span className="question stretch-block center">{ children }</span>
  );
}

Question.propTypes = {
  children: PropTypes.string.isRequired
}

export default Question;
