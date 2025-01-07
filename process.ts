import { std, sum } from 'mathjs'
import { promises as fs } from 'fs'

type Country = {
  countryCode: string,
  name: string,
  years: {
    year: string
    ages: {
      age: number
      male: number
      female: number
    }[]
  }[]
}

const baseYear = 2023

const folder = process.argv
  .find(arg => arg.includes('--folder='))?.split('=')[1]
  ?? './public/yearly'

console.log('Folder', folder)  
fs.readdir(folder)
.then(filenames =>  Promise.all(filenames.map(fileName => fs.readFile(folder + '/' + fileName, 'utf-8')
  .then(jsonString => JSON.parse(jsonString))
  .then((country: Country) => {
    const source = folder.split('/').at(-1)

    if(!country.years) {
      console.log('error', source, fileName, country)
      throw new Error('No data')
    }

    const currentYear = country.years.find(year => +year.year === baseYear)

    if(!currentYear) {
      console.log('error', source, fileName, currentYear)
      throw new Error('No current year')
    }
    
    const male = currentYear.ages.map(age => age.male)
    const female = currentYear.ages.map(age => age.female)
    const noGender = currentYear.ages.map(age => age.male + age.female)
    const totalPop = sum(noGender)
    const children = sum(noGender.slice(0, 4))
    const working = sum(noGender.slice(4, 13))
    const retieries = sum(noGender.slice(13))
    
    const genderImbalance = sum(male) - sum(female)
    const genderImbalanceDating = sum(male.slice(20, 45)) - sum(female.slice(20, 45))
    const totalPopDating = sum(noGender.slice(20, 45))

    const meanAge = noGender.reduce((sum, cohort, i) => sum + (i*5 + 2.5) * cohort, 0) / totalPop
    const stdAge = std(noGender.map(cohort => cohort/totalPop))
    
    // const year10 = country.years.find(year => year.year === baseYear - 10)
    const year10 = country.years.find(year => +year.year === baseYear - 10)!

    if (!year10) {
      console.log('error', source, fileName, year10)
      throw new Error('No 10 year back')
    } 

    const noGender10 = year10.ages.map(age => age.male + age.female)
    const totalPop10 = sum(noGender10)
    const children10 = sum(noGender10.slice(0, 4))
    const working10 = sum(noGender10.slice(4, 13))
    const retieries10 = sum(noGender10.slice(13))

    return {
      source,
      fileName,
      code: country.countryCode,
      name: country.name,
      totalPop,
      meanAge,
      stdAge,
      genderImbalance: genderImbalance/totalPop,
      genderImbalanceWorking: genderImbalanceDating/totalPopDating,
      dependencyRatio: (children + retieries)/working,
      retieries: retieries/totalPop,
      children: children/totalPop,
      growthTotal10: (totalPop - totalPop10)/totalPop10,
      growthChildren10: (children - children10)/totalPop10,
      growthWorking10: (working - working10)/totalPop10,
      growthRetieries10: (retieries - retieries10)/totalPop10,
    }
  })
))).then(data => {
  const source = folder.split('/').at(-1)
  const filename = `./src/assets/${source}.json`
  fs.writeFile(filename, JSON.stringify(data, null, 2))
  console.log('Done ' + filename)
})
  