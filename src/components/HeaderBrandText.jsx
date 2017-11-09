import React from "react";
import PropTypes from "prop-types";

const HeaderBrandText = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <span className="logo">{ children }</span>
  )
}

HeaderBrandText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default HeaderBrandText;
