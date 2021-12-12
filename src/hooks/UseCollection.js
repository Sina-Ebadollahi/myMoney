// firebase
import { useEffect, useReducer, useRef } from "react";
import { projectFireStore } from "../assets/Config";

let getCollectionObject = {
  success: false,
  getData: null,
  error: null,
};
const getCollectionReducer = (state, action) => {
  switch (action.type) {
    case "GET_DOCUMENT":
      return { ...state, success: true, getData: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const UseCollection = (collection, _query, _orderBy) => {
  const [getResponse, dispatch] = useReducer(
    getCollectionReducer,
    getCollectionObject
  );
  // preventing a infinite loop in useEffect
  const query = useRef(_query).current;
  // ordering query
  const orderby = useRef(_orderBy).current;
  useEffect(() => {
    let firestoreCollectionRefrence = projectFireStore.collection(collection);
    if (query) {
      firestoreCollectionRefrence = firestoreCollectionRefrence.where(...query);
    }
    if (orderby) {
      firestoreCollectionRefrence = firestoreCollectionRefrence.orderBy(
        ...orderby
      );
    }
    const unSubscribeFromFirestore = firestoreCollectionRefrence.onSnapshot(
      (snapshot) => {
        let snapshotResults = [];
        snapshot.docs.forEach((each) => {
          snapshotResults.push({ ...each.data(), id: each.id });
          // update state
          dispatch({ type: "GET_DOCUMENT", payload: snapshotResults });
        });
      },
      (err) => {
        dispatch({ type: "ERROR", payload: err.message });
      }
    );
    // unsubsribe on unmounted
    return () => {
      unSubscribeFromFirestore();
    };
  }, [collection, query, orderby]);
  return { ...getResponse };
};
