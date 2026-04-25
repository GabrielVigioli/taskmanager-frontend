type TaskForm = {
  handleCreateTask: (e: React.FormEvent<HTMLFormElement>) => void
}

export function TaskForm ({ handleCreateTask }: TaskForm) {
  return (
    <form className='grid gap-3 md:grid-cols-4' onSubmit={handleCreateTask}>
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
  )
}
