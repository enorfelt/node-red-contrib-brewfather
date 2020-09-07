"use strict";

const BrewfatherService = require("./core/brewfather-service");

module.exports = function (RED) {
  function BrewfatherApiRequest(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    const bfService = new BrewfatherService(this.credentials.userId, this.credentials.apiKey);

    node.on("input", async function (msg, send, done) {
      msg.payload = await bfService.getBatches();
      send(msg);
      if (done) done();
    });
  }

  RED.nodes.registerType("brewfather-api-request", BrewfatherApiRequest, {
    credentials: {
      userId: { type: "text" },
      apiKey: { type: "password" },
    }
  });
};
