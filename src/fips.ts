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

export default [
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
  FIPS: 'AG',
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
  FIPS: 'AS',
  name: 'Australia'
},
{
  FIPS: 'AU',
  name: 'Austria'
},






{
  FIPS: 'BA',
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
  FIPS: 'BD',
  name: 'Bermuda'
},
{
  FIPS: 'BE',
  name: 'Belgium'
},
{
  FIPS: 'BF',
  name: 'Bahamas, The'
},
{
  FIPS: 'BG',
  name: 'Bangladesh'
},
{
  FIPS: 'BH',
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
  FIPS: 'BM',
  name: 'Burma'
},
{
  FIPS: 'BN',
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
{
  FIPS: 'CF',
  name: 'Congo (Brazzaville)'
},
{
  FIPS: 'CG',
  name: 'Congo (Kinshasa)'
},
{
  FIPS: 'CH',
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
  FIPS: 'CN',
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
  FIPS: 'CT',
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
  FIPS: 'DO',
  name: 'Dominica'
},
{
  FIPS: 'DR',
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
  FIPS: 'EK',
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
  FIPS: 'ES',
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



{
  FIPS: 'FG',
  name: 'French Guiana'
},
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
  FIPS: 'GA',
  name: 'Gambia, The'
},
{
  FIPS: 'GB',
  name: 'Gabon'
},
{
  FIPS: 'GG',
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
  FIPS: 'GJ',
  name: 'Grenada'
},
{
  FIPS: 'GK',
  name: 'Guernsey'
},
{
  FIPS: 'GL',
  name: 'Greenland'
},
{
  FIPS: 'GM',
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
  FIPS: 'GV',
  name: 'Guinea'
},
{
  FIPS: 'GY',
  name: 'Guyana'
},
{
  FIPS: 'GZ',
  name: 'Gaza Strip'
},





{
  FIPS: 'HT',
  name: 'Haiti'
},
{
  FIPS: 'HK',
  name: 'Hong Kong'
},
{
  FIPS: 'HO',
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
  FIPS: 'IS',
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
  FIPS: 'KR',
  name: 'Kiribati'
},
{
  FIPS: 'KR',
  name: 'Korea, South'
},
{
  FIPS: 'KU',
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
  FIPS: 'LI',
  name: 'Liberia'
},
{
  FIPS: 'SK',
  name: 'Slovakia'
},
{
  FIPS: 'LS',
  name: 'Liechtenstein'
},
{
  FIPS: 'LT',
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
{
  FIPS: 'MB',
  name: 'Martinique'
},
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
  FIPS: 'MJ',
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
  FIPS: 'NE',
  name: 'Niue'
},
{
  FIPS: 'NG',
  name: 'Niger'
},
{
  FIPS: 'NI',
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
  FIPS: 'NU',
  name: 'Nicaragua'
},
{
  FIPS: 'NZ',
  name: 'New Zealand'
},





{
  FIPS: 'OD',
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
  FIPS: 'PP',
  name: 'Papua New Guinea'
},
{
  FIPS: 'PS',
  name: 'Palau'
},
{
  FIPS: 'PU',
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
  FIPS: 'RQ',
  name: 'Puerto Rico'
},
{
  FIPS: 'RS',
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
  FIPS: 'SE',
  name: 'Seychelles'
},
{
  FIPS: 'ZQ',
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
  FIPS: 'ST',
  name: 'Saint Lucia'
},
{
  FIPS: 'SU',
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
  FIPS: 'SZ',
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
  FIPS: 'TI',
  name: 'Tajikistan'
},
{
  FIPS: 'TN',
  name: 'Tonga'
},
{
  FIPS: 'TO',
  name: 'Togo'
},
{
  FIPS: 'TP',
  name: 'Sao Tome and Principe'
},
{
  FIPS: 'TS',
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
  FIPS: 'TX',
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
  FIPS: 'UV',
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
  FIPS: 'WA',
  name: 'Namibia'
},
{
  FIPS: 'WS',
  name: 'Samoa'
},
{
  FIPS: 'WZ',
  name: 'Swaziland'
},



{
  FIPS: 'YE',
  name: 'Yemen'
},



{
  FIPS: 'ZA',
  name: 'Zambia'
},
{
  FIPS: 'ZW',
  name: 'Zimbabwe'
},


].sort(compare);