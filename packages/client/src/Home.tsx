import React from 'react'
import type { FC } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { gql, useLazyQuery } from '@apollo/client'

const GET_CITIES = gql`
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

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleChange = (value: string) => {
    setSearchTerm(value)
  }

  const [getCitiesBySearchTerm, { data }] = useLazyQuery(GET_CITIES)

  const cityRows = data?.cities?.cities.map(result => {
    return (
      <Tr key={result.id} data-testid="city-row">
        <Td>{result.name}</Td>
        <Td>{result.country}</Td>
      </Tr>
    )
  })

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input value={searchTerm} onChange={e => handleChange(e.target.value)} />
          <InputRightElement
            children={
              <IconButton
                aria-label=""
                icon={<Search2Icon />}
                onClick={() => getCitiesBySearchTerm({ variables: { filter: { name: searchTerm } } })}
              />
            }
          />
        </InputGroup>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>City</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>{cityRows}</Tbody>
        </Table>
      </Container>
    </VStack>
  )
}
