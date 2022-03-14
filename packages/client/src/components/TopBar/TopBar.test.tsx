import { render } from '../../test-utils'
import { screen } from '@testing-library/react'
import React from 'react'
import { TopBar } from './TopBar'
import { BrowserRouter } from 'react-router-dom'

describe('<TopBar /> component', () => {
  it('navigates to correct route', async () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    )

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Visited').closest('a')).toHaveAttribute('href', '/visited')
    expect(screen.getByText('Wish list').closest('a')).toHaveAttribute('href', '/wish-list')
    expect(screen.getByAltText('smart logo').closest('a')).toHaveAttribute('href', '/')
  })
})
