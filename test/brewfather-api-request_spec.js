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
  beforeEach(function (done) {
    getStub = sinon.stub(httpService, "get");
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
    });
  });

  it("should be loaded", function (done) {
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
            "https://api.brewfather.app/v1/batches/1234abc&include=recipe.mash%2Crecipe.steps"
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
            "https://api.brewfather.app/v1/batches/abc1234&include=recipe.mash%2Crecipe.steps"
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
              "https://api.brewfather.app/v1/batches/idfromfoo&include=recipe.mash%2Crecipe.steps"
            )
          );  
          done();
        });
        var context = n1.context();
        var flow = context.flow;
        flow.set("foo", "idfromfoo", "memory1", function() {
          n1.receive({ payload: "" });
        });
      });
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
});
