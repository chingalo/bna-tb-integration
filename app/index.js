const { sourceConfig, destinationConfig } = require('../configs');

const logsHelper = require('../helpers/logs.helper');
const dhis2UtilHelper = require('../helpers/dhis2-util.helper');

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

    console.log({
      sourceHeaders,
      sourceUrl,
      destinationHeaders,
      destinationUrl,
    });
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, 'startApp');
  }
}

module.exports = { startApp };
