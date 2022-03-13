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

export interface UpdateCityVars {
  input: {
    id: number
    visited?: boolean
    wishlist?: boolean
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

export const UPDATE_CITY = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      name
      country
      visited
      wishlist
    }
  }
`
