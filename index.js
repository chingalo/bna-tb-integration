const appp = require('./app');

const logsHelper = require('./helpers/logs.helper');

startTheProcess();
async function startTheProcess() {
  //@TODO dynamice changes for default period and source for script
  const isSourceFile = true;
  const manualPeriod = 2020;
  await logsHelper.clearLogs();
  try {
    await appp.startApp(isSourceFile, manualPeriod);
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, startTheProcess);
  }
}
