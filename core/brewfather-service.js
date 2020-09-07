"use strict";

const HttpService = require('./http-service');
const querystring = require('querystring');

class BrewfatherService {
  constructor(userName, apiKey) {
    const data = userName + ":" + apiKey;
    const buff = Buffer.from(data);
    const header = {
      Authorization: "Basic " + buff.toString("base64"),
    };
    this.httpService = new HttpService('https://api.brewfather.app/v1', header);
  }

  async getBatches(params = {}) {
    var queryParams = {
      include: params.include || '',
      complete: params.complete || false,
      status: params.status || 'Planning',
      offset: params.offset || 0,
      limit: params.limit || 10
    };

    var url = '/batches?' + querystring.stringify(queryParams);

    return await this.httpService.get(url);
  }

  async getBatch(id, include = '') {
    var url = '/batches/' + id;
    if (url !== '') {
      url += '&include=' + include;
    }
    return await this.get(url);
  }

  async updateBatch(id, status) {
    if (!id || !status)
      return;

    return await this.httpService.patch('/batches/' + id + '&status=' + status);
  }
}

module.exports = BrewfatherService;
