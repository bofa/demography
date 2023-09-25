// https://en.wikipedia.org/wiki/List_of_FIPS_country_codes

export interface Country {
  FIPS: string,
  name: string;
}

function compare(a: any, b: any) {
  if (a.name < b.name)
    return -1;
  else if (a.name > b.name)
    return 1;
  else 
    return 0;
}

export const countries = [
{
  FIPS: 'AW',
  name: 'Aruba'
},
{
  FIPS: 'AG',
  name: 'Antigua and Barbuda'
},
{
  FIPS: 'AE',
  name: 'United Arab Emirates'
},
{
  FIPS: 'AF',
  name: 'Afghanistan'
},
{
  FIPS: 'DZ',
  name: 'Algeria'
},
{
  FIPS: 'AZ',
  name: 'Azerbaijan'
},
{
  FIPS: 'AL',
  name: 'Albania'
},
{
  FIPS: 'AM',
  name: 'Armenia'
},
{
  FIPS: 'AD',
  name: 'Andorra'
},
{
  FIPS: 'AS',
  name: 'American Samoa'
},
{
  FIPS: 'AR',
  name: 'Argentina'
},
{
  FIPS: 'AU',
  name: 'Australia'
},
{
  FIPS: 'AT',
  name: 'Austria'
},






{
  FIPS: 'BH',
  name: 'Bahrain'
},
{
  FIPS: 'BB',
  name: 'Barbados'
},
{
  FIPS: 'BW',
  name: 'Botswana'
},
{
  FIPS: 'BM',
  name: 'Bermuda'
},
{
  FIPS: 'BE',
  name: 'Belgium'
},
{
  FIPS: 'BS',
  name: 'Bahamas'
},
{
  FIPS: 'BD',
  name: 'Bangladesh'
},
{
  FIPS: 'BZ',
  name: 'Belize'
},
{
  FIPS: 'BA',
  name: 'Bosnia and Herzegovina'
},
{
  FIPS: 'BL',
  name: 'Bolivia'
},
{
  FIPS: 'MM',
  name: 'Myanmar'
},
{
  FIPS: 'BJ',
  name: 'Benin'
},
{
  FIPS: 'BO',
  name: 'Belarus'
},
{
  FIPS: 'BR',
  name: 'Brazil'
},
{
  FIPS: 'BT',
  name: 'Bhutan'
},
{
  FIPS: 'BG',
  name: 'Bulgaria'
},
{
  FIPS: 'BN',
  name: 'Brunei'
},
{
  FIPS: 'BY',
  name: 'Burundi'
},






{
  FIPS: 'CA',
  name: 'Canada'
},
{
  FIPS: 'KH',
  name: 'Cambodia'
},
{
  FIPS: 'CD',
  name: 'Chad'
},
{
  FIPS: 'LK',
  name: 'Sri Lanka'
},
// TODO
// {
//   FIPS: 'CF',
//   name: 'Congo (Brazzaville)'
// },
// {
//   FIPS: 'CG',
//   name: 'Congo (Kinshasa)'
// },
{
  FIPS: 'CN',
  name: 'China'
},
{
  FIPS: 'CI',
  name: 'Chile'
},
{
  FIPS: 'CM',
  name: 'Cameroon'
},
{
  FIPS: 'KM',
  name: 'Comoros'
},
{
  FIPS: 'CO',
  name: 'Colombia'
},
{
  FIPS: 'CR',
  name: 'Costa Rica'
},
{
  FIPS: 'CF',
  name: 'Central African Republic'
},
{
  FIPS: 'CU',
  name: 'Cuba'
},
{
  FIPS: 'CV',
  name: 'Cape Verde'
},
{
  FIPS: 'CY',
  name: 'Cyprus'
},










{
  FIPS: 'DK',
  name: 'Denmark'
},
{
  FIPS: 'DJ',
  name: 'Djibouti'
},
{
  FIPS: 'DM',
  name: 'Dominica'
},
{
  FIPS: 'DO',
  name: 'Dominican Republic'
},




{
  FIPS: 'EC',
  name: 'Ecuador'
},
{
  FIPS: 'EG',
  name: 'Egypt'
},
{
  FIPS: 'IE',
  name: 'Ireland'
},
{
  FIPS: 'GQ',
  name: 'Equatorial Guinea'
},
{
  FIPS: 'EE',
  name: 'Estonia'
},
{
  FIPS: 'ER',
  name: 'Eritrea'
},
{
  FIPS: 'SV',
  name: 'El Salvador'
},
{
  FIPS: 'ET',
  name: 'Ethiopia'
},
{
  FIPS: 'CZ',
  name: 'Czech Republic'
},


// TODO
// {
//   FIPS: 'FG',
//   name: 'French Guiana'
// },
{
  FIPS: 'FI',
  name: 'Finland'
},
{
  FIPS: 'FJ',
  name: 'Fiji'
},
{
  FIPS: 'FR',
  name: 'France'
},




{
  FIPS: 'GM',
  name: 'Gambia'
},
{
  FIPS: 'GA',
  name: 'Gabon'
},
{
  FIPS: 'GE',
  name: 'Georgia'
},
{
  FIPS: 'GH',
  name: 'Ghana'
},
{
  FIPS: 'GI',
  name: 'Gibraltar'
},
{
  FIPS: 'GD',
  name: 'Grenada'
},
{
  FIPS: 'GG',
  name: 'Guernsey'
},
{
  FIPS: 'GL',
  name: 'Greenland'
},
{
  FIPS: 'DE',
  name: 'Germany'
},
{
  FIPS: 'GR',
  name: 'Greece'
},
{
  FIPS: 'GT',
  name: 'Guatemala'
},
{
  FIPS: 'GN',
  name: 'Guinea'
},
{
  FIPS: 'GY',
  name: 'Guyana'
},
// TODO
// {
//   FIPS: 'GZ',
//   name: 'Gaza Strip'
// },





{
  FIPS: 'HT',
  name: 'Haiti'
},
{
  FIPS: 'HK',
  name: 'Hong Kong'
},
{
  FIPS: 'HN',
  name: 'Honduras'
},
{
  FIPS: 'HR',
  name: 'Croatia'
},
{
  FIPS: 'HU',
  name: 'Hungary'
},







{
  FIPS: 'IS',
  name: 'Iceland'
},
{
  FIPS: 'ID',
  name: 'Indonesia'
},
{
  FIPS: 'IN',
  name: 'India'
},
{
  FIPS: 'IR',
  name: 'Iran'
},
{
  FIPS: 'IL',
  name: 'Israel'
},
{
  FIPS: 'IT',
  name: 'Italy'
},
{
  FIPS: 'IQ',
  name: 'Iraq'
},





{
  FIPS: 'JP',
  name: 'Japan'
},
{
  FIPS: 'JM',
  name: 'Jamaica'
},
{
  FIPS: 'JO',
  name: 'Jordan'
},





{
  FIPS: 'KE',
  name: 'Kenya'
},
{
  FIPS: 'KG',
  name: 'Kyrgyzstan'
},
{
  FIPS: 'KN',
  name: 'Korea, North'
},
{
  FIPS: 'KI',
  name: 'Kiribati'
},
{
  FIPS: 'KR',
  name: 'Korea, South'
},
{
  FIPS: 'KW',
  name: 'Kuwait'
},
{
  FIPS: 'XK',
  name: 'Kosovo'
},
{
  FIPS: 'KZ',
  name: 'Kazakhstan'
},




{
  FIPS: 'LA',
  name: 'Laos'
},
{
  FIPS: 'LB',
  name: 'Lebanon'
},
{
  FIPS: 'LV',
  name: 'Latvia'
},
{
  FIPS: 'LT',
  name: 'Lithuania'
},
{
  FIPS: 'LR',
  name: 'Liberia'
},
{
  FIPS: 'SK',
  name: 'Slovakia'
},
{
  FIPS: 'LI',
  name: 'Liechtenstein'
},
{
  FIPS: 'LS',
  name: 'Lesotho'
},
{
  FIPS: 'LU',
  name: 'Luxembourg'
},
{
  FIPS: 'LY',
  name: 'Libya'
},







{
  FIPS: 'MA',
  name: 'Madagascar'
},
// TODO
// {
//   FIPS: 'MB',
//   name: 'Martinique'
// },
{
  FIPS: 'MC',
  name: 'Macau'
},
{
  FIPS: 'MD',
  name: 'Moldova'
},
{
  FIPS: 'MF',
  name: 'Mayotte'
},
{
  FIPS: 'MG',
  name: 'Mongolia'
},
{
  FIPS: 'MW',
  name: 'Malawi'
},
{
  FIPS: 'ME',
  name: 'Montenegro'
},
{
  FIPS: 'MK',
  name: 'Macedonia'
},
{
  FIPS: 'ML',
  name: 'Mali'
},
{
  FIPS: 'MN',
  name: 'Monaco'
},
{
  FIPS: 'MO',
  name: 'Morocco'
},
{
  FIPS: 'MP',
  name: 'Mauritius'
},
{
  FIPS: 'MT',
  name: 'Malta'
},
{
  FIPS: 'MU',
  name: 'Oman'
},
{
  FIPS: 'MV',
  name: 'Maldives'
},
{
  FIPS: 'MX',
  name: 'Mexico'
},
{
  FIPS: 'MY',
  name: 'Malaysia'
},
{
  FIPS: 'MZ',
  name: 'Mozambique'
},





{
  FIPS: 'NC',
  name: 'New Caledonia'
},
{
  FIPS: 'NU',
  name: 'Niue'
},
{
  FIPS: 'NE',
  name: 'Niger'
},
{
  FIPS: 'NG',
  name: 'Nigeria'
},
{
  FIPS: 'NL',
  name: 'Netherlands'
},
{
  FIPS: 'NO',
  name: 'Norway'
},
{
  FIPS: 'NP',
  name: 'Nepal'
},
{
  FIPS: 'NR',
  name: 'Nauru'
},
{
  FIPS: 'NI',
  name: 'Nicaragua'
},
{
  FIPS: 'NZ',
  name: 'New Zealand'
},





{
  FIPS: 'SS',
  name: 'South Sudan'
},





{
  FIPS: 'PA',
  name: 'Paraguay'
},
{
  FIPS: 'PE',
  name: 'Peru'
},
{
  FIPS: 'PK',
  name: 'Pakistan'
},
{
  FIPS: 'PL',
  name: 'Poland'
},
{
  FIPS: 'PM',
  name: 'Panama'
},
{
  FIPS: 'PT',
  name: 'Portugal'
},
{
  FIPS: 'PG',
  name: 'Papua New Guinea'
},
{
  FIPS: 'PW',
  name: 'Palau'
},
{
  FIPS: 'GW',
  name: 'Guinea-Bissau'
},





{
  FIPS: 'QA',
  name: 'Qatar'
},






{
  FIPS: 'RS',
  name: 'Serbia'
},
{
  FIPS: 'RO',
  name: 'Romania'
},
{
  FIPS: 'PH',
  name: 'Philippines'
},
{
  FIPS: 'PR',
  name: 'Puerto Rico'
},
{
  FIPS: 'RU',
  name: 'Russia'
},
{
  FIPS: 'RW',
  name: 'Rwanda'
},





{
  FIPS: 'SA',
  name: 'Saudi Arabia'
},
{
  FIPS: 'SC',
  name: 'Seychelles'
},
{
  FIPS: 'ZA',
  name: 'South Africa'
},
{
  FIPS: 'SG',
  name: 'Senegal'
},
{
  FIPS: 'SI',
  name: 'Slovenia'
},
{
  FIPS: 'SL',
  name: 'Sierra Leone'
},
{
  FIPS: 'SM',
  name: 'San Marino'
},
{
  FIPS: 'SN',
  name: 'Singapore'
},
{
  FIPS: 'SO',
  name: 'Somalia'
},
{
  FIPS: 'ES',
  name: 'Spain'
},
{
  FIPS: 'LC',
  name: 'Saint Lucia'
},
{
  FIPS: 'SD',
  name: 'Sudan'
},
// {
//   FIPS: 'SV',
//   name: 'Svalbard'
// },
{
  FIPS: 'SE',
  name: 'Sweden'
},
{
  FIPS: 'SY',
  name: 'Syria'
},
{
  FIPS: 'CH',
  name: 'Switzerland'
},





{
  FIPS: 'TD',
  name: 'Trinidad and Tobago'
},
{
  FIPS: 'TH',
  name: 'Thailand'
},
{
  FIPS: 'TJ',
  name: 'Tajikistan'
},
{
  FIPS: 'TO',
  name: 'Tonga'
},
{
  FIPS: 'TG',
  name: 'Togo'
},
{
  FIPS: 'ST',
  name: 'Sao Tome and Principe'
},
{
  FIPS: 'TN',
  name: 'Tunisia'
},
{
  FIPS: 'TT',
  name: 'Timor-Leste'
},
{
  FIPS: 'TR',
  name: 'Turkey'
},
{
  FIPS: 'TW',
  name: 'Taiwan'
},
{
  FIPS: 'TM',
  name: 'Turkmenistan'
},
{
  FIPS: 'TZ',
  name: 'Tanzania'
},




{
  FIPS: 'UG',
  name: 'Uganda'
},
{
  FIPS: 'GB',
  name: 'United Kingdom'
},
{
  FIPS: 'UA',
  name: 'Ukraine'
},
{
  FIPS: 'US',
  name: 'United States'
},
{
  FIPS: 'BF',
  name: 'Burkina Faso'
},
{
  FIPS: 'UY',
  name: 'Uruguay'
},
{
  FIPS: 'UZ',
  name: 'Uzbekistan'
},






{
  FIPS: 'VE',
  name: 'Venezuela'
},
{
  FIPS: 'VN',
  name: 'Vietnam'
},






{
  FIPS: 'NA',
  name: 'Namibia'
},
{
  FIPS: 'WS',
  name: 'Samoa'
},
{
  FIPS: 'SZ',
  name: 'Swaziland'
},



{
  FIPS: 'YE',
  name: 'Yemen'
},



{
  FIPS: 'ZM',
  name: 'Zambia'
},
{
  FIPS: 'ZW',
  name: 'Zimbabwe'
},


].sort(compare);