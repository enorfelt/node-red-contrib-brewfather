module.exports = function (RED) {
  "use strict";

  function BrewfatherApiRequest(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.brewfatherConfig = RED.nodes.getNode(config.brewfatherConfig);

    node.on("input", async function (msg, send, done) {
      try {
        msg.payloadIn = msg.payload;
        var id = await _getIdValue(node, msg, config);
        config.startafter = msg.start_after ? msg.start_after : config.startafter;
        if (msg.updateBatch) {
          config.updateBatch = msg.updateBatch;
        }
        msg.payload = await node.brewfatherConfig.sendRequest(id, config);
        send(msg);
        if (done) done();
      } catch (error) {
        var message = "Something went wrong!";
        if (typeof error === "string") {
          message = error;
        } else if(error) {
          message = error.message;
        }
        if (done) done(message);
      }
    });

    function _getIdValue(node, msg, config) {
      return new Promise(function (resolve, reject) {
        if (config.propertyType === "str") {
          resolve(config.property);
        } else if (config.propertyType === "msg") {
          const path = config.property.split('.');
          const get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
          const value = get(path, msg);
          if (value === null) {
            reject("Property not found or null on path: " + config.property);
          }
          resolve(value);
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
