import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

//Components
import SectionHeader from "../components/SectionHeader.jsx";
import Main from "../components/Main.jsx";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: this.props.categories.toObject? this.props.categories.toObject() : this.props.categories,
      bugsReporting: this.props.bugsReporting,
      cheatActive: this.props.cheatActive,
      playerName: this.props.playerName,
      submitScores: this.props.submitScores
    }

    this.playerNameChange = this.playerNameChange.bind(this);
    this.categoriesChange = this.categoriesChange.bind(this);
    this.cheatActiveChange = this.cheatActiveChange.bind(this);
    this.submitScoresChange = this.submitScoresChange.bind(this);
    this.bugsReportingChange = this.bugsReportingChange.bind(this);
  }

  playerNameChange(e) {
    clearTimeout(this.playerNameTimeout);

    let value = e.target.value;
    this.setState({
      playerName: value
    });

    this.playerNameTimeout = setTimeout(() => {
      this.props.actions.changePlayerName(value);
    }, 800);
  }

  categoriesChange(categoryKey, value) {
    clearTimeout(this.categoriesTimeout);

    this.setState({
      categories: {
        ...this.state.categories,
        [categoryKey]: {
          ...this.state.categories[categoryKey],
          available: value
        }
      }
    });

    this.categoriesTimeout = setTimeout(() => this.props.actions.changeCategories(this.state.categories), 500);
  }

  cheatActiveChange(e) {
    let value = e.target.checked;

    this.setState({
      cheatActive: value
    });

    this.props.actions.changeCheatActive(value);
  }

  submitScoresChange(e) {
    let value = e.target.checked;

    this.setState({
      submitScores: value
    });

    this.props.actions.changeSubmitScores(value);
  }

  bugsReportingChange(e) {
    let value = e.target.checked;

    this.setState({
      bugsReporting: value
    });

    this.props.actions.changeBugsReporting(value);
  }

  render() {
    let categories = this.state.categories,
        categoriesKeys = Object.keys(categories);

    return (
      <div className="inner">
        <SectionHeader title="Ustawienia" />
        <Main className="settings">
          <table className="table settings-table">
            <thead>
              <tr>
                <td colSpan="2">Ustawienia główne</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Twój nick: </td>
                <td>
                  <input
                    type="text"
                    value={ this.state.playerName }
                    onChange={ this.playerNameChange }
                  />
                </td>
              </tr>
              <tr>
                <td>Kategorie pytań:</td>
                <td>
                  { categoriesKeys.map((key, i) => {
                      let elem = categories[key];

                      return (
                        <span key={ shortid.generate() }>
                          <input
                            type="checkbox"
                            checked={ elem.available }
                            onChange={ (e) => this.categoriesChange(key, e.target.checked) }
                          />
                          { elem.name }
                        </span>
                      );
                  }) }
                </td>
              </tr>
              <tr>
                <td>Potwierdzanie akceptacji pytania: </td>
                <td><input type="checkbox" disabled /></td>
              </tr>
              <tr>
                <td>Wysyłaj moje wyniki na serwer: </td>
                <td>
                  <input
                    type="checkbox"
                    checked={ this.state.submitScores }
                    onChange={ this.submitScoresChange }
                  />
                </td>
              </tr>
              <tr>
                <td>Tryb oszusta: </td>
                <td>
                  <input
                    type="checkbox"
                    checked={ this.state.cheatActive }
                    onChange={ this.cheatActiveChange }
                  />
                </td>
              </tr>
              <tr>
                <td>Raportowanie błędów: </td>
                <td>
                  <input
                    type="checkbox"
                    checked={ this.state.bugsReporting }
                    onChange={ this.bugsReportingChange }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Main>
      </div>
    )
  }
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  bugsReporting: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  cheatActive: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  submitScores: PropTypes.bool.isRequired,
}

export default Settings;
