const { sourceServer, destinationServer } = require('./server-config');
const {
  metadataConfigs,
  analyticalPeriods,
  analyticalOuLevels,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
} = require('./meta-data-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfigs,
  analyticalOuLevels,
  analyticalPeriods,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
};
