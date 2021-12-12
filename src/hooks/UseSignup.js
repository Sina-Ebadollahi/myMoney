import { useEffect, useState } from "react";
import { projectAuth } from "../assets/Config";
// import UseAuth from "./UseAuth";
export default function UseSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  // const { loginAction } = UseAuth();
  const signup = async (email, password, displayName) => {
    setError(null);
    setWaiting(true);
    try {
      // signing up user
      const signupResponse = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!signupResponse) {
        throw new Error("Could not complete the signup.");
      }
      // if (signupResponse) {
      //   loginAction(signupResponse.user.email);
      //   console.log(signupResponse.user.email);
      // }
      // displayName add
      await signupResponse.user.updateProfile({
        displayName,
      });

      if (signupResponse) {
        setSignupSuccess(true);
      }
      if (!isCancelled) {
        setWaiting(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        setError(e.message);
        setWaiting(false);
      }
    }
  };
  useEffect(() => {
    setIsCancelled(true);
  }, []);
  return { error, waiting, signup, signupSuccess };
}
