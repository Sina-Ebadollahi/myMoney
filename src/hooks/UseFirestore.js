// firebase
import { projectFireStore, timeStamp } from "../assets/Config";
// hooks
import { useReducer, useState, useEffect } from "react";

let initialState = {
  data: null,
  isPending: false,
  error: null,
  success: null,
};
const responseReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { data: null, isPending: true, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        error: null,
        success: true,
        data: action.payload,
      };
    case "ERROR":
      return {
        data: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
export const UseFirestore = (collection) => {
  const [response, dispatch] = useReducer(responseReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  // do the dispatch if isCancelled is false
  function dispatchIfNotCancelled(action) {
    if (!isCancelled) {
      dispatch(action);
    }
  }
  // collection refrence
  const fireStoreRefrence = projectFireStore.collection(collection);
  // adding document to firestore
  const addDocumentToFireStore = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addDoc = await fireStoreRefrence.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // delete document from firestore
  const deleteDocumentFromFireStore = (id) => {
    fireStoreRefrence.doc().delete();
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return {
    addDocumentToFireStore,
    deleteDocumentFromFireStore,
    response,
  };
};
