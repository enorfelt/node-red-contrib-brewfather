module.exports = function (RED) {
  "use strict";

  const bfService = require("./core/brewfather-service");

  function BrewfatherCredentials(n) {
    RED.nodes.createNode(this, n);

    this.sendRequest = function(id, config) {
      if (
        !this.credentials.userid ||
        !this.credentials.apikey
      ) {
        throw new Error("No userid or apikey provided");
      }
      
      bfService.setCredentials(this.credentials.userid, this.credentials.apikey);
  
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
        case "getbatchreadings":
          return bfService.getBatchReadings(id);
        case "getbatchlastreading":
          return bfService.getBatchLastReading(id);
        case "getbatchbrewtracker":
          return bfService.getBatchBrewtracker(id);
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
            inventorynegative: config.inventorynegative,
            inventoryexist: config.inventoryexist,
            offset: config.offset,
            limit: config.limit,
          });
        case "getfermentable":
          return bfService.getInventory(id, "fermentables", config.include);
        case "updatefermentable":
          return bfService.updateInventory(
            id,
            "fermentables",
            config.inventory,
            config.inventoryadjust
          );
        case "gethops":
          return bfService.getInventories({
            inventoryType: "hops",
            include: config.include,
            complete: config.complete,
            inventorynegative: config.inventorynegative,
            inventoryexist: config.inventoryexist,
            offset: config.offset,
            limit: config.limit,
          });
        case "gethop":
          return bfService.getInventory(id, "hops", config.include);
        case "updatehop":
          return bfService.updateInventory(
            id,
            "hops",
            config.inventory,
            config.inventoryadjust
          );
        case "getmiscs":
          return bfService.getInventories({
            inventoryType: "miscs",
            include: config.include,
            complete: config.complete,
            inventorynegative: config.inventorynegative,
            inventoryexist: config.inventoryexist,
            offset: config.offset,
            limit: config.limit,
          });
        case "getmisc":
          return bfService.getInventory(id, "miscs", config.include);
        case "updatemisc":
          return bfService.updateInventory(
            id,
            "miscs",
            config.inventory,
            config.inventoryadjust
          );
        case "getyeasts":
          return bfService.getInventories({
            inventoryType: "yeasts",
            include: config.include,
            complete: config.complete,
            inventorynegative: config.inventorynegative,
            inventoryexist: config.inventoryexist,
            offset: config.offset,
            limit: config.limit,
          });
        case "getyeast":
          return bfService.getInventory(id, "yeasts", config.include);
        case "updateyeast":
          return bfService.updateInventory(
            id,
            "yeasts",
            config.inventory,
            config.inventoryadjust
          );
        default:
          return new Promise(function (resolve, reject) {
            resolve("");
          });
      }
    }
  }

  RED.nodes.registerType("brewfather-credentials", BrewfatherCredentials, {
    credentials: {
      userid: { type: "text" },
      apikey: { type: "password" },
    },
  });

  function BrewfatherApiRequest(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.bfcredentials = RED.nodes.getNode(config.brewfatherCredentials);

    node.on("input", async function (msg, send, done) {
      try {
        msg.payloadIn = msg.payload;
        var id = await _getIdValue(node, msg, config);
        msg.payload = await node.bfcredentials.sendRequest(id, config);
        send(msg);
        if (done) done();
      } catch (error) {
        if (done) done(error.message || "Something went wrong!");
      }
    });

    function _getIdValue(node, msg, config) {
      return new Promise(function (resolve) {
        if (config.propertyType === "str") {
          resolve(config.property);
        } else if (config.propertyType === "msg") {
          resolve(msg[config.property]);
        } else {
          RED.util.evaluateNodeProperty(
            config.property,
            config.propertyType,
            node,
            msg,
            (err, value) => {
              if (err) {
                resolve("");
              } else {
                resolve(value);
              }
            }
          );
        }
      });
    }
  }

  RED.nodes.registerType("brewfather-api-request", BrewfatherApiRequest);
};
