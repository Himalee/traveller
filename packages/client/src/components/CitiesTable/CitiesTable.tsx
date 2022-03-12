import type { FC } from 'react'
import type { City } from '../../queries'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export interface CitiesTableProps {
  cities: City[]
}

export const CitiesTable: FC<CitiesTableProps> = props => {
  const cityRows = props.cities.map(result => {
    return (
      <Tr key={result.id} data-testid="city-row">
        <Td>{result.name}</Td>
        <Td>{result.country}</Td>
      </Tr>
    )
  })

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>City</Th>
          <Th>Country</Th>
        </Tr>
      </Thead>
      <Tbody>{cityRows}</Tbody>
    </Table>
  )
}
