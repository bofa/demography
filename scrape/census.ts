import axios from "axios"
import * as fs from "fs"
import { countries } from "./country-codes"

type Age = { age: number, male: number, female: number }

export function getCountry(countryCode: string) {
  return axios.get(`https://api.census.gov/data/timeseries/idb/1year?get=NAME,GENC,POP&YR=1980:2100&AGE=0:100&SEX=1,2&for=genc+standard+countries+and+areas:${countryCode}`)
    .then(response => {
      const data = response.data
      
      const years: { year: number, ages: Age[] }[] = []
      for (let yearIndex = 1; yearIndex < data.length - 202; yearIndex += 202) {
        const year = data[yearIndex][3]

        const ages: Age[] = []
        for (let ageIndex = 0; ageIndex <= 202; ageIndex += 2) {
          ages.push({
            age: ageIndex,
            male: Number(data[yearIndex + ageIndex][2]),
            female: Number(data[yearIndex + ageIndex + 1][2])
          })
        }

        years.push({ year, ages })
      }
    
      return years
    })
}

countries
// .reverse()
// .slice(0, 40)
.forEach(async (country, countryIndex) => {
  await delay(countryIndex * 1000)
  console.log('Start ' + country.code)

  const years = await getCountry(country.code)

  const output = {
    countryCode: country.code,
    name: country.name,
    years,
  }

  fs.writeFileSync(`./public/yearly/${country.code}.json`, JSON.stringify(output, null, 2))

  console.log('Done ' + country.code)
})

function delay(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(null), ms))
}