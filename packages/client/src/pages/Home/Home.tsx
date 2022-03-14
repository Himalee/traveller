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
  Text,
  Spinner,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useLazyQuery } from '@apollo/client'
import { GET_CITIES } from '../../queries'
import type { CitiesRequestVars, CitiesResponseData } from '../../queries'
import { CitiesTable } from '../../components'

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [getCitiesBySearchTerm, { data, error, loading }] = useLazyQuery<CitiesResponseData, CitiesRequestVars>(
    GET_CITIES
  )

  const handleChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleKeyEvent = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleCitySearch()
    }
  }

  const handleCitySearch = () =>
    getCitiesBySearchTerm({
      variables: {
        filter: {
          name: searchTerm,
        },
      },
    })

  const fetchedCities = data?.cities?.cities

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input value={searchTerm} onChange={e => handleChange(e.target.value)} onKeyPress={handleKeyEvent} />
          <InputRightElement
            children={<IconButton aria-label="" icon={<Search2Icon />} onClick={handleCitySearch} />}
          />
        </InputGroup>

        {error && <Text fontSize="lg">Error fetching cities, please try again.</Text>}
        {loading && <Text fontSize="lg">Loading...</Text>}
        {fetchedCities && <CitiesTable cities={fetchedCities} withCheckboxes />}
        {fetchedCities?.length === 0 && <Text fontSize="lg">No results found</Text>}
      </Container>
    </VStack>
  )
}
