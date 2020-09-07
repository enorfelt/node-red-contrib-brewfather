"use strict";

const bent = require("bent");

class HttpService {

  constructor(baseUrl, headers = {}) {
    this.bentGet = bent(baseUrl, "json", "GET", 200, headers);
    this.bentPatch = bent(baseUrl, 'PATCH', 200, headers);
  }

  get(url) {
    return this.bentGet(url);
  }

  patch(url) {
    return bent(this.baseUrl, 'PATCH', 200, this.headers);
  }
};

module.exports = HttpService;