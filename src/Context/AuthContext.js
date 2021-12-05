import { createContext, useReducer } from "react";

export const Auth = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log(state);
  const loginAction = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  return (
    <Auth.Provider value={{ ...state, dispatch, loginAction }}>
      {children}
    </Auth.Provider>
  );
}
