import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { CitiesTable } from '../../components'
import { useFilteredCities } from '../../hooks/cities'

export const Visited: FC = () => {
  const { data } = useFilteredCities('visited', true)

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
