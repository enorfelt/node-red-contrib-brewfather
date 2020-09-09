const assert = require("assert");
const should = require("should");
const helper = require("node-red-node-test-helper");
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

  afterEach(function (done) {
    helper.unload();
    helper.stopServer(done);
    getStub.restore();
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
      { id: "n1", type: "brewfather-api-request", name: "brewfather-api-request", wires: [["n2"]] },
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
        console.log(msg);
        msg.should.have.property("payload");
        msg.payload.should.have.size(3);
        assert(
          getStub.calledWith(
            "https://api.brewfather.app/v1/batches?include=&complete=false&status=Planning&offset=0&limit=10"
          )
        );
        done();
      });
      n1.receive({ payload: {} });
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
