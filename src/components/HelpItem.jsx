import React from "react";
import PropTypes from "prop-types";

const HelpItem = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <div>
      <p className="title">{ props.title }</p>
      { children }
    </div>
  )
}

HelpItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  title: PropTypes.string.isRequired
}

export default HelpItem;
