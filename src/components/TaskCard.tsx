type Task = {
  id: string
  title: string
  description: string
  status: string
  due_date: string
  user_Id: number
  created_at: string
}

type TaskCardType = {
  tasks: Task[]
  editingTask: Task | null
  submitUpdate: (e: React.FormEvent<HTMLFormElement>, task: Task) => void
  changeStatus: (task: Task) => void
  handleEditing: (task: Task) => void
  deleteTask: (taskId: string) => void
}

export function TaskCard ({
  tasks,
  editingTask,
  submitUpdate,
  changeStatus,
  handleEditing,
  deleteTask
}: TaskCardType) {
  return (
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
                    <p className='text-sm text-gray-500'>{task.description}</p>
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
  )
}
