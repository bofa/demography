import { std, sum } from 'mathjs'
import { promises as fs } from 'fs'

const folder = process.argv
  .find(arg => arg.includes('--folder=')).split('=')[1]
  ?? './public/census'

console.log('Folder', folder)  
fs.readdir(folder)
.then(filenames =>  Promise.all(filenames.map(fileName => fs.readFile(folder + '/' + fileName, 'utf-8')
  .then(jsonString => JSON.parse(jsonString))
  .then(country => {
    const source = folder.split('/').at(-1)
    const currentYear = country.data.find(year => year.year === 2022)
    
    const noGender = currentYear.ageMen.map((_, i) => currentYear.ageMen[i] + currentYear.ageWoman[i])
    const totalPop = sum(noGender)
    
    const genderImbalance = sum(currentYear.ageMen) - sum(currentYear.ageWoman)
    const genderImbalanceDating = sum(currentYear.ageMen.slice(4, 9)) - sum(currentYear.ageWoman.slice(4, 9))
    const totalPopDating = sum(currentYear.ageMen.slice(4, 9)) + sum(currentYear.ageWoman.slice(4, 9))

    const meanAge = noGender.reduce((sum, cohort, i) => sum + (i*5 + 2.5) * cohort, 0) / totalPop
    const stdAge = std(noGender.map(cohort => cohort/totalPop))

    const children = sum(noGender.slice(0, 4))
    const workingAge = sum(noGender.slice(4, 13))
    const retieries = sum(noGender.slice(13))
    
    const year2012 = country.data.find(year => year.year === 2012)
    const totalPop2012 = sum(year2012.ageMen) + sum(year2012.ageWoman)

    return {
      source,
      fileName,
      code: country.code,
      name: country.name,
      totalPop,
      meanAge,
      stdAge,
      genderImbalance: genderImbalance/totalPop,
      genderImbalanceDating: genderImbalanceDating/totalPopDating,
      growth10Years: (totalPop - totalPop2012)/totalPop2012,
      dependencyRatio: (children + retieries)/workingAge,
      retieries: retieries/totalPop,
      children: children/totalPop,
    }
  })
))).then(data => {
  const source = folder.split('/').at(-1)
  const filename = `./src/data/${source}.json`
  fs.writeFile(filename, JSON.stringify(data, null, 2))
  console.log('Done ' + filename)
})
  