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

      if (config.endpoint === "getbatches") {
        msg.payload = await bfService.getBatches({
          include: config.include,
          complete: config.complete,
          status: config.status,
          offset: config.offset,
          limit: config.limit,
        });
      }
      if (config.endpoint === "getbatch") {
        var id = "";
        if (config.propertyType === "str") {
          id = config.property;
        } else if (config.propertyType === "msg") {
          id = msg[config.property];
        } else {
          RED.util.evaluateNodeProperty(config.property,config.propertyType,node,msg,(err,value) => {
            if (err) {
                if (done) done(err);
            } else {
                id = value;
            }
          });
        }
        msg.payload = await bfService.getBatch(id, config.include);
      }
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
