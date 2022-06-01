const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// constants
const FETCH_REQUESTED = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

// action creators
const fetchRequested = () => {
  console.log("requested");
  return {
    type: FETCH_REQUESTED,
  };
};

const fetchSuccess = (users) => {
  console.log("success");
  return {
    type: FETCH_SUCCESS,
    payload: users,
  };
};

const fetchError = (errorMessage) => {
  console.log("error");
  return {
    type: FETCH_ERROR,
    payload: errorMessage,
  };
};

const reducer = (state = initialState, action) => {
  console.log("reducer");
  switch (action.type) {
    case FETCH_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case FETCH_ERROR:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  console.log("fetch users");
  return function (dispatch) {
    dispatch(fetchRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        console.log("fetched users", users);
        dispatch(fetchSuccess(users));
      })
      .catch((error) => {
        // error message
        dispatch(fetchError(error.message));
      });
  };
};

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
