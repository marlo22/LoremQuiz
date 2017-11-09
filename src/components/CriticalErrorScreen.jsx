import React from "react";
import PropTypes from "prop-types";

import { CONSOLE_ERROR_PREFIX } from "../consts/appConsts.js";

class CriticalErrorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.error(`${CONSOLE_ERROR_PREFIX} ${this.props.criticalError}`);

    return (
      <div className="loader">
        <span>
          <i className="fa fa-frown fa-3x"></i>
        </span>
        <p className="loader-text">Upsss... Wygląda na to, że coś poszło nie tak. Spróbuj jeszcze raz uruchomić grę.</p>
      </div>
    )
  }
}

CriticalErrorScreen.propTypes = {
  criticalError: PropTypes.string
}

export default CriticalErrorScreen;
