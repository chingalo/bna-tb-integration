const { isSourceFile, manualPeriod: period } = require('./configs');

const appp = require('./app');

const logsHelper = require('./helpers/logs.helper');

startTheProcess();
async function startTheProcess() {
  await logsHelper.clearLogs();
  try {
    await appp.startApp(isSourceFile, period);
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, startTheProcess);
  }
}
