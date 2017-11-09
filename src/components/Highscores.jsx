import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

//Components
import SectionHeader from "../components/SectionHeader.jsx";
import Main from "../components/Main.jsx";

class Highscores extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getHighscoresData();
  }

  render() {
    let data = this.props.highscoresData;

    return (
      <div className="inner">
        <SectionHeader title="Najlepsze wyniki" />
        <Main className="highscores">
          <table className="table highscores-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nick</th>
                <th>Punkty</th>
                <th>%</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              { data.map((elem, i) => {
                return (
                  <tr key={ shortid.generate() }>
                    <td>{ `${i + 1}.` }</td>
                    <td>{ elem[1] }</td>
                    <td>{ elem[2] }</td>
                    <td>{ elem[3] }</td>
                    <td>{ elem[4] }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Main>
      </div>
    )
  }
}

export default Highscores;

Highscores.propTypes = {
  actions: PropTypes.object.isRequired,
  highscoresData: PropTypes.array.isRequired,
}
