import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type User = {
  id: string
  name: string
  email: string
}

type Task = {
  id: string
  title: string
  description: string
  status: string
  due_date: string
  user_Id: number
  created_at: string
}

const toIsoDate = (date: string) => {
  const isoDate = new Date(date).toISOString()
  return isoDate
}

export function Dashboard () {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const authHeader = `Bearer ${token}`

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const updateTask = async (taskId: string, data) => {
    const dataFiltered = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        return value !== ''
      })
    )
    console.log(dataFiltered)
    const res = await axios.put(
      `http://localhost:3000/tasks/${taskId}`,
      dataFiltered,
      {
        headers: {
          Authorization: authHeader
        }
      }
    )
    console.log(res)
    getTasks()
  }
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
    const date = toIsoDate(form.date.value)
    const data = {
      title: form.title.value,
      description: form.description.value,
      due_date: date
    }
    updateTask(task.id, data)
  }

  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const getUser = async () => {
    const res = await axios.get('http://localhost:3000/me', {
      headers: {
        Authorization: authHeader
      }
    })
    setUser(res.data)
  }

  const getTasks = async () => {
    if (!token) {
      console.log('Sem token')
      return
    }

    if (!user?.id) return

    const res = await axios.get(`http://localhost:3000/tasks/${user.id}`, {
      headers: {
        Authorization: authHeader
      }
    })

    setTasks(res.data)
  }

  const deleteTask = async (taskId: string) => {
    const res = await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
      headers: {
        Authorization: authHeader
      }
    })
    console.log(res)
    getTasks()
  }
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (!user) return
    getTasks()
  }, [user])

  type dataType = {
    user_Id: string
    title: string
    description: string
    due_date: string
  }

  const createTask = async (data: dataType) => {
    const postTask = await axios.post('http://localhost:3000/tasks', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(postTask)
    getTasks()
  }

  const changeStatus = async (task: Task) => {
    const message = task.status === 'Done' ? 'Pending' : 'Done'

    const res = await axios.put(
      `http://localhost:3000/tasks/${task.id}`,
      { status: message },
      {
        headers: {
          Authorization: authHeader
        }
      }
    )
    console.log(res)
    getTasks()
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const date = toIsoDate(form.date.value)
    const data = {
      user_Id: user?.id,
      title: form.title.value,
      description: form.description.value,
      due_date: date
    }
    createTask(data)
    e.target.reset()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar (desktop only) */}
      <aside className='hidden md:flex md:w-64 bg-white shadow-md p-6 flex-col'>
        <h2 className='text-xl font-bold mb-8'>TaskManager</h2>

        <nav className='flex flex-col gap-4 items-start'>
          <a className='text-blue-600 font-medium cursor-pointer'>Dashboard</a>
          <a className='text-gray-700 hover:text-blue-600 cursor-pointer'>
            Minhas tarefas
          </a>
          <button
            className='text-red-500 hover:text-red-600 cursor-pointer'
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Conteúdo */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Minhas Tarefas</h1>
          <span className='text-gray-600 text-sm md:text-base'>
            {user?.name}
          </span>
        </header>

        {/* Main */}
        <main className='p-4 md:p-6 max-w-5xl w-full mx-auto'>
          {/* Criar tarefa */}
          <div className='bg-white p-5 rounded-xl shadow mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Nova tarefa</h2>

            <form
              className='grid gap-3 md:grid-cols-4'
              onSubmit={handleCreateTask}
            >
              <input
                type='text'
                name='title'
                placeholder='Título'
                className='md:col-span-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
                required
              />

              <input
                type='text'
                name='description'
                placeholder='Descrição'
                className='md:col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
              />

              <input
                type='date'
                name='date'
                required
                className='border rounded-lg px-3 py-2'
              />

              <button className='md:col-span-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
                Criar tarefa
              </button>
            </form>
          </div>

          {/* Lista */}
          <div className='flex flex-col gap-4'>
            {tasks &&
              tasks.map(task => (
                <div
                  key={task.id}
                  className='bg-white p-5 rounded-xl shadow flex flex-col gap-4'
                >
                  {editingTask?.id === task.id ? (
                    <form
                      className='flex flex-col gap-3'
                      onSubmit={e => submitUpdate(e, task)}
                    >
                      <input
                        type='text'
                        name='title'
                        placeholder={task.title}
                        className='border rounded-lg px-3 py-2'
                      />

                      <input
                        type='text'
                        name='description'
                        placeholder={task.description}
                        className='border rounded-lg px-3 py-2'
                      />

                      <input
                        type='date'
                        name='date'
                        defaultValue={task.due_date?.slice(0, 10) || ''}
                        className='border rounded-lg px-3 py-2'
                      />

                      <button className='text-blue-600 font-medium'>
                        Salvar alterações
                      </button>
                    </form>
                  ) : (
                    <>
                      {/* Top */}
                      <div className='flex justify-between items-start'>
                        <div>
                          <h3 className='font-semibold'>{task.title}</h3>
                          <p className='text-sm text-gray-500'>
                            {task.description}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <input
                            type='checkbox'
                            checked={task.status === 'Done'}
                            onChange={() => changeStatus(task)}
                          />

                          <span
                            className={`text-sm font-medium pl-3 w-16 ${
                              task.status === 'Done'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <p className='text-sm text-gray-500'>
                          {task.due_date?.slice(0, 10)}
                        </p>

                        <div className='flex items-center gap-3 text-sm'>
                          <button
                            className='text-blue-600 hover:underline'
                            onClick={() => handleEditing(task)}
                          >
                            Editar
                          </button>

                          <button
                            className='text-red-600 hover:underline'
                            onClick={() => deleteTask(task.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}
