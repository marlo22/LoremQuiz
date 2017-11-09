import React from "react";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={ {width: `${props.value}%`} }>&nbsp;</div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired
}

export default ProgressBar;
