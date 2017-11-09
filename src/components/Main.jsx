import React from "react";
import PropTypes from "prop-types";

const Main = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <main className={ props.className }>
      { children }
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  className: PropTypes.string
}

export default Main;
