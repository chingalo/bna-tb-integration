const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');

async function getAnlyticalDataFromServer(
  headers,
  serverUrl,
  analyticalPeriods,
  analyticalOuLevels,
  metadataConfig
) {
  const sourceResponseData = [];
  try {
    console.log({
      headers,
      serverUrl,
      analyticalPeriods,
      analyticalOuLevels,
      metadataConfig,
    });
  } catch (error) {}
  return _.flattenDeep(sourceResponseData);
}

module.exports = {
  getAnlyticalDataFromServer,
};
