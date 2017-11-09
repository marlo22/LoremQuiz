import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { BRAND } from "../consts/appConsts.js";

//Components
import Loader from "./Loader.jsx";
import CriticalErrorScreenContainer from "../containers/CriticalErrorScreenContainer.js";
import Header from "./Header.jsx";
import HeaderBrandText from "./HeaderBrandText.jsx";
import Main from "./Main.jsx";
import { SelectMenu, SelectMenuItem } from "./SelectMenu.jsx";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.loadLSSettings();
    this.props.actions.loadCategories();
  }

  render() {
    return (
      <div className="inner">
        { this.props.criticalError? <CriticalErrorScreenContainer /> : null }
        { this.props.gameLoaded? null : <Loader /> }
        <Header>
          <HeaderBrandText>{ BRAND }</HeaderBrandText>
        </Header>
        <Main>
          <SelectMenu className="start-menu">
            <SelectMenuItem><Link to="/game">Nowa gra</Link></SelectMenuItem>
            <SelectMenuItem><Link to="/highscores">Najlepsze wyniki</Link></SelectMenuItem>
            <SelectMenuItem><Link to="/settings">Opcje</Link></SelectMenuItem>
            <SelectMenuItem><Link to="/help">Pomoc</Link></SelectMenuItem>
            <SelectMenuItem><Link to="/about">O grze</Link></SelectMenuItem>
          </SelectMenu>
        </Main>
      </div>
    )
  }
}

MainMenu.propTypes = {
  actions: PropTypes.object.isRequired,
  criticalError: PropTypes.string,
  gameLoaded: PropTypes.bool.isRequired
}

export default MainMenu;
