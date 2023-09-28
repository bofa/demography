import axios from 'axios'

const years = Array.from({length: (2050 - 1980)}, (v, k) => k + 1980);
const ageMen = generateAgeArray().filter(v => v[0] === 'M');
const ageWoman = generateAgeArray().filter(v => v[0] === 'F');

export function getCountry(country) {
  const calls$ = years.map((year, index) => new Promise((resolve) => setTimeout(() => resolve(), index*50))
    .then(() => getForYear(country, year)))

  return Promise.all(calls$)
}

const apiKey = '09befa8408a54a731b74a37f7b816fee2346d506';
const ageArray = generateAgeArray();
const ageString = ageArray.join();
export function getForYear(country, year) {

  const url = "https://api.census.gov/data/timeseries/idb/5year?get=NAME,POP," + ageString + "&for=genc+standard+countries+and+areas:" + country + "&time=" + year + '&key=' + apiKey;

  return axios.get(url)
    .then(response => {
      if(response.status === 204) {
        throw new Error('No Data ' + country)
      }

      return response;
    })
    .then((response) => {
      const obj = reMap(response.data);

      const mapped = ({
        year: Number(obj.time),
        pop: Number(obj.POP),
        ageMen: ageMen.map(key => Number(obj[key])),
        ageWoman: ageWoman.map(key => Number(obj[key])),
      })

      return mapped;
    })
}

function generateAgeArray() {
  let out = [];
  for(let i=0; i<=95; i+=5) {
    out.push("FPOP" + i + "_" + (i+4));
    out.push("MPOP" + i + "_" + (i+4));
  }
  return out;
}

function reMap(data) {
  let out = {};
  for(let i=0; i<data[0].length; ++i) {
    if(data[0][i] && data[1][i])
      out[data[0][i]] = data[1][i];
  }
  return out;
}