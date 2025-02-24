import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import TodoList from './TodoList'
import TodoListItem from './TodoListItem'

//Mock TodoListItem component
jest.mock('./TodoListItem', () => ({task}) => (
  <li data-testid = "todoItem">
    {task.title}
  </li>
))

describe('To-do list Component', () => {

  const mockTasksList = [
    {
      "id": "6a96",
      "title": "Learn HTML",
      "completed": true
    },
    {
      "id": "c188",
      "title": "Learn CSS",
      "completed": true
    },
  ]

  test("Display no tasks messages when tasksList is empty", () => {
    render(<TodoList tasksList={[]} />)
    expect(screen.getByText(/No Tasks added yet/)).toBeInTheDocument()
  })

  test('Display list of tasks when tasksList is not empty', () => {
    render(<TodoList tasksList={mockTasksList} />)
    expect(screen.getAllByTestId("todoItem")).toHaveLength(2)
    expect(screen.getByText("Learn HTML")).toBeInTheDocument()
    expect(screen.getByText("Learn CSS")).toBeInTheDocument()

  })

})