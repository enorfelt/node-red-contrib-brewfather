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
        msg.payload = await node.brewfatherConfig.sendRequest(id, config);
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
