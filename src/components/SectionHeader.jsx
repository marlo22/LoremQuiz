import React from "react";
import PropTypes from "prop-types";

//Components
import { SimpleButton } from "../components/Buttons.jsx";
import { Icon } from "../components/Icons.jsx";

const SectionHeader = (props) => {
  return (
    <header>
      <nav>
        <SimpleButton localHref="/" transparent>
          <Icon symbol="chevron-left" />
        </SimpleButton>
        { props.title? <span className="logo">{ props.title }</span> : null }
      </nav>
    </header>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string
}

export default SectionHeader;
