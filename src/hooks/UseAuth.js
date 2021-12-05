import { useContext } from "react";
import { Auth } from "../Context/AuthContext";
export default function UseAuth() {
  const AuthContext = useContext(Auth);
  if (AuthContext === undefined) {
    throw new Error("UseAuth() must be inside an AuthContetxtProvider!");
  }
  return AuthContext;
}
