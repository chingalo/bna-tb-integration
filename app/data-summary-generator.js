const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');
const fileManipulationHelper = require('../helpers/file-manipulation.helper');
const exceleFileUtilHelper = require('../helpers/excel-file-util.helper');

const outputsFileDir = 'outputs';
const inputFileDir = 'inputs';

async function generateSummaryReportForDataUpload(
  httpResponse,
  ouColumFromFile
) {
  try {
    await savingDataUploadHttpResponse(httpResponse);
    await generateSummaryOfDataImport(httpResponse);
    await generateDetailedReportForDataImport(httpResponse, ouColumFromFile);
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'generateSummaryReport'
    );
  }
}

async function generateSummaryOfDataImport(httpResponse) {
  const fileName = 'summary.xls';
  let imported = 0;
  let ignored = 0;
  let deleted = 0;
  try {
    const importCounts = _.flattenDeep(
      _.map(httpResponse || [], (data) => data.importCount || [])
    );
    for (const importCount of importCounts) {
      imported += importCount.imported || 0;
      imported += importCount.updated || 0;
      deleted += importCount.deleted || 0;
      ignored += importCount.ignored || 0;
    }
    const filePath = `${fileManipulationHelper.fileDir}/${outputsFileDir}/${fileName}`;
    console.log({ imported, ignored, deleted, filePath });
    //await exceleFileUtilHelper.writeToSingleSheetExcelFile({imported,ignored, deleted},filePath );
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
    const conflictOuIds = _.flattenDeep(
      _.map(
        _.flattenDeep(
          _.map(httpResponse || [], (data) => data.conflicts || [])
        ),
        (conflict) => conflict.object || []
      )
    );
    const newExcelJsonData = {};
    const fileNames = fileManipulationHelper.getFileNamesFromDirectories(
      inputFileDir
    );
    console.log(conflictOuIds);
    for (const fileName of fileNames) {
      const filePath = `${fileManipulationHelper.fileDir}/${inputFileDir}/${fileName}`;
      const excelJsonData = await exceleFileUtilHelper.getJsonDataFromExcelOrCsvFile(
        filePath
      );
      for (const key of _.key(excelJsonData)) {
        console.log({ key, fileName });
        // ouColumFromFile
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
