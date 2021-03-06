import { createContext, useEffect, useReducer } from "react";

// firebase Authentication
import { projectAuth } from "../assets/Config";

export const Auth = createContext();

// initializing the object
let authInitialize = {
  user: null,
  authIsReady: false,
  error: null,
};
// reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialize);
  // const loginAction = (user) => {
  //   dispatch({ type: "LOGIN", payload: user });
  // };
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "AUTH_IS_READY", payload: user });
        unsub();
      }
    });

    // const unsub = projectAuth.onAuthStateChanged((user) => {
    //   dispatch({ type: "AUTH_IS_READY", payload: user });

    //   // unsubscribing from current stream
    //   unsub();
    // });
  }, []);
  return (
    <Auth.Provider value={{ ...state, dispatch }}>{children}</Auth.Provider>
  );
}
