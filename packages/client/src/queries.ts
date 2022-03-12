import { gql } from '@apollo/client'

export interface City {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export interface CitiesResponseData {
  cities: {
    cities: City[]
  }
}

export interface CitiesRequestVars {
  filter: {
    name: string
  }
}

export const GET_CITIES = gql`
  query Cities($filter: CitiesFilters) {
    cities(filter: $filter) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`
