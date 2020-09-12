"use strict";

const httpService = require("./http-service");
const querystring = require("querystring");

class BrewfatherService {
  constructor(userName, apiKey) {
    const data = userName + ":" + apiKey;
    const buff = Buffer.from(data);
    const header = {
      Authorization: "Basic " + buff.toString("base64"),
    };
    httpService.headers = header;
    this.baseUrl = "https://api.brewfather.app/v1";
  }

  async getBatches(params = {}) {
    var queryParams = {
      include: params.include ? params.include.join(",") : "",
      complete: params.complete || false,
      status: params.status || "Planning",
      offset: params.offset || 0,
      limit: params.limit || 10,
    };

    var url = this.baseUrl + "/batches?" + querystring.stringify(queryParams);

    return await httpService.get(url);
  }

  async getBatch(id, include = []) {
    var url = this.baseUrl + "/batches/" + id;
    if (include.length > 0) {
      var includeParam = {
        include: include.join(",")
      };
      url +=  "&" + querystring.stringify(includeParam);
    }
    return await httpService.get(url);
  }

  async updateBatch(id, status) {
    if (!id || !status) return;

    return await httpService.patch(this.baseUrl + "/batches/" + id + "&status=" + status);
  }
}

module.exports = BrewfatherService;
