module.exports = function (RED) {
  "use strict";

  const bfService = require("./core/brewfather-service");

  function BrewfatherConfig(n) {
    RED.nodes.createNode(this, n);

    this.sendRequest = function (id, config) {
      if (!this.credentials.userid || !this.credentials.apikey) {
        throw new Error("No userid or apikey provided");
      }

      bfService.setCredentials(
        this.credentials.userid,
        this.credentials.apikey
      );

      switch (config.endpoint) {
        case "getbatches":
          return bfService.getBatches({
            include: config.include,
            complete: config.complete,
            status: config.status,
            startafter: config.startafter,
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
          return bfService.updateBatch(id, config.updateBatch ? config.updateBatch : config.status);
        case "getrecipes":
          return bfService.getRecipes({
            include: config.include,
            complete: config.complete,
            startafter: config.startafter,
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
            startafter: config.startafter,
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
            startafter: config.startafter,
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
            startafter: config.startafter,
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
            startafter: config.startafter,
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
    };
  }

  RED.nodes.registerType("brewfather-config", BrewfatherConfig, {
    credentials: {
      userid: { type: "text" },
      apikey: { type: "password" },
    },
  });
};
