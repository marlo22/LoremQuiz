import React from "react";
import PropTypes from "prop-types";

export const SelectMenu = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <ul className={ props.className }>
      { children }
    </ul>
  )
}

SelectMenu.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string
}

export const SelectMenuItem = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <li className="btn">
      { children }
    </li>
  )
}

SelectMenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}
