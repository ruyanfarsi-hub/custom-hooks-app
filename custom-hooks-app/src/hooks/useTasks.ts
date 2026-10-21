import useLocalStorage from './useLocalStorage'

export type Task ={
    id: number
    title: string
    completed: boolean
}

function useTasks() {
    const [tasks, setTasks] = useLocalStorage<Task[]>(
    'tasks',
    []
  )

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    }

     if (!newTask.title) return

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ])
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

   function deleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

   return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  }
}

export default useTasks