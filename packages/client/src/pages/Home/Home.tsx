import React from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useLazyQuery } from '@apollo/client'
import { GET_CITIES } from '../../queries'
import type { CitiesRequestVars, CitiesResponseData } from '../../queries'
import { CitiesTable } from '../../components/CitiesTable/CitiesTable'

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleChange = (value: string) => {
    setSearchTerm(value)
  }

  const fetchCitiesBySearchTerm = () =>
    getCitiesBySearchTerm({
      variables: {
        filter: {
          name: searchTerm,
        },
      },
    })

  const handleKeyEvent = (event: { key: string }) => {
    if (event.key === 'Enter') {
      fetchCitiesBySearchTerm().then(() => {})
    }
  }

  const [getCitiesBySearchTerm, { data }] = useLazyQuery<CitiesResponseData, CitiesRequestVars>(GET_CITIES)
  const fetchedCities = data?.cities?.cities

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input value={searchTerm} onChange={e => handleChange(e.target.value)} onKeyPress={handleKeyEvent} />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} onClick={fetchCitiesBySearchTerm} />} />
        </InputGroup>

        {fetchedCities && <CitiesTable cities={fetchedCities} />}
        {fetchedCities?.length === 0 && <Text fontSize="lg">No results found</Text>}
      </Container>
    </VStack>
  )
}
