import React from "react";
import PropTypes from "prop-types";

const Loader = () => {
  return (
    <div className="loader">
      <span>
        <i className="fa fa-spinner animate-spin fa-2x"></i>
      </span>
      <span className="loader-text">Ładowanie...</span>
    </div>
  )
}

export default Loader;
