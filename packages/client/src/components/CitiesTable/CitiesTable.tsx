import type { FC } from 'react'
import type { City, CitiesResponseData, UpdateCityVars } from '../../queries'
import { Checkbox, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_CITY } from '../../queries'

export interface CitiesTableProps {
  cities: City[]
}

export const CitiesTable: FC<CitiesTableProps> = props => {
  const [updateCity, { data }] = useMutation<CitiesResponseData, UpdateCityVars>(UPDATE_CITY)

  const handleCityVisitedUpdate = (id: number, visited: boolean) => {
    updateCity({
      variables: {
        input: {
          id: id,
          visited: visited,
        },
      },
    })
  }

  const handleCityWishlistUpdate = (id: number, wishlist: boolean) => {
    updateCity({
      variables: {
        input: {
          id: id,
          wishlist: wishlist,
        },
      },
    })
  }

  const cityRows = props.cities.map(result => {
    return (
      <Tr key={result.id} data-testid="city-row">
        <Td>{result.name}</Td>
        <Td>{result.country}</Td>
        <Td>
          <Checkbox
            aria-checked={result.visited}
            aria-label="checkbox-label-city-visited"
            isChecked={result.visited}
            onChange={() => handleCityVisitedUpdate(result.id, !result.visited)}
          />
        </Td>
        <Td>
          <Checkbox
            aria-checked={result.visited}
            aria-label="checkbox-label-city-wishlist"
            isChecked={result.wishlist}
            onChange={() => handleCityWishlistUpdate(result.id, !result.wishlist)}
          />
        </Td>
      </Tr>
    )
  })

  return (
    <Table variant="simple">
      {data && <TableCaption>Updated</TableCaption>}
      <Thead>
        <Tr>
          <Th>City</Th>
          <Th>Country</Th>
          <Th>Visited</Th>
          <Th>Wishlist</Th>
        </Tr>
      </Thead>
      <Tbody>{cityRows}</Tbody>
    </Table>
  )
}
