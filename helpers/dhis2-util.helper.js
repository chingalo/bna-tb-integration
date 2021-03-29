const _ = require('lodash');
const logsHelper = require('./logs.helper');

function uid() {
  const letters = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const allowedChars = '0123456789' + letters;
  const NUMBER_OF_CODEPOINTS = allowedChars.length;
  const CODESIZE = 11;
  let uid;
  uid = letters.charAt(Math.random() * letters.length);
  for (let i = 1; i < CODESIZE; ++i) {
    uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
  }
  return uid;
}

function getHttpAuthorizationHeader(username, password) {
  return {
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' + new Buffer.from(`${username}:${password}`).toString('base64'),
  };
}

function getExcelDateToJSDate(date) {
  return getFormattedDate(new Date(Math.round((date - 25569) * 86400 * 1000)));
}

function getFormattedDate(date) {
  let dateObject = new Date(date);
  if (isNaN(dateObject.getDate())) {
    dateObject = new Date();
  }
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return (
    year +
    (month > 9 ? `-${month}` : `-0${month}`) +
    (day > 9 ? `-${day}` : `-0${day}`)
  );
}

async function getNextDay(date, numberOfDays = 1) {
  const currentDay = date ? new Date(date) : new Date();
  const nextDay = new Date(currentDay);
  nextDay.setDate(currentDay.getDate() + numberOfDays);
  return getFormattedDate(nextDay);
}

async function getPrevioustDay(date, numberOfDays = 1) {
  const currentDay = date ? new Date(date) : new Date();
  const previousDay = new Date(currentDay);
  previousDay.setDate(currentDay.getDate() - numberOfDays);
  return getFormattedDate(previousDay);
}

function getExcelSheetName(sheetName) {
  sheetName = _.join(
    _.filter(sheetName.split('/'), (key) => key.trim() !== ''),
    '_'
  );
  return _.join(
    _.filter(sheetName.split(' '), (key) => key.trim() !== ''),
    '_'
  );
}

async function getExcelFileValueByColumns(excelRowObject, columnValues = []) {
  let excelColumnValue = '';
  try {
    for (const column of columnValues) {
      excelColumnValue = excelRowObject[column] || excelColumnValue;
    }
  } catch (error) {
    await logsHelper.addLogs(
      'error',
      error.message || error,
      'getExcelFileValueByColumns'
    );
  }
  return excelColumnValue;
}

module.exports = {
  uid,
  getHttpAuthorizationHeader,
  getFormattedDate,
  getExcelDateToJSDate,
  getNextDay,
  getPrevioustDay,
  getExcelSheetName,
  getExcelFileValueByColumns,
};
