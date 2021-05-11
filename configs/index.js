const { sourceServer, destinationServer } = require('./server-config');
const {
  metadataConfigs,
  isSourceFile,
  manualPeriod,
  analyticalPeriods,
  analyticalOuLevels,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
} = require('./meta-data-config');
const { misMatchedOrganisationUnits } = require('./organisation-unit-config');

module.exports = {
  sourceConfig: sourceServer,
  destinationConfig: destinationServer,
  metadataConfigs,
  isSourceFile,
  manualPeriod,
  analyticalOuLevels,
  analyticalPeriods,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
  misMatchedOrganisationUnits,
};
