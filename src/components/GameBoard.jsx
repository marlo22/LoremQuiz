import React from "react";
import PropTypes from "prop-types";

const GameBoard = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <div className="game-board">
      { children }
    </div>
  );
}

GameBoard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default GameBoard;
