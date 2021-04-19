const { sourceServer, destinationServer } = require('./server-config');
const {
  metadataConfig,
  analyticalPeriods,
  analyticalOuLevels,
  dataColumFromFile,
  ouColumFromFile,
} = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfig,
  analyticalOuLevels,
  analyticalPeriods,
  dataColumFromFile,
  ouColumFromFile,
};
