import React from "react";
import PropTypes from "prop-types";

//Components
import { Icon } from "./Icons.jsx";

class GameStatusList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notEnoughMoney: false
    }

    this.restoreDefaultState = this.restoreDefaultState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notEnoughMoney !== this.state.notEnoughMoney) {
      this.setState({
        notEnoughMoney: nextProps.notEnoughMoney
      })

      setTimeout(this.restoreDefaultState, 800)
    }
  }

  restoreDefaultState() {
    this.setState({
      notEnoughMoney: false
    })

    this.props.actions.notEnoughMoney(false);
  }

  render() {
    return (
      <ul className="game-status-list">
        <li className={ this.state.notEnoughMoney? "error-text-animated" : null }>
          <Icon symbol="money" /> { this.props.cash }
        </li>
        <li>
          <Icon symbol="heart" /> { this.props.lifes }
        </li>
      </ul>
    );
  }
}

GameStatusList.propTypes = {
  actions: PropTypes.object.isRequired,
  cash: PropTypes.number.isRequired,
  lifes: PropTypes.number.isRequired,
  notEnoughMoney: PropTypes.bool.isRequired
}

export default GameStatusList;
