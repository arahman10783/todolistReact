export interface Task {
  id: string | number;
  title: string;
  completed: boolean
}

export type ModifyItem = (task: Task) => Promise<void>
export type DeleteItem = (id: string | number) => Promise<void>