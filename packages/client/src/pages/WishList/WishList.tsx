import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { CitiesTable } from '../../components'
import { useFilteredCities } from '../../hooks/cities'

export const WishList: FC = () => {
  const { data } = useFilteredCities('wishlist', true)

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
