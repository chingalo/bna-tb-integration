const { sourceServer, destinationServer } = require('./server-config');
const metadataConfig = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfig,
};
