import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import { models, RootModel } from "./models";

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistPlugin: any = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: ["auth", "userData", "language"],
});

export const store = init({
  models,
  redux: {
    middlewares: [],
    enhancers: [],
    rootReducers: { RESET_APP: () => undefined },
  },
  plugins: [persistPlugin],
});

export const { dispatch } = store;
export const { getState } = store;