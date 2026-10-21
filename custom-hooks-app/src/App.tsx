import { useState } from 'react'
import useTasks from './hooks/useTasks'

function App() {
  const [title,setTitle] = useState('')
  const {tasks,addTask,toggleTask,deleteTask}= useTasks()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTask(title)
    setTitle('')
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold">
          My Tasks
        </h1>

         <p className="mt-2 text-sm text-slate-500">
          Manage your tasks and track your progress.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex gap-2"
        >
          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter a task..."
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />

<button
            type="submit"
            disabled={!title.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-slate-500">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {tasks.length === 0 ? (
          <p className="mt-8 rounded-lg bg-slate-50 p-6 text-center text-slate-500">
            No tasks yet. Add your first task!
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.title} as completed`}
                  className="size-4 accent-blue-600"
                />

                <span
                  className={`min-w-0 flex-1 break-words ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : ''
                  }`}
                >
                  {task.title}
                </span>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App