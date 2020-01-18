const { expect } = require("chai");
import React from "react";
import enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const adapter = new Adapter();
enzyme.configure({ adapter });

import { ReduxTestComponent } from "../client/Components/ReduxTestComponent/ReduxTextComponent";

describe("React Component", () => {
  it("Test component for content", () => {
    const inventoryStore = [];
    const cartStore = inventoryStore;
    const items = { item: inventoryStore };

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("THIS IS A REDUX TEST COMPONENT");
  });

  it("Component passes through props", () => {
    const wrapper = mount(
      <ReduxTestComponent
        cart={[{ quantity: 2, name: "sunflower", price: 2 }]}
        user={{ name: "Jeffery" }}
        inventory={[{ quantity: 2, name: "rose", price: 2 }]}
      />
    );
    expect(wrapper.props().user.name).to.equal("Jeffery");
    expect(wrapper.props().inventory[0].name).to.equal("rose");
    expect(wrapper.props().cart[0].name).to.equal("sunflower");
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

  it("Test if component is adding items in cart", () => {
    const inventoryStore = [
      { quantity: 2, name: "rose", price: 2 },
      { quantity: 2, name: "violet", price: 5 },
      { quantity: 2, name: "blossom", price: 3 }
    ];
    const cartStore = inventoryStore;
    const items = { item: inventoryStore };

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $20");
  });

  it("If cart is empty return 'total cost 0'", () => {
    const cartStore = [];
    const items = [];
    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $0");
  });

  it("Test if component is adding new item within pre-existing cart", () => {
    const inventoryStore = [
      { quantity: 2, name: "blossom", price: 5 },
      { quantity: 2, name: "sunflower", price: 5 },
      { quantity: 2, name: "rose", price: 3 }
    ];
    const cartStore = inventoryStore;
    const items = { item: inventoryStore };

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $26");
    // adding item will update the cart
    inventoryStore.push({ quantity: 2, name: "rose", price: 2 });

    let newWrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(newWrapper.text()).to.include("TOTAL COST: $30");
  });

  it("Test if component is removing item within pre-existing cart", () => {
    const inventoryStore = [
      { quantity: 2, name: "dandelion", price: 5 },
      { quantity: 2, name: "violet", price: 5 },
      { quantity: 2, name: "blossom", price: 3 }
    ];
    const cartStore = inventoryStore;
    const items = { item: inventoryStore };

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $26");
    // removing item will update the cart
    inventoryStore.pop();
    let updatedWrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(updatedWrapper.text()).to.include("TOTAL COST: $20");
  });
  // I know the react component now has a default value for inventory.
  // But, what if our inventory item contains a negative number of quanity.
  // Once the quantity reaches zero, ignore the price.
  // This will be tested in both frontend and backend.
  it("Reducer will not add price if quantity is lower than 0", () => {
    const inventoryStore = [
      { quantity: -2, name: "rose", price: 3 },
      { quantity: -1, name: "blossom", price: 4 }
    ];
    const cartStore = inventoryStore;
    const items = { item: inventoryStore };

    const wrapper = mount(
      <ReduxTestComponent cart={cartStore} inventory={items} />
    );
    expect(wrapper.text()).to.include("TOTAL COST: $0");
  });
});
