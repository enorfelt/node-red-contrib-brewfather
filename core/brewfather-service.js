"use strict";

const httpService = require("./http-service");
const querystring = require("querystring");

class BrewfatherService {
  constructor() {
    this.baseUrl = "https://api.brewfather.app/v2";
  }

  setCredentials(userName, apiKey) {
    const data = userName + ":" + apiKey;
    const buff = Buffer.from(data);
    const header = {
      Authorization: "Basic " + buff.toString("base64"),
    };
    httpService.headers = header;
  }

  async getBatches(params = {}) {
    var queryParams = {
      include: params.include ? params.include.join(",") : "",
      complete: params.complete || false,
      status: params.status || "Planning",
      limit: params.limit || 10,
    };

    if (params.startafter) {
      queryParams.start_after = params.startafter;
    }

    var url = this.baseUrl + "/batches?" + querystring.stringify(queryParams);

    return await httpService.get(url);
  }

  async getBatch(id, include = []) {
    var url = this.baseUrl + "/batches/" + id;
    if (include.length > 0) {
      var includeParam = {
        include: include.join(",")
      };
      url +=  "?" + querystring.stringify(includeParam);
    }
    return await httpService.get(url);
  }

  async getBatchReadings(id) {
    var url = this.baseUrl + "/batches/" + id + "/readings";
    
    return await httpService.get(url);
  }

  async getBatchLastReading(id) {
    var url = this.baseUrl + "/batches/" + id + "/readings/last";
    
    return await httpService.get(url);
  }

  async getBatchBrewtracker(id) {
    var url = this.baseUrl + "/batches/" + id + "/brewtracker";
    
    return await httpService.get(url);
  }

  async updateBatch(id, config) {
    if (!id || !config) return;

    if (typeof config === 'string') {
      return await httpService.patch(this.baseUrl + "/batches/" + id + "?status=" + config);
    }

    return await httpService.patch(this.baseUrl + "/batches/" + id + "?" + querystring.stringify(config));
  }

  async getRecipes(params = {}) {
    var queryParams = {
      include: params.include ? params.include.join(",") : "",
      complete: params.complete || false,
      limit: params.limit || 10
    }

    if (params.startafter) {
      queryParams.start_after = params.startafter;
    }

    var url = this.baseUrl + "/recipes?" + querystring.stringify(queryParams);

    return await httpService.get(url);
  }

  async getRecipe(id, include = []) {
    var url = this.baseUrl + "/recipes/" + id;
    if (include.length > 0) {
      var includeParam = {
        include: include.join(",")
      };
      url +=  "?" + querystring.stringify(includeParam);
    }
    return await httpService.get(url);
  }

  async getInventories(params = {})
  {
    var queryParams = {
      inventory_negative: params.inventorynegative || false,
      include: params.include ? params.include.join(",") : "",
      complete: params.complete || false,
      inventory_exists: params.inventoryexist || false,
      limit: params.limit || 10
    }

    if (params.startafter) {
      queryParams.start_after = params.startafter;
    }

    var inventoryType = params.inventoryType || "fermentables";
    var url = this.baseUrl + "/inventory/" + inventoryType + "?" + querystring.stringify(queryParams);

    return await httpService.get(url);
  }

  async getInventory(id, inventoryType, include = []) {
    var url = this.baseUrl + "/inventory/" + inventoryType + "/" + id;
    if (include.length > 0) {
      var includeParam = {
        include: include.join(",")
      };
      url += "?" + querystring.stringify(includeParam);
    }
    return await httpService.get(url);
  }

  async updateInventory(id, inventoryType, inventory, inventoryAdjust) {
    var url = this.baseUrl + "/inventory/" + inventoryType + "/" + id;
    url += inventory !== "" ? "?inventory=" + inventory : "?inventory_adjust=" + inventoryAdjust;
    return await httpService.patch(url);
  }
}
const bfService = new BrewfatherService();
module.exports = bfService;
