import React from "react";
import PropTypes from "prop-types";

//Components
import { Icon } from "./Icons.jsx";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      timeIsUp: this.props.timeIsUp
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.frozenTime) {
      clearInterval(this.interval);
    }

    if(!nextProps.timeIsUp) {
      //RESET TIMER - If nextProps val !== state val && time isn't frozen this means a new question
      if(nextProps.value !== this.state.value && !nextProps.frozenTime) {
        this.setState({
          value: nextProps.value,
          timeIsUp: nextProps.timeIsUp
        })
      }

      if(!nextProps.frozenTime) {
        this.interval = setInterval(() => {

          if(this.state.value > 0) {
            this.setState({
              value: this.state.value - 1
            })
          } else {
            this.props.actions.timeIsUp();
            this.props.actions.incorrectAnswer();

            this.setState({
              timeIsUp: true
            })

            clearInterval(this.interval);
          }

        }, 1000);
      }
    }
    }

  componentDidMount() {
    this.interval = setInterval(() => {

      if(this.state.value > 0) {
        this.setState({
          value: this.state.value - 1
        })
      } else {
        this.props.actions.timeIsUp();
        this.props.actions.incorrectAnswer();

        this.setState({
          timeIsUp: true
        })

        clearInterval(this.interval);
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span className={ this.state.timeIsUp? "timer stretch-block center error-text" : "timer stretch-block center"}>
        <Icon symbol="clock-o" /> { this.state.value } s.
      </span>
    );
  }
}

Timer.propTypes = {
  actions: PropTypes.object.isRequired,
  frozenTime: PropTypes.bool.isRequired,
  timeIsUp: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
}

export default Timer;
