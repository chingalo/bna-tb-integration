const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');
const httpHelper = require('../helpers/http.helper');

const batchSize = 500;

async function uploadingProcessedAnalyticalData(
  headers,
  serverUrl,
  processedAnalyticalData,
  misMatchedOrganisationUnits
) {
  const httpResponse = [];
  try {
    const dataValueSets = getDataValueSetObjects(
      processedAnalyticalData,
      misMatchedOrganisationUnits
    );
    const chunkedDataSets = _.chunk(dataValueSets, batchSize);
    var count = 0;
    for (const dataValues of chunkedDataSets) {
      count++;
      console.log(`Uploading batch ${count} of ${chunkedDataSets.length}`);
      const response = await httpHelper.postHttp(
        headers,
        `${serverUrl}/api/dataValueSets.json`,
        {
          dataValues,
        }
      );
      httpResponse.push(response);
    }
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'uploadingProcessedAnalyticalData'
    );
  }
  return httpResponse;
}

function getDataValueSetObjects(
  processedAnalyticalData,
  misMatchedOrganisationUnits
) {
  return _.flattenDeep(
    _.map(processedAnalyticalData, (data) => {
      const { dx: dataElement, pe: period, ou: orgUnit, value } = data;
      // @TODO apply mapping
      return { dataElement, period, orgUnit, value };
    })
  );
}

module.exports = {
  uploadingProcessedAnalyticalData,
};
