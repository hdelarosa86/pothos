const { JSDOM } = require("jsdom");
import Store, { resetStore } from "../client/Redux/store";
// This JS file will reset store for testing and allow enzyme to render component.
Store.nextDispatch = () => {
  return new Promise(resolve => {
    const unsubscribe = Store.subscribe(() => {
      resolve();
      unsubscribe();
    });
  });
};

beforeEach(() => {
  Store.dispatch(resetStore());
});

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};
