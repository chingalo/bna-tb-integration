const { sourceServer, destinationServer } = require('./server-config');
const {
  metadataConfig,
  analyticalPeriods,
  analyticalOuLevels,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
} = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfig,
  analyticalOuLevels,
  analyticalPeriods,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
};
