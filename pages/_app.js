import "@/styles/globals.css";
import React from "react";

const FavMovies =
  typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem("FavMovies"))
    : false;
const globalState = {
  favsId: FavMovies ? [...FavMovies] : [],
};

export const globalStateContext = React.createContext(globalState);
export const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    globalState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}
