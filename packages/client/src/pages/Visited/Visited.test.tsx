import { render } from '../../test-utils'
import { MockedProvider } from '@apollo/client/testing'
import { screen } from '@testing-library/react'
import React from 'react'
import { Visited } from './Visited'
import { GET_CITIES } from "../../queries";
import { createMockCity } from "../../test-mocks";

describe('<Visited /> component', () => {
  it('renders the table headings', async () => {
    render(
      <MockedProvider>
        <Visited />
      </MockedProvider>
    )

    await screen.findByText('Visited')
  })

  it('renders cities that have been marked as visited', async () => {
    const mocks = [
      {
        request: {
          query: GET_CITIES,
          variables: {
            filter: {
              visited: true,
            },
          },
        },
        result: {
          data: {
            cities: {
              cities: [
                createMockCity({ id: 1, name: 'London', country: 'United Kingdom', visited: true }),
                createMockCity({ id: 2, name: 'Manchester', country: 'United Kingdom', visited: true }),
              ],
            },
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    await screen.findByText('London')
    await screen.findByText('Manchester')
  })
})
