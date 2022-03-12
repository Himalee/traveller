import { render } from '../../test-utils'
import { screen } from '@testing-library/react'
import React from 'react'
import { CitiesTable } from './CitiesTable'
import { London, Madrid } from '../../test-mocks'

describe('<CitiesTable /> component', () => {
  it('renders the table headings', async () => {
    render(<CitiesTable cities={[]} />)

    await screen.findByText('City')
    await screen.findByText('Country')
  })

  it('renders rows given cities', async () => {
    render(<CitiesTable cities={[London, Madrid]} />)

    await screen.findByText('Madrid')
    await screen.findByText('Spain')
    await screen.findByText('London')
    await screen.findByText('United Kingdom')
    const cityRows = screen.getAllByTestId('city-row')
    expect(cityRows).toHaveLength(2)
  })
})
