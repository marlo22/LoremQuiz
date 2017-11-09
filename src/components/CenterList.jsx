import React from "react";
import PropTypes from "prop-types";

const CenterList = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <div className="list-outer">
      <div className="list-inner">
        { children }
      </div>
    </div>
  );
}

CenterList.propTypes = {
  children: function(props, propsName, componentName) {
    if(props.children.type !== "ul") {
      return new Error("Invalid children passed to " + componentName + "! This component accept only one <ul> list.");
    }
  }
}

export default CenterList;
