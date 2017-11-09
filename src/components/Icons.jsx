import React from "react";
import PropTypes from "prop-types";

export const Icon = (props) => {
  return (
    <i className={ "fa fa-" + props.symbol } aria-hidden="true"></i>
  );
}

Icon.propTypes = {
  symbol: PropTypes.string.isRequired
}

export const SpinIcon = (props) => {
  return (
    <i className={ "fa fa-" + props.symbol + " animate-spin" } aria-hidden="true"></i>
  )
}

SpinIcon.propTypes = {
  symbol: PropTypes.string.isRequired
}
