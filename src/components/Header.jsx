import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <header>
      { children }
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default Header;
