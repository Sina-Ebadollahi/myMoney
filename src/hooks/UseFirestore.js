// firebase
import { projectFireStore } from "../assets/Config";
// hooks
import { useReducer, useState, useEffect } from "react";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const responseReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const UseFirestore = (collection) => {
  const [response, dispatch] = useReducer(responseReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection refrence
  const fireStoreRefrence = projectFireStore.collection(collection);
  // adding document to firestore
  const addDocumentToFireStore = (doc) => {};
  // get data from firestore
  const getDocumentFromFireStore = () => {};
  // delete document from firestore
  const deleteDocumentFromFireStore = (id) => {};
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return {
    addDocumentToFireStore,
    getDocumentFromFireStore,
    deleteDocumentFromFireStore,
    response,
  };
};
