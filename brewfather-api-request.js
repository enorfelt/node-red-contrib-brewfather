"use strict";

const bfService = require("./core/brewfather-service");

module.exports = function (RED) {


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
      try {
        msg.payload = await _requestFactory(node, msg, config)
        send(msg);
        if (done) done();
      } catch (error) {
        if (done) done(error.message || "Something went wrong!");
      }

    });
  }

  function _getIdValue(node, msg, config) {
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

  async function _requestFactory(node, msg, config) {
    var id = await _getIdValue(node, msg, config);
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
        return bfService.getBatch(id, config.include);
      case "updatebatch":
        return bfService.updateBatch(id, config.status);
      case "getrecipes":
        return bfService.getRecipes({
          include: config.include,
          complete: config.complete,
          offset: config.offset,
          limit: config.limit,
        });
      case "getrecipe":
        return bfService.getRecipe(id, config.include);
      case "getfermentables":
        return bfService.getInventories({
          inventoryType: "fermentables",
          include: config.include,
          complete: config.complete,
          inventoryexist: config.inventoryexist,
          offset: config.offset,
          limit: config.limit,
        });
      case "getfermentable":
        return bfService.getInventory(id, "fermentables", config.include);
      case "updatefermentable":
        return bfService.updateInventory(id, "fermentables", config.inventory, config.inventoryadjust);
      case "gethops":
        return bfService.getInventories({
          inventoryType: "hops",
          include: config.include,
          complete: config.complete,
          inventoryexist: config.inventoryexist,
          offset: config.offset,
          limit: config.limit,
        });
      case "gethop":
        return bfService.getInventory(id, "hops", config.include);
      case "updatehop":
        return bfService.updateInventory(id, "hops", config.inventory, config.inventoryadjust);
      case "getmiscs":
        return bfService.getInventories({
          inventoryType: "miscs",
          include: config.include,
          complete: config.complete,
          inventoryexist: config.inventoryexist,
          offset: config.offset,
          limit: config.limit,
        });
      case "getmisc":
        return bfService.getInventory(id, "miscs", config.include);
      case "updatemisc":
        return bfService.updateInventory(id, "miscs", config.inventory, config.inventoryadjust);
      case "getyeasts":
        return bfService.getInventories({
          inventoryType: "yeasts",
          include: config.include,
          complete: config.complete,
          inventoryexist: config.inventoryexist,
          offset: config.offset,
          limit: config.limit,
        });
      case "getyeast":
        return bfService.getInventory(id, "yeasts", config.include);
      case "updateyeast":
        return bfService.updateInventory(id, "yeasts", config.inventory, config.inventoryadjust);
      default:
        return new Promise(function (resolve, reject) {
          resolve("");
        });
    }
  }

  RED.nodes.registerType("brewfather-api-request", BrewfatherApiRequest, {
    credentials: {
      userid: { type: "text" },
      apikey: { type: "password" },
    },
  });
};
