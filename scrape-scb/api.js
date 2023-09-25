import axios from 'axios'
import { DateTime } from 'luxon'

const ageRanges = [
  "-4",
  "5-9",
  "10-14",
  "15-19",
  "20-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80-84",
  "85-89",
  "90-94",
  "95-99",
  "100+",
  "us"
]

const startYear = 1968
const years = Array(DateTime.now().year - startYear).fill(0).map((_, i) => startYear + i)

export function getArea(areaCode) {
  return axios.post(
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
            "filter": "agg:Ålder5år",
            "values": [
              "-4",
              "5-9",
              "10-14",
              "15-19",
              "20-24",
              "25-29",
              "30-34",
              "35-39",
              "40-44",
              "45-49",
              "50-54",
              "55-59",
              "60-64",
              "65-69",
              "70-74",
              "75-79",
              "80-84",
              "85-89",
              "90-94",
              "95-99",
              "100+",
              "us"
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
  .then(response => {
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
      ageMen: ageRanges.map(range => table[year + '1' + range]),
      ageWoman: ageRanges.map(range => table[year + '2' + range]),
    }))

    console.log('output', output)

    return output
  })
}