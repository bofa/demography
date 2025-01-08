export type Region = {
  countryCode: string
  name: string
  years: Pyramid[]
}

export type Pyramid = {
  year: number
  ages: { age: number, male: number, female: number }[]
}