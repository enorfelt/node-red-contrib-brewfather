const assert = require("assert");
const should = require("should");
const helper = require("node-red-node-test-helper");
var Context = require("@node-red/runtime/lib/nodes/context");
var RED = require("node-red/lib/red");
const sinon = require("sinon");
const httpService = require("../core/http-service");
const bfApiReq = require("../brewfather-api-request.js");

helper.init(require.resolve("node-red"));

describe("brewfather-api-request Node", function () {
  var getStub;
  var updateStub;
  beforeEach(function (done) {
    getStub = sinon.stub(httpService, "get");
    updateStub = sinon.stub(httpService, "patch");
    helper.startServer(done);
  });

  function initContext(done) {
    Context.init({
      contextStorage: {
        memory0: {
          module: "memory"
        },
        memory1: {
          module: "memory"
        },
        memory2: {
          module: "memory"
        }
      }
    });
    Context.load().then(function () {
      done();
    });
  }

  afterEach(function (done) {
    helper.unload().then(function () {
      return Context.clean({ allNodes: {} });
    }).then(function () {
      return Context.close();
    }).then(function () {
      helper.stopServer(done);
      getStub.restore();
      updateStub.restore();
    });
  });

  it("should load node", function (done) {
    var flow = [{ id: "n1", type: "brewfather-api-request", name: "brewfather-api-request" }];
    var credentials = {
      n1: {
        userid: "username",
        apikey: "password",
      },
    };
    helper.load(bfApiReq, flow, credentials, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property("name", "brewfather-api-request");
      done();
    });
  });

  it("should set authentication header", function (done) {
    getStub.resolves([{}, {}, {}]);
    var setHeadersSpy = sinon.spy(httpService, "headers", ["get", "set"]);

    var flow = [
      {
        id: "n1",
        type: "brewfather-api-request",
        name: "brewfather-api-request",
        wires: [["n2"]],
      },
      { id: "n2", type: "helper" },
    ];

    var credentials = {
      n1: {
        userid: "username",
        apikey: "password",
      },
    };

    helper.load(bfApiReq, flow, credentials, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        const data = credentials.n1.userid + ":" + credentials.n1.apikey;
        const buff = Buffer.from(data);
        const basic = "Basic " + buff.toString("base64");
        const header = {
          Authorization: basic,
        };
        assert(setHeadersSpy.set.calledWith(header));
        done();
      });
      n1.receive({ payload: {} });
    });
  });

  it("should return empty string on unknown endpoint", function (done) {
    var flow = [
      {
        id: "n1",
        type: "brewfather-api-request",
        name: "brewfather-api-request",
        endpoint: "unknownendpoint",
        wires: [["n2"]],
      },
      { id: "n2", type: "helper" },
    ];

    var credentials = {
      n1: {
        userid: "username",
        apikey: "password",
      },
    };

    helper.load(bfApiReq, flow, credentials, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        msg.should.have.property("payload", "");
        done();
      });
      n1.receive({ payload: {} });
    });
  });

  it("should not send message when error from api", function (done) {
    getStub.rejects();
    var flow = [
      {
        id: "n1",
        type: "brewfather-api-request",
        name: "brewfather-api-request",
        wires: [["n2"]],
        endpoint: "gethop",
        include: ["recipe.mash", "recipe.steps"],
        property: "payload",
        propertyType: "msg"
      },
      { id: "n2", type: "helper" },
    ];
    var credentials = {
      n1: {
        userid: "username",
        apikey: "password",
      },
    };
    helper.load(bfApiReq, flow, credentials, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        done(new Error("No message should have been sent"));
      });
      n1.error = function(message) {
        message.should.equal('Error');
        done();
      }
      n1.receive({ payload: "hopid" });
    });
  });

  describe("batches", function () {
    it("should get batches", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getbatches",
          include: ["recipe.mash", "recipe.steps"],
          complete: true,
          status: "Brewing",
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/batches?include=recipe.mash%2Crecipe.steps&complete=true&status=Brewing&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });


    it("should get batch with id in payload", function (done) {
      getStub.resolves({ id: "1234abc" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getbatch",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "1234abc" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/batches/1234abc?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "1234abc" });
      });
    });

    it("should get batch with id from string", function (done) {
      getStub.resolves({ id: "abc1234" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getbatch",
          include: ["recipe.mash", "recipe.steps"],
          property: "abc1234",
          propertyType: "str"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "abc1234" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/batches/abc1234?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "" });
      });
    });

    it("should get batch with id from flow", function (done) {
      getStub.resolves({ id: "idfromfoo" });
      var flow = [
        {
          id: "n1",
          z: "flow",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getbatch",
          include: ["recipe.mash", "recipe.steps"],
          property: "#:(memory1)::foo",
          propertyType: "flow"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        initContext(function () {
          var n2 = helper.getNode("n2");
          var n1 = helper.getNode("n1");
          n2.on("input", function (msg) {
            msg.should.have.property("payload", { id: "idfromfoo" });
            assert(
              getStub.calledWith(
                "https://api.brewfather.app/v1/batches/idfromfoo?include=recipe.mash%2Crecipe.steps"
              )
            );
            done();
          });
          var context = n1.context();
          var f = context.flow;
          f.set("foo", "idfromfoo", "memory1", function () {
            n1.receive({ payload: "" });
          });
        });
      });
    });

    it("should get batch with id from global", function (done) {
      getStub.resolves({ id: "idfromfoo" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getbatch",
          include: ["recipe.mash", "recipe.steps"],
          property: "#:(memory1)::foo",
          propertyType: "global"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        initContext(function () {
          var n2 = helper.getNode("n2");
          var n1 = helper.getNode("n1");
          n2.on("input", function (msg) {
            msg.should.have.property("payload", { id: "idfromfoo" });
            assert(
              getStub.calledWith(
                "https://api.brewfather.app/v1/batches/idfromfoo?include=recipe.mash%2Crecipe.steps"
              )
            );
            done();
          });
          var context = n1.context();
          var global = context.global;
          global.set("foo", "idfromfoo", "memory1", function () {
            n1.receive({ payload: "" });
          });
        });
      });
    });

    it("should update batch", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updatebatch",
          status: "Brewing",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        initContext(function () {
          var n2 = helper.getNode("n2");
          var n1 = helper.getNode("n1");
          n2.on("input", function (msg) {
            assert(
              updateStub.calledWith(
                "https://api.brewfather.app/v1/batches/idfromfoo?status=Brewing"
              )
            );
            done();
          });
          n1.receive({ payload: "idfromfoo" });
        });
      });
    });
  }); // batches

  describe("recipes", function () {
    it("should get recipes", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getrecipes",
          include: ["recipe.mash", "recipe.steps"],
          complete: true,
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/recipes?include=recipe.mash%2Crecipe.steps&complete=true&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });

    it("should get recipe", function (done) {
      getStub.resolves({ id: "recipeid" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getrecipe",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "recipeid" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/recipes/recipeid?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "recipeid" });
      });
    });
  }); // get recipes

  describe("inventory", function () {
    it("should get fermentables", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getfermentables",
          include: ["recipe.mash", "recipe.steps"],
          inventoryexist: true,
          complete: true,
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/fermentables?include=recipe.mash%2Crecipe.steps&complete=true&inventory_exists=true&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });

    it("should get fermentable", function (done) {
      getStub.resolves({ id: "fermentableid" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getfermentable",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "fermentableid" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/fermentables/fermentableid?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "fermentableid" });
      });
    });

    it("should update fermentable using adjust", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updatefermentable",
          inventoryadjust: "-10",
          inventory: "",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          assert(
            updateStub.calledWith(
              "https://api.brewfather.app/v1/inventory/fermentables/fermentableid?inventory_adjust=-10"
            )
          );
          done();
        });
        n1.receive({ payload: "fermentableid" });
      });
    });

    it("should update fermentable using set amount", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updatefermentable",
          inventoryadjust: "-10",
          inventory: "200",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          assert(
            updateStub.calledWith(
              "https://api.brewfather.app/v1/inventory/fermentables/fermentableid?inventory=200"
            )
          );
          done();
        });
        n1.receive({ payload: "fermentableid" });
      });
    });

    it("should get hops", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "gethops",
          include: ["recipe.mash", "recipe.steps"],
          inventoryexist: true,
          complete: true,
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/hops?include=recipe.mash%2Crecipe.steps&complete=true&inventory_exists=true&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });

    it("should get hop", function (done) {
      getStub.resolves({ id: "hopid" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "gethop",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "hopid" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/hops/hopid?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "hopid" });
      });
    });

    it("should update hop", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updatehop",
          inventoryadjust: "-10",
          inventory: "200",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          assert(
            updateStub.calledWith(
              "https://api.brewfather.app/v1/inventory/hops/hopid?inventory=200"
            )
          );
          done();
        });
        n1.receive({ payload: "hopid" });
      });
    });

    it("should get miscs", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getmiscs",
          include: ["recipe.mash", "recipe.steps"],
          inventoryexist: true,
          complete: true,
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/miscs?include=recipe.mash%2Crecipe.steps&complete=true&inventory_exists=true&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });

    it("should get misc", function (done) {
      getStub.resolves({ id: "miscid" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getmisc",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "miscid" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/miscs/miscid?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "miscid" });
      });
    });

    it("should update misc", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updatemisc",
          inventoryadjust: "-10",
          inventory: "200",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          assert(
            updateStub.calledWith(
              "https://api.brewfather.app/v1/inventory/miscs/miscid?inventory=200"
            )
          );
          done();
        });
        n1.receive({ payload: "miscid" });
      });
    });

    it("should get yeasts", function (done) {
      getStub.resolves([{}, {}, {}]);
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getyeasts",
          include: ["recipe.mash", "recipe.steps"],
          inventoryexist: true,
          complete: true,
          offset: 1,
          limit: 20
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload");
          msg.payload.should.have.size(3);
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/yeasts?include=recipe.mash%2Crecipe.steps&complete=true&inventory_exists=true&offset=1&limit=20"
            )
          );
          done();
        });
        n1.receive({ payload: {} });
      });
    });

    it("should get yeast", function (done) {
      getStub.resolves({ id: "yeastid" });
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "getyeast",
          include: ["recipe.mash", "recipe.steps"],
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          msg.should.have.property("payload", { id: "yeastid" });
          assert(
            getStub.calledWith(
              "https://api.brewfather.app/v1/inventory/yeasts/yeastid?include=recipe.mash%2Crecipe.steps"
            )
          );
          done();
        });
        n1.receive({ payload: "yeastid" });
      });
    });

    it("should update yeast", function (done) {
      updateStub.resolves();
      var flow = [
        {
          id: "n1",
          type: "brewfather-api-request",
          name: "brewfather-api-request",
          wires: [["n2"]],
          endpoint: "updateyeast",
          inventoryadjust: "-10",
          inventory: "200",
          property: "payload",
          propertyType: "msg"
        },
        { id: "n2", type: "helper" },
      ];
      var credentials = {
        n1: {
          userid: "username",
          apikey: "password",
        },
      };
      helper.load(bfApiReq, flow, credentials, function () {
        var n2 = helper.getNode("n2");
        var n1 = helper.getNode("n1");
        n2.on("input", function (msg) {
          assert(
            updateStub.calledWith(
              "https://api.brewfather.app/v1/inventory/yeasts/yeastid?inventory=200"
            )
          );
          done();
        });
        n1.receive({ payload: "yeastid" });
      });
    });
  }); // fermentables
});