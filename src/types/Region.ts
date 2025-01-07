export type Region = {
  countryCode: string
  name: string
  years: Pyramid[]
}

export type Pyramid = {
  year: string
  ages: { age: number, male: number, female: number }[]
}