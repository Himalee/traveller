import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '../../test-utils'
import { Home } from './Home'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CITIES } from '../../queries'
import { createMockCity } from '../../test-mocks'

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
              cities: [createMockCity({ name: 'London', country: 'United Kingdom' }),],
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
                createMockCity({ id: 1, name: 'Amadora', country: 'Portugal' }),
                createMockCity({ id: 2, name: 'Madrid', country: 'Spain' }),
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
    await screen.findByText('Amadora')
    const cityRows = screen.getAllByTestId('city-row')
    expect(cityRows).toHaveLength(2)
  })

  it('displays "no results found" when no cities are returned', async () => {
    const mocks = [
      {
        request: {
          query: GET_CITIES,
          variables: {
            filter: {
              name: 'abcdefg',
            },
          },
        },
        result: {
          data: {
            cities: {
              cities: [],
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
    fireEvent.change(searchInput, { target: { value: 'abcdefg' } })
    fireEvent.click(searchButton)
    await waitFor(() => screen.getByText('No results found'))
  })
})
