import React from 'react'
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Brief from "./Brief"

describe('Brief Component', () => {
  
  test('Default props value', () => {
    render(<Brief />)
    expect(screen.getByText(/You have 0 tasks to do/)).toBeInTheDocument()
  })

  test('Display the correct task numbers if gt 1', () => {
    render(<Brief taskNo={3} />)
    expect(screen.getByText(/You have 3 tasks to do/)).toBeInTheDocument()
  })

  test('Display the correct task number if equal 1', () => {
    render(<Brief taskNo={1} />)
    expect(screen.getByText(/You have 1 task to do/)).toBeInTheDocument()
  })



})