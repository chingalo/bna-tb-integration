const misMatchedOrganisationUnits = [
  { ouId: 'V3asekGltJx', dhis2id: 'AadoHGEAxeE' },
  { ouId: 'rPURqp5Q6Kl', dhis2id: 'uwwI1NSA6Aj' },
  { ouId: 'HQOFdDNq6sm', dhis2id: 'YMC10GjvGIV' },
  { ouId: 'ojUvqHdonjD', dhis2id: 'heAMPRttCCy' },
  { ouId: 'AFF1LIxvOKv', dhis2id: 'SuLzFKUk5OU' },
  { ouId: 'whe7uVkwqL2', dhis2id: 'TvJZLneQ1jb' },
  { ouId: 'O1HA86CoAfY', dhis2id: 'RPfRjJgDB1c' },
  { ouId: 'sVcQqPNVlHr', dhis2id: 'dzXkRSrcMBV' },
  { ouId: 'ZT74ISNUquL', dhis2id: 'ESn94JM9eXn' },
  { ouId: 'AGwQWagGY5b', dhis2id: 'Yc6Dt4UL6yl' },
  { ouId: 'c9uq0e6EjKo', dhis2id: 'g65mTIxXOHN' },
  { ouId: 'N4SQ2B4urBr', dhis2id: 'OgwGBZB5A7o' },
  { ouId: 'RT5KWWODIGK', dhis2id: 'IvVRxUCsBU7' },
  { ouId: 'ifn1XFzJkdo', dhis2id: 'I9gz5IHdb9b' },
  { ouId: 'AvpBdwmIxMz', dhis2id: 'c5kVv5pzGTQ' },
  { ouId: 'cny3dBX8R98', dhis2id: 'MmDAQRkRTju' },
  { ouId: 'ztuUXyPcHyC', dhis2id: 'xyj0gk3IEZ9' },
  { ouId: 'd0PFQornGmu', dhis2id: 'p9BwxMx8m3W' },
  { ouId: 'dvlitBGDVHX', dhis2id: 'ek7f9TTpmEh' },
  { ouId: 'KQ7LeTDnGjT', dhis2id: 'TNL0Tl37v68' },
  { ouId: 'jUPmMIBxxef', dhis2id: 'gsyJgaIP9Fl' },
  { ouId: 'IHG61qTKDlU', dhis2id: 'alC88RTMgB8' },
  { ouId: 'ggU7MKW3Tie', dhis2id: 'ShoAcioXNYX' },
  { ouId: 'guKU7rnI9rN', dhis2id: 'lyl8QTItob5' },
  { ouId: 'i9sluCDEqMS', dhis2id: 'WNBS3JfwuOR' },
  { ouId: 'j5xktQT8p7v', dhis2id: 'SbQ4nbnY5Zc' },
  { ouId: 'qZ8ZHl4cQc2', dhis2id: 'jdBQdbrw4jd' },
  { ouId: 'PkAEl9it6oS', dhis2id: 'lvlHx8Ja5M1' },
  { ouId: 'phAcJQ2lvyj', dhis2id: 'EVeLhEhq6Vd' },
  { ouId: 'PJaSj5944Jn', dhis2id: 'WnEfUl8XMvz' },
  { ouId: 'XhhOn6BYjza', dhis2id: 'WnEfUl8XMvz' },
  { ouId: 'bJsctbwpeZ1', dhis2id: 'kQxC8INwhfT' },
  { ouId: 'KyTn7F0awV9', dhis2id: 'VW7sf9oGaif' },
  { ouId: 'IENB2R8Palu', dhis2id: 'fdMq1IC5VMY' },
  { ouId: 'PQjUnOLzYdd', dhis2id: 'rC0vYuILU4M' },
  { ouId: 'EfIYfxHfhkW', dhis2id: 'Kw3NrRUf8dd' },
  { ouId: 'v301msKLofb', dhis2id: 'k1zQKGy0MdT' },
  { ouId: 'BGMhynjmGO2', dhis2id: 'oRHCvuSI6ur' },
  { ouId: 'WJZj9GKofLA', dhis2id: 'hPBwmqBQy2i' },
  { ouId: 'pOgsBHRrle6', dhis2id: 'WlUFF56THDG' },
  { ouId: 'G0FHts0MPKj', dhis2id: 'qlvUmnlcfOx' },
  { ouId: 'wPDeiznGxpB', dhis2id: 'ZEkdMcbaa6X' },
  { ouId: 'LfRRNvonJfs', dhis2id: 'vYOok9BOfHu' },
  { ouId: 'mCSLCxDkp9U', dhis2id: 'okiTu2BfqZw' },
  { ouId: 'x2Rwnz0bNbj', dhis2id: 'DX9YU0NVgA4' },
  { ouId: 'YH1A14wMeIV', dhis2id: 'siX73PeJA5F' },
  { ouId: 'mwLsJonhnJi', dhis2id: 'RZcmwRqRHIW' },
  { ouId: 'Du8aBwD0xEx', dhis2id: 'nVpSqKyTcI0' },
  { ouId: 'WXlqlLtDoBb', dhis2id: 'IGu0oJ5qUhF' },
  { ouId: 'MQh92KQR30U', dhis2id: 'S1pZweQChDr' },
  { ouId: 'HLBtRaB335N', dhis2id: 'ZNT2my1XPo2' },
  { ouId: 'SH5pDgoZ7Lh', dhis2id: 'ymiIhszR6dn' },
  { ouId: 'aRiwwuFxJtR', dhis2id: 'k11aiG1dCAS' },
  { ouId: 'CI1Xam8uZ7v', dhis2id: 'D3ZTT2eWj1m' },
  { ouId: 'n2ZgwGyN207', dhis2id: 'riEc7vyX7AK' },
  { ouId: 'lH1bbECKvWI', dhis2id: 'ee8lpkabkwr' },
  { ouId: 'JYtGmSI8Wxr', dhis2id: 'IQ1r2hd8i9I' },
  { ouId: 'YHAPsA8DUOH', dhis2id: 'zd5kBMOguwY' },
  { ouId: 'kLD1C5glXBY', dhis2id: 'pyZZWzxjpdt' },
  { ouId: 'fOE3ZJRqhtD', dhis2id: 'poe0eiUsmUs' },
  { ouId: 'whGkiIfnxN8', dhis2id: 'ZglP0cVNWkp' },
  { ouId: 'kmtJ50aulzt', dhis2id: 'XgkAJo9vxWs' },
  { ouId: 'TMigh3ZGtXR', dhis2id: 'WtigL5Ph6lW' },
  { ouId: 'pmTcP3Or7hC', dhis2id: 'aV1Q170SUPX' },
  { ouId: 'YqOLXSGlLLx', dhis2id: 'ogr1kU6uWQE' },
  { ouId: 'VGuvT91Ft1k', dhis2id: 'xXi1J4KyX97' },
  { ouId: 'DrpwBMvgULn', dhis2id: 'xjFLlaQa3RM' },
  { ouId: 'qE8oFUyXfdS', dhis2id: 'rImF6zIqpn9' },
  { ouId: 'TxynYrFLjKa', dhis2id: 'KmlVpQp09Mq' },
  { ouId: 'EbKqYqUJNbI', dhis2id: 'XAjqFqUiFuo' },
  { ouId: 'p2k6d2lnCSU', dhis2id: 'faJZOVVXCEN' },
  { ouId: 'dEIRPoG4Bdw', dhis2id: 'fyCSgZ4Si0f' },
  { ouId: 'KsRJMmcyrHT', dhis2id: 'V4q3AJxP5yT' },
];

module.exports = {
  misMatchedOrganisationUnits,
};
