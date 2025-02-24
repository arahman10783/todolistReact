import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import PageTitle from './PageTitle'


describe('Page Title Component', () => {
  test('Display the correct text', () => {
    render(<PageTitle title="My TO-DO List" />)
    expect(screen.getByText(/My TO-DO List/)).toBeInTheDocument();
  })
  
  test('Apply the correct style "css class"', () => {
    render(<PageTitle title="My TO-DO List" />)
    expect(screen.getByText(/My TO-DO List/)).toHaveClass('pageTitle')
  })

  test('Render component without props', () => {
    render(<PageTitle />)
    expect(screen.queryByText(/My TO-DO List/)).not.toBeInTheDocument();
  })
})

