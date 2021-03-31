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
    const url = getAnlyticalUrl(
      serverUrl,
      analyticalPeriods,
      analyticalOuLevels,
      metadataConfig
    );
    console.log({ url, headers });
  } catch (error) {}
  return _.flattenDeep(sourceResponseData);
}

function getAnlyticalUrl(
  serverUrl,
  analyticalPeriods,
  analyticalOuLevels,
  metadataConfig
) {
  const pe = _.join(analyticalPeriods, ';');
  const ou = _.join(analyticalOuLevels, ';');
  const dx = _.join(
    _.flattenDeep(_.map(metadataConfig, (config) => config.sourceId || [])),
    ';'
  );
  return `${serverUrl}/api/analytics?dimension=dx:${dx}dimension=pe:${pe}&dimension=ou:${ou}`;
}

module.exports = {
  getAnlyticalDataFromServer,
};
