const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;

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
  iceCream: icecreamReducer,
});
const store = createStore(reducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

const actions = bindActionCreators(
  { orderCake, restockedCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockedCake(3);

actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(3);

unsubscribe();
