const { expect } = require("chai");
const db = require("../server/db/database");
const Item = require("../server/db/item");
const User = require("../server/db/user");

describe("Sequelize Model", () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  it("Shows Error with empty input", async () => {
    try {
      const ItemResult = Item.build({
        id: "",
        name: "",
        size: "",
        description: ""
      });
      await ItemResult.validate();
    } catch (err) {
      expect(false).to.equal(true);
      expect(err.message).to.include("Validation notEmpty on name failed");
      expect(err.message).to.include("Validation isIn on size failed");
      expect(err.message).to.include(
        "Validation notEmpty on description failed"
      );
    }
  });

  it("Item builds sequelize with data added", async () => {
    const ItemResult = Item.build({
      id: "005bd552-3a38-4c15-9d9b-4766080490be",
      name: "Violet",
      size: "small",
      description: "cool flower"
    });
    let result = await ItemResult.validate();
    expect(result.id).to.equal("005bd552-3a38-4c15-9d9b-4766080490be");
    expect(result.name).to.equal("Violet");
    expect(result.size).to.equal("small");
    expect(result.description).to.equal("cool flower");
  });

  it("*** Image is a url and not random string", async () => {
    try {
      const ItemResult = Item.build({
        id: "005bd552-3a38-4c15-9d9b-4766080490be",
        name: "Ben",
        size: "small",
        description: "cool flower",
        imageUrl: "felowword"
      });
      await ItemResult.validate();
    } catch (err) {
      expect(err.message).to.include("Validation isUrl on imageUrl failed");
    }
  });

  it("*** Item size is a specific string: not random string", async () => {
    try {
      const ItemResult = Item.build({
        name: "005bd552-3a38-4c15-9d9b-4766080490be",
        size: "hello",
        description: "flower"
      });
      await ItemResult.validate();
    } catch (err) {
      expect(err.message).to.include(
        "Validation error: Validation isIn on size failed"
      );
    }
  });

  it("*** User has a firstname", async () => {
    try {
      const UserResult = User.build({
        firstName: "",
        lastName: "Hen",
        email: "steve@gmail.com",
        username: "awesome3",
        password: "12345",
        admin: true
      });
      let result = await UserResult.validate();
    } catch (err) {
      expect(err.message).to.include(
        "Validation error: Validation notEmpty on firstName failed"
      );
    }
  });

  it("*** User has a lastname", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "",
        email: "Ben@gmail.com",
        username: "awesome3",
        password: "12345",
        admin: true
      });
      let result = await UserResult.validate();
    } catch (err) {
      expect(err.message).to.include("Validation notEmpty on lastName failed");
    }
  });

  it("*** User has a username", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Rich",
        email: "Ben@gmail.com",
        username: "",
        password: "12345",
        admin: true
      });
      let result = await UserResult.validate();
    } catch (err) {
      expect(err.message).to.include("Validation notEmpty on username failed");
    }
  });

  it("*** User has a email has an @ symbol", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Hohn",
        email: "Bengmail.com",
        username: "awesome1",
        password: "12345",
        admin: true
      });
      let result = await UserResult.validate();
      console.log(result);
    } catch (err) {
      expect(err.message).to.include("Validation isEmail on email failed");
    }
  });

  it("*** User has a password", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Rich",
        email: "Ben@gmail.com",
        username: "awesome3",
        password: "",
        admin: true
      });
      let result = await UserResult.validate();
    } catch (err) {
      expect(err.message).to.include("Validation notEmpty on password failed");
    }
  });

  it("*** User can be a Admin", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Rich",
        email: "Ben@gmail.com",
        username: "awesome3",
        password: "223",
        admin: true
      });
      let result = await UserResult.validate();
      expect(result.dataValues.admin).to.equal(true);
    } catch (err) {
      throw err;
    }
  });

  it("*** User who are not Admin", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Rich",
        email: "Ben@gmail.com",
        username: "awesome3",
        password: "2345",
        admin: false
      });
      let result = await UserResult.validate();
      expect(result.dataValues.admin).to.equal(false);
    } catch (err) {
      throw err;
    }
  });
  it("*** Image url is an actual url", async () => {
    try {
      const UserResult = User.build({
        firstName: "Ben",
        lastName: "Rich",
        email: "Ben@gmail.com",
        username: "awesome3",
        password: "2345",
        admin: false,
        imageUrl: "ddf"
      });
      await UserResult.validate();
    } catch (err) {
      expect(err.message).to.contain("Validation isUrl on imageUrl failed");
    }
  });
});
