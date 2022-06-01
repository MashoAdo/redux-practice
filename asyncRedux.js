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
  return {
    type: FETCH_REQUESTED,
  };
};

const fetchSuccess = (users) => {
  return {
    type: FETCH_SUCCESS,
    payload: users,
  };
};

const fetchError = (errorMessage) => {
  return {
    type: FETCH_ERROR,
    payload: errorMessage,
  };
};

const reducer = (state = initialState, action) => {
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
  return function (dispatch) {
    dispatch(fetchRequested());

    axios
      .get("https://jsonplaceholder.typicode.com/users")

      .then((response) => {
        const users = response.data.map((user) => user.id);
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
