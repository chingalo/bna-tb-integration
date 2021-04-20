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
    console.log({ imported, ignored, deleted });
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'generateSummaryOfDataImport'
    );
  }
}

async function generateDetailedReportForDataImport(
  httpResponse,
  ouColumFromFile
) {
  try {
    const conflictOuIds = _.flattenDeep(
      _.map(
        _.flattenDeep(
          _.map(httpResponse || [], (data) => data.conflicts || [])
        ),
        (conflict) => conflict.object || []
      )
    );
    const fileNames = fileManipulationHelper.getFileNamesFromDirectories(
      inputFileDir
    );
    for (const fileName of fileNames) {
      const newExcelJsonData = {};
      const inputfilePath = `${fileManipulationHelper.fileDir}/${inputFileDir}/${fileName}`;
      const ouputfilePath = `${fileManipulationHelper.fileDir}/${outputsFileDir}/[Mismatched OU] ${fileName}`;
      const excelJsonData = await exceleFileUtilHelper.getJsonDataFromExcelOrCsvFile(
        inputfilePath
      );
      for (const key of _.keys(excelJsonData)) {
        const filteredJsonData = _.filter(
          excelJsonData[key],
          (data) =>
            _.keys(data).includes(ouColumFromFile) &&
            conflictOuIds.includes(data[ouColumFromFile])
        );
        if (filteredJsonData.length > 0) {
          newExcelJsonData[key] = filteredJsonData;
        }
      }
      if (_.keys(newExcelJsonData).length > 0) {
        await exceleFileUtilHelper.writeToMultipleSheetExcelFile(
          newExcelJsonData,
          ouputfilePath
        );
      }
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
