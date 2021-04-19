const {
  sourceConfig,
  destinationConfig,
  metadataConfigs,
  analyticalPeriods,
  analyticalOuLevels,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile,
} = require('../configs');

const logsHelper = require('../helpers/logs.helper');
const dhis2UtilHelper = require('../helpers/dhis2-util.helper');

const dataExtractor = require('./data-extractor');
const dataProcessor = require('./data-processor');
const dataUploader = require('./data-uploader');

async function startApp(isSourceFile, manualPeriod) {
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
    console.log({
      manualPeriod,
      ouColumFromFile,
      dxColumnFromFile,
      valueColumnFromFile,
    });
    const sourceResponseData = isSourceFile
      ? await dataExtractor.getAnlyticalDataFromFile(
          manualPeriod,
          ouColumFromFile,
          dxColumnFromFile,
          valueColumnFromFile
        )
      : await dataExtractor.getAnlyticalDataFromServer(
          sourceHeaders,
          sourceUrl,
          analyticalPeriods,
          analyticalOuLevels,
          metadataConfig
        );
    const processedAnalyticalData = await dataProcessor.getProcessedAnalyticalData(
      sourceResponseData,
      metadataConfigs
    );
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, 'startApp');
  }
}

module.exports = { startApp };
