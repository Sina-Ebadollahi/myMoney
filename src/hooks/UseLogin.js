import { useEffect, useState } from "react";
import { projectAuth } from "../assets/Config";
import UseAuth from "./UseAuth";
export default function UseLogin() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const { dispatch } = UseAuth();
  const login = async (email, password) => {
    setWaiting(true);
    try {
      const loginResponse = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (!loginResponse) {
        throw new Error("Could not login right now!");
      }
      if (loginResponse) {
        dispatch({ type: "LOGIN", payload: loginResponse.user });
      }
      if (!isCancelled) {
        setWaiting(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setWaiting(false);
        setError(err.message);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { error, waiting, login };
}
