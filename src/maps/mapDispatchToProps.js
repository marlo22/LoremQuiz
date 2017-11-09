import actions from "../actions/actions.js";
import { bindActionCreators } from "redux";

export default function mapDispatchToProps(dispatch) {

  const actionsCreators = function() {
    var actionsObj = {},
        i,
        actionsLength = actions.length;

    for(i = 0; i < actionsLength; i += 1) {
      actionsObj = {
        ...actionsObj,
        ...actions[i]
      };
    }

    return actionsObj;
  };

  return {
    actions: bindActionCreators(actionsCreators(), dispatch)
    // actions: {
    //   applyLSSettings: (settings) => dispatch(action.applyLSSettings(settings)),
    //   sendQuery: (tag) => dispatch(action.sendQuery(tag))
    // }
  };
}
