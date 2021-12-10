import { createContext, useEffect, useReducer } from "react";

// firebase Authentication
import { projectAuth } from "../assets/Config";

export const Auth = createContext();
// reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  console.log(state);
  const loginAction = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  useEffect(() => {
    // is user still authenticated?
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      // unubbing
      unsub();
    });
  }, []);
  return (
    <Auth.Provider value={{ ...state, dispatch, loginAction }}>
      {children}
    </Auth.Provider>
  );
}
