import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from './App';
import { BASE_URL } from "./App";

global.fetch = jest.fn()


describe("App Component", () => {

  beforeEach(()=>{
    fetch.mockClear()
  })

test("Render Page Title and Breif when app rendered", () => {
  render(<App />)
  expect(screen.getByText(/My TO-DO List/)).toBeInTheDocument()
})

test("Get Tasks on mount", async () => {
  const mockTasks = [
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

  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockTasks)
  })

  render(<App />)
  await waitFor(()=>{
    expect(screen.getByText(/Learn HTML/)).toBeInTheDocument()
  })

  await waitFor(()=>{
    expect(screen.getByText(/Learn CSS/)).toBeInTheDocument()
  })

})


test("Add Task to the list", async () => {

  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]) //get
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}) //Post
  })

  render(<App />)

  const input = screen.getByTestId("inputTask")
  const button = screen.getByTestId("addBtn")
  
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button)

  await waitFor(()=> {
    act(()=> {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/todoList`,
        expect.objectContaining({
          method: "POST", 
          body: JSON.stringify({
          title: 'New Task',
          completed: false
        })})
      )
    })
  })
})


test("Delete task", async () => {
  const mockTasks = [{id:1, title: 'task mocked', completed: false}]

  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockTasks) //get
  }).mockResolvedValueOnce({})

  render(<App />)
  await waitFor(()=> {
    expect(screen.getByText("task mocked")).toBeInTheDocument()
  })

  const deleteBtn = screen.getByText(/Delete/)
  fireEvent.click(deleteBtn)

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/todoList/1`,
      expect.objectContaining({ method: "DELETE"})
    )
  })

})



  
})