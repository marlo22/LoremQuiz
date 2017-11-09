import React from "react";
import PropTypes from "prop-types";

import { Icon, SpinIcon } from "./Icons.jsx";

class SendingScoreStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: 0,
      msg: "",
      symbol: null
    }

    this.setStatus = this.setStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setStatus(nextProps.sendScoreStatus);
  }

  componentWillMount() {
    this.setStatus(this.props.sendScoreStatus);
  }

  setStatus(code) {
    switch(code) {
      case -1:
        this.setState({
          code,
          msg: "Wystąpił błąd podczas wysyłania wyniku na serwer!",
          symbol: <Icon symbol="exclamation-triangle" />
        })
        break;
      case 1:
        this.setState({
          code,
          msg: "Trwa wysyłanie wyniku na serwer...",
          symbol: <SpinIcon symbol="spinner" />
        })
        break;
      case 2:
        this.setState({
          code,
          msg: "Wynik został wysłany!",
          symbol: <Icon symbol="check" />
        })
        break;
      default:
        this.setState({
          code: 0,
          msg: ""
        })
        break;
    }
  }

  render() {
    return (
      <p className="center sending-status">
        { this.state.symbol? this.state.symbol : null }
        { ` ${this.state.msg}` }
      </p>
    )
  }
}

SendingScoreStatus.propTypes = {
  sendScoreStatus: PropTypes.number.isRequired
}

export default SendingScoreStatus;
