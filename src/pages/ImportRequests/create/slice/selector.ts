import { initialState, name } from "./";

import { createSelector } from "@reduxjs/toolkit";
import generateSelectors from "./generateSelectors";

const selectDomain = (state: any) => state[name] || initialState;

const importRequestSelector: any = {
  ...generateSelectors(initialState, selectDomain),
  modal: {
    confirm: createSelector([selectDomain], (state) => state.modal.confirm),
  },
};

export default importRequestSelector;