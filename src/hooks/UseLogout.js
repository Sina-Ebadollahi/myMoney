import UseAuth from "./UseAuth";
import { useEffect, useState } from "react";
import { projectAuth } from "../assets/Config";

export default function UseLogout() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [waiting, setWating] = useState(false);
  const { dispatch } = UseAuth();

  const logOut = async () => {
    setWating(true);
    try {
      const logoutAction = await projectAuth.signOut();
      if (!logoutAction) {
        throw new Error("Could not logout");
      }
      if (logoutAction) {
        dispatch({ type: "LOGOUT", payload: null });
      }
      if (!isCancelled) {
        setWating(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setWating(false);
        setError(err.message);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { logOut, error, waiting };
}
