import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { CitiesTable } from '../../components/CitiesTable/CitiesTable'
import { useQuery } from '@apollo/client'
import type { CitiesRequestVars, CitiesResponseData } from '../../queries'
import { GET_CITIES } from '../../queries'

export const WishList: FC = () => {
  const { data } = useQuery<CitiesResponseData, CitiesRequestVars>(GET_CITIES, {
    variables: { filter: { wishlist: true } },
  })

  const fetchedCities = data?.cities?.cities

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        {fetchedCities && fetchedCities?.length !== 0 && <CitiesTable cities={fetchedCities} withCheckboxes={false} />}
      </Container>
    </>
  )
}
