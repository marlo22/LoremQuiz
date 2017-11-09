import React from "react";
import PropTypes from "prop-types";

const Answer = (props) => {
  return (
    <li className={ "btn " + props.status }
        onClick={ props.onClick }
    >
        { props.text }
    </li>
  )
}

Answer.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
}

export default Answer;
