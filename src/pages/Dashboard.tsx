import { useState } from 'react'

import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { toIsoDate } from '../utils/toIsoDate'

type Task = {
  id: string
  title: string
  description: string
  status: string
  due_date: string
  user_Id: number
  created_at: string
}

export function Dashboard () {
  const { user, handleLogout } = useAuth()

  const { tasks, createTask, updateTask, deleteTask, changeStatus } = useTasks(
    user?.id
  )

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleEditing = (task: Task) => {
    setEditingTask(prev => {
      if (prev?.id === task.id) {
        return null
      } else {
        return { ...task }
      }
    })
  }

  const submitUpdate = (e: React.FormEvent<HTMLFormElement>, task: Task) => {
    e.preventDefault()
    handleEditing(task)
    const form = e.currentTarget
    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const descriptionInput = form.elements.namedItem(
      'description'
    ) as HTMLInputElement
    const dateInput = form.elements.namedItem('date') as HTMLInputElement
    const date = toIsoDate(dateInput.value)

    const data = {
      title: titleInput.value,
      description: descriptionInput.value,
      due_date: date
    }
    updateTask(task.id, data)
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const descriptionInput = form.elements.namedItem(
      'description'
    ) as HTMLInputElement
    const dateInput = form.elements.namedItem('date') as HTMLInputElement
    const date = toIsoDate(dateInput.value)
    if (!user) return
    const data = {
      user_Id: user.id,
      title: titleInput.value,
      description: descriptionInput.value,
      due_date: date
    }
    createTask(data)
    e.currentTarget.reset()
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar (desktop only) */}
      <Sidebar handleLogout={handleLogout} />

      {/* Conteúdo */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Minhas Tarefas</h1>
          <span className='text-gray-600 text-sm md:text-base'>
            Ola, {user?.name} 👋
          </span>
        </header>

        {/* Main */}
        <main className='p-4 md:p-6 max-w-5xl w-full mx-auto'>
          {/* Criar tarefa */}
          <div className='bg-white p-5 rounded-xl shadow mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Nova tarefa</h2>

            <TaskForm handleCreateTask={handleCreateTask} />
          </div>

          {/* Lista */}
          {tasks && (
            <TaskCard
              tasks={tasks}
              editingTask={editingTask}
              submitUpdate={submitUpdate}
              changeStatus={changeStatus}
              handleEditing={handleEditing}
              deleteTask={deleteTask}
            />
          )}
        </main>
      </div>
    </div>
  )
}
