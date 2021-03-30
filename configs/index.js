const { sourceServer, destinationServer } = require('./server-config');
const { metadataConfig, analyticalPeriod } = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfig,
  analyticalPeriod,
};
