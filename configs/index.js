const { sourceServer, destinationServer } = require('./server-config');
const {
  metadataConfig,
  analyticalPeriods,
  analyticalOuLevels,
} = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfig,
  analyticalOuLevels,
  analyticalPeriods,
};
