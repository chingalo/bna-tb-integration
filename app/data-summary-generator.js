const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');
const fileManipulationHelper = require('../helpers/file-manipulation.helper');
const exceleFileUtilHelper = require('../helpers/excel-file-util.helper');

const outputsFileDir = 'outputs';
const inputFileDir = 'inputs';

async function generateSummaryReportForDataUpload(httpResponse) {
  try {
    await savingDataUploadHttpResponse(httpResponse);
    await generateSummaryOfDataImport(httpResponse);
    await generateDetailedReportForDataImport(httpResponse);
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'generateSummaryReport'
    );
  }
}

async function generateSummaryOfDataImport(httpResponse) {
  try {
    console.log(JSON.stringify(httpResponse));

    console.log(httpResponse);
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'generateSummaryOfDataImport'
    );
  }
}

async function generateDetailedReportForDataImport(httpResponse) {
  try {
    const newExcelJsonData = {};
    const fileNames = fileManipulationHelper.getFileNamesFromDirectories(
      inputFileDir
    );
    for (const fileName of fileNames) {
      const filePath = `${fileManipulationHelper.fileDir}/${inputFileDir}/${fileName}`;
      const excelJsonData = await exceleFileUtilHelper.getJsonDataFromExcelOrCsvFile(
        filePath
      );
      for (const key of _.key(excelJsonData)) {
        console.log({ key, fileName });
        // const data =
        // newExcelJsonData[key] = _.filter()
      }
    }
    if (_.key(excelJsonData).length > 0) {
      //@TODO generate  excel file
    }
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'generateDetailedReport'
    );
  }
}

async function savingDataUploadHttpResponse(httpResponse) {
  try {
    await logsHelper.addLogs(
      'info',
      'Saving http response into file',
      'savingDataUploadHttpResponse'
    );
    await fileManipulationHelper.writeToFile(
      'outputs',
      'httpResponse',
      httpResponse
    );
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'savingDataUploadHttpResponse'
    );
  }
}

module.exports = {
  generateSummaryReportForDataUpload,
};
