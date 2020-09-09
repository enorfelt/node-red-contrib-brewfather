"use strict";

const BrewfatherService = require("./core/brewfather-service");

module.exports = function (RED) {
  function BrewfatherApiRequest(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    const bfService = new BrewfatherService(this.credentials.userid, this.credentials.apikey);

    node.on("input", async function (msg, send, done) {
      if (!node.credentials.userid || !node.credentials.apikey) {
        node.warn("No userid or apikey provided");
        if (done) done();
        return;
      }
      msg.payload = await bfService.getBatches({
        include: config.include.join(","),
        complete: config.complete,
        status: config.status,
        offset: config.offset,
        limit: config.limit,
      });
      send(msg);
      if (done) done();
    });
  }

  RED.nodes.registerType("brewfather-api-request", BrewfatherApiRequest, {
    credentials: {
      userid: { type: "text" },
      apikey: { type: "password" },
    },
  });
};
