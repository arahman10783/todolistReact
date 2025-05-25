import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import TodoForm from './TodoForm'

describe("Todo Form", () => {

  const mockAddTaskToList = jest.fn()

  beforeEach(() => {
    mockAddTaskToList.mockClear()
  })

  test("Render input with correct placeholder", () => {
    render(<TodoForm tasksList={[]} />)
    expect(screen.getByPlaceholderText(/Add task to do/)).toBeInTheDocument()
  })

  test("Render the button with correct text", ()=>{
    render(<TodoForm tasksList={[]} />)
    expect(screen.getByTestId("addBtn")).toBeInTheDocument()
    expect(screen.getByText(/Add to the List/)).toBeInTheDocument()
  })

  test("Render the form", ()=>{
    render(<TodoForm tasksList={[]} />)
    expect(screen.getByRole("form")).toBeInTheDocument()
  })

  test("Update task state on input change", ()=>{
    render(<TodoForm tasksList={[]} />)
    const inputElement = screen.getByPlaceholderText(/Add task to do/)
    fireEvent.change(inputElement, {target: {value: "Learn HTML"}})
    expect(inputElement.value).toBe("Learn HTML")
  })

  test("Submit Form to add task", () => {
    render(<TodoForm tasksList={[]} addTaskToList={mockAddTaskToList} />)
    const inputElement = screen.getByPlaceholderText(/Add task to do/)
    const addButton = screen.getByTestId("addBtn")

    fireEvent.change(inputElement, {target: {value: "Learn HTML"}})
    fireEvent.click(addButton)
    
    expect(mockAddTaskToList).toHaveBeenCalledWith("Learn HTML")
    expect(inputElement.value).toBe("")
  })

  test("Show error when input is empty", () => {
    render(<TodoForm tasksList={[]} addTaskToList={mockAddTaskToList} />)
    const addButton = screen.getByTestId("addBtn")

    fireEvent.click(addButton)
    
    expect(screen.getByTestId("formError")).toBeInTheDocument()
    expect(screen.getByText(/Please add real data and not duplicate/)).toBeInTheDocument()
    expect(mockAddTaskToList).not.toHaveBeenCalled()
  })

  test("Show error when task added is duplicated", () => {
    const mockTaskList = [
      {
        "id": "6a96",
        "title": "Learn HTML",
        "completed": true
      }
    ]
    render(<TodoForm tasksList={mockTaskList} addTaskToList={mockAddTaskToList} />)
    const addButton = screen.getByTestId("addBtn")
    const inputElement = screen.getByPlaceholderText(/Add task to do/)

    fireEvent.change(inputElement, {target: {value: "Learn HTML"}})
    fireEvent.click(addButton)
    
    expect(screen.getByTestId("formError")).toBeInTheDocument()
    expect(screen.getByText(/Please add real data and not duplicate/)).toBeInTheDocument()
    expect(mockAddTaskToList).not.toHaveBeenCalled()
  })
  
})