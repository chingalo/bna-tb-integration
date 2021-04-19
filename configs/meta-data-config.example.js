const metadataConfigs = [
  {
    sourceId: 'source_id',
    destinationId: 'destination_id',
  },
];

module.exports = {
  metadataConfigs,
  isSourceFile: true,
  manualPeriod: 'iso_period_for_file_data',
  analyticalPeriods: ['LAST_12_MONTHS'],
  analyticalOuLevels: ['LEVEL-2'],
  dxColumnFromFile: 'name_of_column_excel_for_data_id',
  valueColumFromFile: 'name_of_column_excel_for_value',
  ouColumFromFile: 'name_of_colum_from_excel_for_organisation_unit_id',
};
