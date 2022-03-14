import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { ColorModeSwitcher } from './ColorModeSwitcher'

describe('<ColorModeSwitcher /> component', () => {
  it('switches from light mode to dark mode', async () => {
    render(
      <BrowserRouter>
        <ColorModeSwitcher />
      </BrowserRouter>
    )

    await screen.getByLabelText('Switch to dark mode')
    const colorSwitcherIcon = screen.getByRole('button')
    fireEvent.click(colorSwitcherIcon)
    await screen.getByLabelText('Switch to light mode')
  })
})
