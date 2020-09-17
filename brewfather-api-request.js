"use strict";

const bfService = require("./core/brewfather-service");

module.exports = function (RED) {
  function getIdValue(node, msg, config) {
    return new Promise(function (resolve) {
      if (config.propertyType === "str") {
        resolve(config.property);
      } else if (config.propertyType === "msg") {
        resolve(msg[config.property]);
      } else {
        RED.util.evaluateNodeProperty(config.property, config.propertyType, node, msg, (err, value) => {
          if (err) {
            resolve("");
          } else {
            resolve(value);
          }
        });
      }
    });
  }



  function BrewfatherApiRequest(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    bfService.setCredentials(this.credentials.userid, this.credentials.apikey)

    node.on("input", async function (msg, send, done) {
      if (!node.credentials.userid || !node.credentials.apikey) {
        node.warn("No userid or apikey provided");
        if (done) done();
        return;
      }
      msg.payload = await requestFactory(node, msg, config)
      send(msg);
      if (done) done();
    });
  }

  async function requestFactory(node, msg, config) {
    switch (config.endpoint) {
      case "getbatches":
        return bfService.getBatches({
          include: config.include,
          complete: config.complete,
          status: config.status,
          offset: config.offset,
          limit: config.limit,
        });
      case "getbatch":
        var id = await getIdValue(node, msg, config);
        return bfService.getBatch(id, config.include);
      case "updatebatch":
        var id = await getIdValue(node, msg, config);
        return bfService.updateBatch(id, config.status);
      case "getrecipes":
        return bfService.getRecipes({
          include: config.include,
          complete: config.complete,
          offset: config.offset,
          limit: config.limit,
        });
      case "getrecipe":
        var id = await getIdValue(node, msg, config);
        return bfService.getRecipe(id, config.include);
        break;
      case "getfermentables":
        break;
      case "getfermentable":
        break;
      case "updatefermentable":
        break;
      case "gethops":
        break;
      case "gethop":
        break;
      case "updatehop":
        break;
      case "getmiscs":
        break;
      case "getmisc":
        break;
      case "updatemisc":
        break;
      case "getyeasts":
        break;
      case "getyeast":
        break;
      case "updateyeast":
        break;
      default:
        break;
    }
  }

  RED.nodes.registerType("brewfather-api-request", BrewfatherApiRequest, {
    credentials: {
      userid: { type: "text" },
      apikey: { type: "password" },
    },
  });
};
