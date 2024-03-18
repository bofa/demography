import { std, sum } from 'mathjs'
import { promises as fs } from 'fs'

const baseYear = 2022

const folder = process.argv
  .find(arg => arg.includes('--folder=')).split('=')[1]
  ?? './public/census'

console.log('Folder', folder)  
fs.readdir(folder)
.then(filenames =>  Promise.all(filenames.map(fileName => fs.readFile(folder + '/' + fileName, 'utf-8')
  .then(jsonString => JSON.parse(jsonString))
  .then(country => {
    const source = folder.split('/').at(-1)
    
    if(!country.data) {
      console.log('error', country)
    }

    const currentYear = country.data.find(year => year.year === baseYear)
    
    const noGender = currentYear.ageMen.map((_, i) => currentYear.ageMen[i] + currentYear.ageWoman[i])
    const totalPop = sum(noGender)
    const children = sum(noGender.slice(0, 4))
    const working = sum(noGender.slice(4, 13))
    const retieries = sum(noGender.slice(13))
    
    const genderImbalance = sum(currentYear.ageMen) - sum(currentYear.ageWoman)
    const genderImbalanceDating = sum(currentYear.ageMen.slice(4, 9)) - sum(currentYear.ageWoman.slice(4, 9))
    const totalPopDating = sum(currentYear.ageMen.slice(4, 9)) + sum(currentYear.ageWoman.slice(4, 9))

    const meanAge = noGender.reduce((sum, cohort, i) => sum + (i*5 + 2.5) * cohort, 0) / totalPop
    const stdAge = std(noGender.map(cohort => cohort/totalPop))
    
    const year10 = country.data.find(year => year.year === baseYear - 10)
    const noGender10 = year10.ageMen.map((_, i) => year10.ageMen[i] + year10.ageWoman[i])
    const totalPop10 = sum(noGender10)
    const children10 = sum(noGender10.slice(0, 4))
    const working10 = sum(noGender10.slice(4, 13))
    const retieries10 = sum(noGender10.slice(13))

    return {
      source,
      fileName,
      code: country.code,
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
  const filename = `./src/data/${source}.json`
  fs.writeFile(filename, JSON.stringify(data, null, 2))
  console.log('Done ' + filename)
})
  