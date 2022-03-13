import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import type { CitiesRequestVars, CitiesResponseData } from '../../queries'
import { GET_CITIES } from '../../queries'
import { CitiesTable } from '../../components/CitiesTable/CitiesTable'

export const Visited: FC = () => {
  const { data } = useQuery<CitiesResponseData, CitiesRequestVars>(GET_CITIES, {
    variables: { filter: { visited: true } },
  })

  const fetchedCities = data?.cities?.cities

  return (
    <>
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        {fetchedCities && fetchedCities?.length !== 0 && <CitiesTable cities={fetchedCities} withCheckboxes={false} />}
      </Container>
    </>
  )
}
