import { reducer as formReducer } from "redux-form";
import { CREATE_CONTRACT_SUCCESS } from "../actions/contracts";

export default formReducer.plugin({
  invoice: (state, action) => {
    switch (action.type) {
      case CREATE_CONTRACT_SUCCESS:
        return undefined;
      default:
        return state;
    }
  },
});
