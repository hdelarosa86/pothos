const { expect } = require("chai");
import React from "react";
import enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  itemFetchFailure,
  itemFetchStart,
  itemFetchSuccess,
  itemsFetchStartAsync
} from "../client/Redux/Items/actions/items.actions";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import RootReducer from "../client/Redux/rootReducer";
import { createStore } from "redux";
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  isFetching: false,
  errorMessage: "",
  items: []
};

const adapter = new Adapter();
enzyme.configure({ adapter });

import mockAxios from "./mock-axios";
import { ReduxTestComponent } from "../client/Components/ReduxTestComponent/ReduxTextComponent";

describe("React Component", () => {
  it("Test component for content", () => {
    const inventoryStore = [
      { items: [{ quantity: 2, name: "sunflower", price: 2 }] }
    ];
    const cartStore = inventoryStore;
    const itemsFetchAStartAsync = () => {
      return "run Func";
    };
    const wrapper = mount(
      <ReduxTestComponent
        cart={cartStore}
        inventory={inventoryStore}
        itemsFetchStartAsync={itemsFetchAStartAsync}
      />
    );
    expect(wrapper.text()).to.include("THIS IS A REDUX TEST COMPONENT");
  });

  it("Component passes through props", () => {
    const itemsFetchAStartAsync = () => {
      return "run Func";
    };
    const wrapper = mount(
      <ReduxTestComponent
        cart={[{ cartContent: [{ quantity: 2, name: "sunflower", price: 2 }] }]}
        user={{ name: "Jeffery" }}
        inventory={[{ items: [{ quantity: 2, name: "rose", price: 2 }] }]}
        itemsFetchStartAsync={itemsFetchAStartAsync}
      />
    );
    expect(wrapper.props().user.name).to.equal("Jeffery");
    expect(wrapper.props().inventory[0].items[0].name).to.equal("rose");
    expect(wrapper.props().cart[0].cartContent[0].name).to.equal("sunflower");
  });
  // The component must create a render message when a user is added
  xit("User's name appears when component is rendered", () => {
    const cartStore = [];
    const items = [];

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} user={[]} />
    );
    console.log(wrapper.prop().length);
    expect(wrapper.text()).to.include("Welcome ...");
  });
  // The component must create a render message when a user doesn't exist
  xit("A message should appear if user doesn't exist", () => {
    const cartStore = [];
    const items = [];
    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} user={[]} />
    );
    expect(wrapper.text()).to.include("Hello");
  });
  // The component must create a render message when a user doesn't exist
  xit("A message should appear if item in inventory doesn't exist", () => {
    const cartStore = [];
    const items = [];
    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} user={[]} />
    );
    expect(wrapper.text()).to.include("No more plants to sell");
  });

  it("If cart is empty return 'total cost 0'", () => {
    const itemsFetchAStartAsync = () => {
      return "run Func";
    };
    const wrapper = mount(
      <ReduxTestComponent
        cart={[]}
        user={{ name: "Jeffery" }}
        inventory={[]}
        itemsFetchStartAsync={itemsFetchAStartAsync}
      />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $0");
  });
});

describe("Redux", () => {
  let fakeStore;
  beforeEach(() => {
    fakeStore = mockStore(initialState);
  });

  describe("set items", () => {
    const flowers = [
      {
        id: "005bd552-3a38-4c15-9d9b-4766080490be",
        name: "Sunflower",
        size: "small",
        description: "cool flower"
      },
      {
        id: "8765c897-a95d-4c93-ae79-ed7cd5848f01",
        name: "rose",
        size: "small",
        description: "not flower"
      }
    ];
    const error = "This is an error";

    it("Fetch start Items action creator", () => {
      expect(itemFetchStart()).to.deep.equal({
        type: "FETCH_START"
      });
    });

    it("Fetch success Items action creator", () => {
      expect(itemFetchSuccess(flowers)).to.deep.equal({
        type: "FETCH_SUCCESS",
        payload: flowers
      });
    });

    it("Fetch failure Items action creator", () => {
      expect(itemFetchFailure(error)).to.deep.equal({
        type: "FETCH_FAILURE",
        payload: error
      });
    });

    it("Fetch Thunk creator", async () => {
      mockAxios.onGet("/api/items/").replyOnce(200, flowers);
      await fakeStore.dispatch(itemsFetchStartAsync());
      const actions = fakeStore.getActions();
      expect(actions[0].type).to.equal("FETCH_START");
      expect(actions[1].type).to.equal("FETCH_SUCCESS");
      expect(actions[1].payload).to.equal(flowers);
    });
  });
});

describe("reducer", () => {
  let testStore;
  beforeEach(() => {
    testStore = createStore(RootReducer);
  });

  it("*** returns the initial state by default", () => {
    expect(testStore.getState().inventory.items).to.be.deep.equal(
      initialState.items
    );
  });
});
