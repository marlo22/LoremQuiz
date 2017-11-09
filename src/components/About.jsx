import React from "react";
import PropTypes from "prop-types";

//Components
import SectionHeader from "./SectionHeader.jsx";
import Main from "./Main.jsx";

const About = () => {
  return (
    <div className="inner">
      <SectionHeader title="O grze" />
      <Main className="about">
        <span className="title">Kilka słów o grze...</span>
        <p>
          Być może zastanawiasz się Drogi Graczu dlaczego nazwałem tę grę „LoremQuiz”. Stało się tak, dlatego, że nie miałem po prostu lepszego pomysłu. ;)
          „Lorem Ipsum” to bardzo popularny fragment tekstu napisanego po łacinie, którego używa się m.in. w grafice komputerowej do wypełniania projektów przykładową treścią.
          Stwierdziłem, że pożyczę sobie „Lorem” dodam do niego „Quiz” i będzie to wystarczająco ciekawa i oryginalna nazwa. ;)
        </p>
        <p>
          Jeśli chodzi o aspekty techniczne to gra została zbudowana w oparciu o bardzo popularną bibliotekę JavaScript o nazwie React (we współpracy m.in. z Reduxem i React Routerem). Myślę, że jakieś 75% kodu to właśnie JS, reszta to HTML w połączeniu z CSS.
          Przy budowaniu gry bardzo pomogały mi takie narzędzia i technologie jak np. Gulp, BrowserSync, Webpack (w postaci wtyczki do wymienionego wcześniej Gulpa), Sass czy Babel.
        </p>
        <p>
          Jeżeli masz jakieś pomysły/uwagi/pytania dotyczące gry możesz się ze mną skontaktować pisząc na maila: marcin.1993@poczta.fm.
        </p>
      </Main>
    </div>
  )
}

export default About;
