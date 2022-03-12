import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from './test-utils'
import { Home } from './Home'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'

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

describe('<Home /> component', () => {
  it('renders the search button', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    )

    const searchButton = screen.getByRole('button')
    expect(searchButton).toBeInTheDocument()
  })

  it('displays single row in table on search for "London"', async () => {
    const mocks = [
      {
        request: {
          query: GET_CITIES,
          variables: {
            filter: {
              name: 'London',
            },
          },
        },
        result: {
          data: {
            cities: {
              cities: [{ id: 1, name: 'London', country: 'UK', visited: false, wishlist: false }],
            },
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )
    const searchInput = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button')
    fireEvent.change(searchInput, { target: { value: 'London' } })
    fireEvent.click(searchButton)
    await waitFor(() => screen.getByText('London'))
    const citiesTable = screen.getByRole('table')
    expect(citiesTable).toBeInTheDocument()
    const cityRows = screen.getAllByTestId('city-row')
    expect(cityRows).toHaveLength(1)
  })

  it('displays multiple rows in table on search for "mad"', async () => {
    const mocks = [
      {
        request: {
          query: GET_CITIES,
          variables: {
            filter: {
              name: 'mad',
            },
          },
        },
        result: {
          data: {
            cities: {
              cities: [
                {
                  id: 1,
                  name: 'Amadora',
                  country: 'Portugal',
                  visited: false,
                  wishlist: false,
                },
                {
                  id: 2,
                  name: 'Madrid',
                  country: 'Spain',
                  visited: false,
                  wishlist: false,
                },
              ],
            },
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )
    const searchInput = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button')
    fireEvent.change(searchInput, { target: { value: 'mad' } })
    fireEvent.click(searchButton)
    await waitFor(() => screen.getByText('Madrid'))
    const cityRows = screen.getAllByTestId('city-row')
    expect(cityRows).toHaveLength(2)
  })
})
