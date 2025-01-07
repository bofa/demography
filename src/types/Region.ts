export type Region = {
  countryCode: string
  name: string
  years: {
    year: number
    ages: { age: number, male: number, female: number }[]
  }[]
}

export type Pyramid = {
  year: number
  ages: { age: number, male: number, female: number }[]
}