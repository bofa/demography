import axios from 'axios'
import { DateTime } from 'luxon'

type SCBArea = {
  data: {
    key: string[]
    values: string[]
  }[]
}

const ageRanges = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "100+"
]

const startYear = 1968
const years = Array(DateTime.now().year - startYear).fill(0).map((_, i) => startYear + i)

export function getArea(areaCode) {
  return axios.post<SCBArea>(
    'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy',
    {
      "query": [
        {
          "code": "Region",
          "selection": {
            "filter": areaCode[0] === 'A'
              ? "agg:RegionA-region_2"
              : "vs:RegionKommun07",
            "values": [
              areaCode
            ]
          }
        },
        {
          "code": "Alder",
          "selection": {
            "filter": "vs:Ålder1årA",
            "values": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "80",
              "81",
              "82",
              "83",
              "84",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "92",
              "93",
              "94",
              "95",
              "96",
              "97",
              "98",
              "99",
              "100+"
            ]
          }
        },
        {
          "code": "Kon",
          "selection": {
            "filter": "item",
            "values": [
              "1",
              "2"
            ]
          }
        },
        {
          "code": "ContentsCode",
          "selection": {
            "filter": "item",
            "values": [
              "BE0101N1"
            ]
          }
        }
      ],
      "response": {
        "format": "json"
      }
    },
  )
  // .then(response => {
  //   console.log('response', response)
  //   return response
  // })
  .then((response) => {
    const table = response.data.data
      .map(d => ({
        year: d['key'][3],
        gender: d['key'][2],
        ageRange: d['key'][1],
        value: Number(d['values'][0]),
      }))
      .reduce((obj, item) => {
        obj[item.year + item.gender + item.ageRange] = item.value
        return obj
      }, {})

    const output = years.map(year => ({
      year,
      male: ageRanges.map(range => table[year + '1' + range]),
      female: ageRanges.map(range => table[year + '2' + range]),
    }))

    // console.log('output', output)

    return output
  })
}