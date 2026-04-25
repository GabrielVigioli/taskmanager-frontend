import { useState } from 'react'
import { api } from '../lib/axios'
import { useEffect } from 'react'
export function useTasks (userId?: string) {
  const token = localStorage.getItem('token')

  type Task = {
    id: string
    title: string
    description: string
    status: string
    due_date: string
    user_Id: number
    created_at: string
  }

  type dataType = {
    user_Id: string
    title: string
    description: string
    due_date: string
  }

  const [loading, setLoading] = useState(false)

  const [tasks, setTasks] = useState<Task[]>([])
  const updateTask = async (taskId: string, data: Partial<Task>) => {
    const dataFiltered = Object.fromEntries(
      Object.entries(data).filter(([, value]) => {
        return value !== ''
      })
    )
    console.log(dataFiltered)
    const res = await api.put(`/tasks/${taskId}`, dataFiltered)
    console.log(res)
    getTasks()
  }

  const getTasks = async () => {
    if (!token) {
      console.log('Sem token')
      return
    }

    if (!userId) return

    try {
      const res = await api.get(`/tasks/${userId}`)
      setTasks(res.data)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (taskId: string) => {
    const res = await api.delete(`/tasks/${taskId}`)
    console.log(res)
    getTasks()
  }

  const createTask = async (data: dataType) => {
    const postTask = await api.post('/tasks', data)
    console.log(postTask)
    getTasks()
  }

  const changeStatus = async (task: Task) => {
    const message = task.status === 'Done' ? 'Pending' : 'Done'

    const res = await api.put(`/tasks/${task.id}`, { status: message })
    console.log(res)
    getTasks()
  }

  useEffect(() => {
    if (!userId) return
    getTasks()
  }, [userId]) //eslint desgracad

  return {
    createTask,
    deleteTask,
    updateTask,
    changeStatus,
    tasks,
    loading
  }
}
