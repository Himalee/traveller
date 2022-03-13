import { render } from '../../test-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { CitiesTable } from './CitiesTable'
import { createMockCity } from '../../test-mocks'
import { MockedProvider } from '@apollo/client/testing'
import { UPDATE_CITY } from '../../queries'

describe('<CitiesTable /> component', () => {
  it('renders the table headings', async () => {
    render(
      <MockedProvider>
        <CitiesTable cities={[]} />
      </MockedProvider>
    )

    await screen.findByText('City')
    await screen.findByText('Country')
  })

  it('renders rows given cities', async () => {
    render(
      <MockedProvider>
        <CitiesTable
          cities={[
            createMockCity({ id: 1, name: 'London', country: 'United Kingdom' }),
            createMockCity({ id: 2, name: 'Madrid', country: 'Spain' }),
          ]}
        />
      </MockedProvider>
    )

    await screen.findByText('Madrid')
    await screen.findByText('Spain')
    await screen.findByText('London')
    await screen.findByText('United Kingdom')
    const cityRows = screen.getAllByTestId('city-row')
    expect(cityRows).toHaveLength(2)
  })

  it('renders city with visited checked, and wishlist unchecked', async () => {
    render(
      <MockedProvider>
        <CitiesTable
          cities={[createMockCity({ name: 'London', country: 'United Kingdom', visited: true, wishlist: false })]}
        />
      </MockedProvider>
    )

    const visitedCheckbox = screen.getByLabelText('checkbox-label-city-visited')
    const wishlistCheckbox = screen.getByLabelText('checkbox-label-city-wishlist')
    expect(visitedCheckbox).toBeChecked()
    expect(wishlistCheckbox).not.toBeChecked()
  })

  it('triggers mutation call when checkbox is checked', async () => {
    let updateCityMutationCalled = false
    const mocks = [
      {
        request: {
          query: UPDATE_CITY,
          variables: {
            input: {
              id: 1,
              visited: true,
            },
          },
        },
        result: () => {
          updateCityMutationCalled = true
          return {
            data: {
              updateCity: createMockCity({ id: 1, visited: true }),
            },
          }
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CitiesTable cities={[createMockCity()]} />
      </MockedProvider>
    )

    const visitedCheckbox = screen.getByLabelText('checkbox-label-city-visited')
    expect(visitedCheckbox).not.toBeChecked()
    fireEvent.click(visitedCheckbox)
    await screen.getByLabelText('checkbox-label-city-visited')
    await waitFor(() => screen.getByText('Updated'))
    expect(updateCityMutationCalled).toBe(true)
  })
})
