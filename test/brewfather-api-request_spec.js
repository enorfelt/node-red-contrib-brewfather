const assert = require('assert');
const should = require("should");
const helper = require("node-red-node-test-helper");
const sinon = require('sinon');
const HttpService = require('../core/http-service');
const bfApiReq = require("../brewfather-api-request.js");
 
helper.init(require.resolve('node-red'));
 
describe('brewfather-api-request Node', function () {
 
  beforeEach(function (done) {
      helper.startServer(done);
      
  });
 
  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });
 
  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "brewfather-api-request", name: "brewfather-api-request" }];
    helper.load(bfApiReq, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'brewfather-api-request');
      done();
    });
  });
 
  it('should get batches', function (done) {

    var getStub = sinon.stub(HttpService.prototype, 'get').resolves([{}, {}, {}]);

    var flow = [
      { id: "n1",
        type: "brewfather-api-request",
        name: "brewfather-api-request",
        wires:[["n2"]] 
      },
      { id: "n2", type: "helper" }
    ];
    helper.load(bfApiReq, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        console.log(msg);
        msg.should.have.property('payload');
        msg.payload.should.have.size(3);
        assert(getStub.calledWith('/batches?include=&complete=false&status=Planning&offset=0&limit=10'));
        done();
      });
      n1.receive({ payload: { } });
    });
  });
});