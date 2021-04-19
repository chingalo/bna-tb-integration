const metadataConfig = [
  {
    sourceId: 'source_id',
    destinationId: 'destination_id',
  },
];

module.exports = {
  metadataConfig,
  analyticalPeriods: ['LAST_12_MONTHS'],
  analyticalOuLevels: ['LEVEL-2'],
  dataColumFromFile: 'name_of_column_excel_for_data_id',
  ouColumFromFile: 'name_of_colum_from_excel_for_organisation_unit_id',
};
