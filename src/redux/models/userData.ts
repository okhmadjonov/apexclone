import { createModel } from "@rematch/core";
import { RootModel } from ".";

interface UserDataState {
  user: any;
}

const initialState: UserDataState = {
  user: null,
};

export const userData = createModel<RootModel>()({
  state: initialState, 
  reducers: {
    changeUserData(state, payload: UserDataState) {
      return { ...state, user: payload };
    },
  },

  effects: () => ({

  }),
});
