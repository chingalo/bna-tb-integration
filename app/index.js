const {
  sourceConfig,
  destinationConfig,
  metadataConfig,
  analyticalPeriods,
  analyticalOuLevels,
} = require('../configs');

const logsHelper = require('../helpers/logs.helper');
const dhis2UtilHelper = require('../helpers/dhis2-util.helper');

const dataExtractor = require('./data-extractor');
const dataProcessor = require('./data-extractor');
const dataUploader = require('./data-uploader');

async function startApp() {
  try {
    await logsHelper.addLogs('info', `Start the process`, 'startApp');
    const sourceUrl = sourceConfig.url;
    const destinationUrl = destinationConfig.url;
    const sourceHeaders = dhis2UtilHelper.getHttpAuthorizationHeader(
      sourceConfig.username,
      sourceConfig.password
    );
    const destinationHeaders = dhis2UtilHelper.getHttpAuthorizationHeader(
      destinationConfig.username,
      destinationConfig.password
    );
    const sourceResponseData = await dataExtractor.getAnlyticalDataFromServer(
      sourceHeaders,
      sourceUrl,
      analyticalPeriods,
      analyticalOuLevels,
      metadataConfig
    );
    console.log(sourceResponseData);
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, 'startApp');
  }
}

module.exports = { startApp };
