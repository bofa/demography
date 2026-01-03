import axios from "axios"
import * as fs from "fs"
import { countries } from "./country-codes"

// https://www.census.gov/programs-surveys/international-programs/about/idb.html
// The IDB was last updated in November 2024. The next update is planned for November 2025.

export function getCountry(countryCode: string, name: string) {
  return axios.get(
      `https://api.census.gov/data/timeseries/idb/1year?get=NAME,GENC,POP&YR=1980:2100&AGE=0:100&SEX=1,2&for=genc+standard+countries+and+areas:${countryCode}`,
      { timeout: 60000 })
    .then(response => {
      const data = response.data
        .slice(1)
        .sort((a: any[], b: any[]) => a[3] - b[3] || a[4] - b[4] || a[5] - b[5])

      if (name !== data[0][0].replaceAll(', The', '')) {
        console.log('countryCode', name, data[0][0])
      }

      const years: { year: number, male: number[], female: number[] }[] = []
      for (let yearIndex = 0; yearIndex < data.length - 202; yearIndex += 202) {
        const year = +data[yearIndex][3]

        const male: number[] = []
        const female: number[] = []
        for (let ageIndex = 0; ageIndex <= 202; ageIndex += 2) {
            male.push(Number(data[yearIndex + ageIndex][2]))
            female.push(Number(data[yearIndex + ageIndex + 1][2]))
        }

        years.push({
          year,
          male,
          female,
        })
      }
    
      return years
    })
}

countries
// .reverse()
.sort( () => .5 - Math.random() )
// .slice(0, 10)
// .filter(country => country.code === 'SE')
.forEach(async (country, countryIndex, countryArray) => {
  await delay(countryIndex * 1000)
  // console.log('Start ' + country.code)

  const years = await getCountry(country.code, country.name)

  const output = {
    code: country.code,
    name: country.name,
    years,
  }

  fs.writeFileSync(`./public/census/${country.code}.json`, JSON.stringify(output, null, 2))

  console.log(Math.round(100 * countryIndex / countryArray.length) + '%', 'Done', country.code)
})

function delay(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(null), ms))
}
