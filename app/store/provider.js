"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { loadAppState, saveAppState } from "../lib/storage";
import { actions, createAppStore } from "./store";

export function StoreProvider({ children }) {
  const [store] = useState(createAppStore);

  useEffect(() => {
    const savedState = loadAppState();

    if (savedState) {
      store.dispatch(actions.hydrate(savedState));
    }

    return store.subscribe(() => saveAppState(store.getState()));
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
