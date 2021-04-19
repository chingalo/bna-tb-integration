const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');

async function getProcessedAnalyticalData(analyticalData, metadataConfigs) {
  await logsHelper.addLogs(
    'info',
    `Processing ${analyticalData.length} data values`,
    'getProcessedAnalyticalData'
  );
  return _.flatMapDeep(
    _.map(analyticalData, (data) => {
      const dx = data.dx || '';
      const dataConfig = _.find(
        metadataConfigs,
        (metadataConfig) =>
          metadataConfig &&
          metadataConfig.sourceId &&
          metadataConfig.sourceId == dx
      );
      return dataConfig && dataConfig.destinationId
        ? { ...data, dx: dataConfig.destinationId }
        : [];
    })
  );
}

module.exports = { getProcessedAnalyticalData };
