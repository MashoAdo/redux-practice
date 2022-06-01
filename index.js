const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
const { createLogger } = require("redux-logger");
const logger = createLogger();

//state
const intialCakeState = {
  numOfCakes: 10,
};
const intialIceCreamState = {
  numOfIcecreams: 20,
};

// actions
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockedCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// reducers
const cakeReducer = (state = intialCakeState, action) => {
  switch (action.type) {
    case "CAKE_ORDERED":
      return { ...state, numOfCakes: state.numOfCakes - action.payload };
    case "CAKE_RESTOCKED":
      return { ...state, numOfCakes: state.numOfCakes + action.payload };

    default:
      return state;
  }
};

const icecreamReducer = (state = intialIceCreamState, action) => {
  switch (action.type) {
    case "ICECREAM_ORDERED":
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      };
    case "ICECREAM_RESTOCKED":
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };
    default:
      return state;
  }
};

const reducer = combinedReducers({
  cake: cakeReducer,
  ish: icecreamReducer,
});
const store = createStore(reducer, applyMiddleware(logger));
// console.log("initial state", store.getState());

let changedStore;

const unsubscribe = store.subscribe(() => {
  changedStore = store.getState();
});

const actions = bindActionCreators(
  { orderCake, restockedCake, orderIcecream, restockIcecream },
  store.dispatch
);

// store.dispatch(orderCake())
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIcecream(2);

// unsubscribe();
