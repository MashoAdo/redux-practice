const redux = require("redux");
const produce = require("immer").produce;

// state
const initState = {
  name: "nache",
  address: {
    street: "woodvale avenue",
    city: "nrb",
  },
};

// action
const updateStreet = (street) => {
  return {
    type: "UPDATE_STREET",
    payload: street,
  };
};

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_STREET":
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
  }
};

// redux store
const store = redux.createStore(reducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated", store.getState());
});

store.dispatch(updateStreet("10th street"));
