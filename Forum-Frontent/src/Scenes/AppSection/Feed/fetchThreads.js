import { useReducer, useEffect } from "react";
import axios from "axios";
const initialState = {
  loading: true,
  error: "",
  hasNextPage: true,
  currPage: 1,
  threads: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.hasNextPage,
        threads: action.payload.threads,
        currPage: state.currPage + 1,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
function fetchThreads() {
  const LIMIT = 5;
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/threads/getThreads?page=${state.currPage}&limit=${LIMIT}`,
      )
      .then((res) => {
        const hasNextPage = Boolean(state.currPage < res.data.totalPages);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { ...res.data, hasNextPage },
        });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: { error: err } });
      });
  });
  return state;
}
export default fetchThreads;
