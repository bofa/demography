import axios from 'axios';
// import LS from 'local-storage';


function generateAgeArray() {
  let out = [];
  for(let i=0; i<=95; i+=5) {
    out.push("FPOP" + i + "_" + (i+4));
    out.push("MPOP" + i + "_" + (i+4));
  }
  return out;
}

const ageMen = generateAgeArray().filter(v => v[0] === 'M');
const ageWoman = generateAgeArray().filter(v => v[0] === 'F');

function reMap(data: any) {
  let out: any = {};
  for(let i=0; i<data[0].length; ++i) {
    if(data[0][i] && data[1][i])
      out[data[0][i]] = data[1][i];
  }
  return out;
}

interface Output {
  year: number,
  ageMen: number[],
  ageWoman: number[],
  pop: number,
}

export default function getCountry(country: string, years: number[], year: number, callback: (value: Output) => void) {
    
  // LS.clear();
  const apiKey = '09befa8408a54a731b74a37f7b816fee2346d506';
  const ageArray = generateAgeArray();

  const ageString = ageArray.join();
  
  // let localStorage = LS.get(country);
  // localStorage = localStorage ? JSON.parse(localStorage) : {};

  years
  .sort((y1, y2) => Math.abs(y1 - year) - Math.abs(y2 - year))
  .forEach(year => {
    let url = "https://api.census.gov/data/timeseries/idb/5year?get=NAME,POP," + ageString + "&FIPS=" + country + "&time=" + year + '&key=' + apiKey;

    axios.get(url)
      .then((response) => {
        const obj = reMap(response.data);

        const mapped = ({
          year: Number(obj.time),
          pop: Number(obj.POP),
          ageMen: ageMen.map(key => Number(obj[key])),
          ageWoman: ageWoman.map(key => Number(obj[key])),
        })

        callback(mapped);
        // return out;
        // return response.data;
      })
      .catch(error => {
        console.warn('Error fetching', error);
      });
  })
  
  // let pOut = Promise.all(promises).then(values => { 
  //   const obj = values.reduce((a, b) => Object.assign(a, b));
  
  //   return Object.keys(obj)
  //     .map(key => obj[key])
  //     .map(obj => ({
  //       year: Number(obj.time),
  //       pop: Number(obj.POP),
  //       ageMen: ageMen.map(key => Number(obj[key])),
  //       ageWoman: ageWoman.map(key => Number(obj[key])),
  //     }))
  // });
  
  // return pOut;
}
