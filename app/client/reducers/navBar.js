import ApiCall from "../utils/serverCalls";
import { store } from "../store";

function navBar(state = {}, action) {
  switch (action.type) {
    case "CHANGE_NAV_KEY":
      return Object.assign({}, state, { key: action.key });
  }
  return state;
}

export default navBar;