const _ = require('lodash');

const logsHelper = require('../helpers/logs.helper');
const httpHelper = require('../helpers/http.helper');
const fileManipulationHelper = require('../helpers/file-manipulation.helper');
const exceleFileUtilHelper = require('../helpers/excel-file-util.helper');

async function getAnlyticalDataFromFile(
  period,
  ouColumFromFile,
  dxColumnFromFile,
  valueColumnFromFile
) {
  const analyticalData = [];
  const fileDir = 'inputs';

  try {
    await logsHelper.addLogs(
      'info',
      'Discovering analytical data from the files',
      'getAnlyticalDataFromFile'
    );
    const fileNames = fileManipulationHelper.getFileNamesFromDirectories(
      fileDir
    );
    for (const fileName of fileNames) {
      const filePath = `${fileManipulationHelper.fileDir}/${fileDir}/${fileName}`;
      const excelJsonData = await exceleFileUtilHelper.getJsonDataFromExcelOrCsvFile(
        filePath
      );
      for (const sheetName of _.keys(excelJsonData)) {
        const sheetData = _.filter(
          excelJsonData[sheetName],
          (data) =>
            _.keys(data).includes(ouColumFromFile) &&
            _.keys(data).includes(dxColumnFromFile) &&
            _.keys(data).includes(valueColumnFromFile)
        );
        analyticalData.push(
          _.map(sheetData, (data) => {
            return {
              dx: data[dxColumnFromFile],
              ou: data[ouColumFromFile],
              value: data[valueColumnFromFile],
            };
          })
        );
      }
    }
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'getAnlyticalDataFromFile'
    );
  }
  return _.flattenDeep(
    _.map(_.flatMapDeep(analyticalData), (data) => {
      return { ...data, pe: `${period}` };
    })
  );
}

async function getAnlyticalDataFromServer(
  headers,
  serverUrl,
  analyticalPeriods,
  analyticalOuLevels,
  metadataConfig
) {
  const sourceResponseData = [];
  try {
    await logsHelper.addLogs(
      'info',
      `Extracting data from ${serverUrl}`,
      'getAnlyticalDataFromServer'
    );
    const url = getAnlyticalUrl(
      serverUrl,
      analyticalPeriods,
      analyticalOuLevels,
      metadataConfig
    );
    const analyticalResponse = await httpHelper.getHttp(headers, url);
    if (
      _.has(analyticalResponse, 'headers') &&
      _.has(analyticalResponse, 'rows')
    ) {
      const formattedResponse = getFormattedDataFromServer(analyticalResponse);
      sourceResponseData.push(formattedResponse);
    } else {
      await logsHelper.addLogs(
        'error',
        analyticalResponse.message || JSON.stringify(analyticalResponse),
        'getAnlyticalDataFromServer'
      );
    }
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'getAnlyticalDataFromServer'
    );
  }
  return _.flattenDeep(sourceResponseData);
}

function getFormattedDataFromServer(analyticalResponse) {
  const { headers, rows } = analyticalResponse;
  const dxIndex = _.findIndex(
    headers || [],
    (header) => header && header.name === 'dx'
  );
  const ouIndex = _.findIndex(
    headers || [],
    (header) => header && header.name === 'ou'
  );
  const peIndex = _.findIndex(
    headers || [],
    (header) => header && header.name === 'pe'
  );
  const valueIndex = _.findIndex(
    headers || [],
    (header) => header && header.name === 'value'
  );
  return _.flattenDeep(
    _.map(rows, (row) => {
      return {
        dx: row[dxIndex] || '',
        pe: row[peIndex] || '',
        ou: row[ouIndex] || '',
        value: row[valueIndex] || '',
      };
    })
  );
}

function getAnlyticalUrl(
  serverUrl,
  analyticalPeriods,
  analyticalOuLevels,
  metadataConfig
) {
  const pe = _.join(analyticalPeriods, ';');
  const ou = _.join(analyticalOuLevels, ';');
  const dx = _.join(
    _.flattenDeep(_.map(metadataConfig, (config) => config.sourceId || [])),
    ';'
  );
  return `${serverUrl}/api/analytics?dimension=dx:${dx}&dimension=pe:${pe}&dimension=ou:${ou}`;
}

module.exports = {
  getAnlyticalDataFromServer,
  getAnlyticalDataFromFile,
};
