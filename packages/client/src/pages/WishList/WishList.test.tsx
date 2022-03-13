import { render } from '../../test-utils'
import { MockedProvider } from '@apollo/client/testing'
import { screen } from '@testing-library/react'
import React from 'react'
import { GET_CITIES } from '../../queries'
import { createMockCity } from '../../test-mocks'
import { WishList } from './WishList'

describe('<WishList /> component', () => {
  it('renders the table headings', async () => {
    render(
      <MockedProvider>
        <WishList />
      </MockedProvider>
    )

    await screen.findByText('Wish list')
  })

  it('renders cities that have been added to wish list', async () => {
    const mocks = [
      {
        request: {
          query: GET_CITIES,
          variables: {
            filter: {
              wishlist: true,
            },
          },
        },
        result: {
          data: {
            cities: {
              cities: [
                createMockCity({ id: 1, name: 'London', country: 'United Kingdom', wishlist: true }),
                createMockCity({ id: 2, name: 'Manchester', country: 'United Kingdom', wishlist: true }),
              ],
            },
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WishList />
      </MockedProvider>
    )

    await screen.findByText('London')
    await screen.findByText('Manchester')
  })
})
