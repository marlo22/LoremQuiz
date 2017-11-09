import React from "react";
import PropTypes from "prop-types";

//Components
import { Icon } from "./Icons.jsx";

export const TipsList = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <ul className="tips-list">
      { children }
    </ul>
  );
}

TipsList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export class TipsListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if(!this.props.used && !this.props.timeIsUp && !this.props.gameEnd && !this.props.highlightCorrect) {

      if(this.props.cash >= this.props.cost || this.props.cheatActive) {
        switch(this.props.type) {

          case "extraChance":
            this.props.actions.tipsExtraChance();
            break;

          case "swapQuestion":
            this.props.actions.tipsSwapQuestion();
            this.props.actions.getQuestion(this.props.levelNumber);
            break;

          case "elliminate1answer":
            this.props.actions.tipsElliminateAnswer(1);
            break;

          case "elliminate2answers":
            this.props.actions.tipsElliminateAnswer(2);
            break;

          case "freezeTime":
            this.props.actions.tipsFreezeTime();
            break;

          default:
            return;
        }
      } else {
        this.props.actions.notEnoughMoney(true);
      }
    }
  }

  render() {
    return (
      <li title={ this.props.description } className={ this.props.used? "inactive" : null } onClick={ this.onClick }>
        <Icon symbol={ this.props.symbol } /> <span>({ this.props.cost })</span>
      </li>
    );
  }
}

TipsListItem.propTypes = {
  actions: PropTypes.object.isRequired,
  cash: PropTypes.number.isRequired,
  cheatActive: PropTypes.bool.isRequired,
  cost: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  gameEnd: PropTypes.bool.isRequired,
  highlightCorrect: PropTypes.bool.isRequired,
  levelNumber: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  timeIsUp: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  used: PropTypes.bool.isRequired
}
