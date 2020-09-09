"use strict";

const bent = require("bent");

class HttpService {
  constructor() {
    this._headers = {};
  }

  get headers() {
    return this._headers;
  }

  set headers(value) {
    this._headers = value;
  }

  get(url) {
    return bent("json", "GET", 200, this._headers)(url);
  }

  patch(url) {
    return bent("PATCH", 200, this._headers)(url);
  }
}

const httpService = new HttpService();

module.exports = httpService;
