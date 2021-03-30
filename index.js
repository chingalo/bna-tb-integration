const appp = require('./app');

const logsHelper = require('./helpers/logs.helper');

startTheProcess();
async function startTheProcess() {
  await logsHelper.clearLogs();
  try {
    await appp.startApp();
  } catch (error) {
    await logsHelper.addLogs('error', error.message || error, startTheProcess);
  }
}
