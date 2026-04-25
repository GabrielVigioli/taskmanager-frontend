import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Home () {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* Navbar */}
      <header className='bg-white/80 backdrop-blur sticky top-0 z-10 border-b'>
        <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>TaskManager</h1>

          <nav className='flex gap-3'>
            <Link
              to='/login'
              className=' px-4 py-2 rounded-lg tet text-sm md:text-base'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base'
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className='flex-1 flex items-center'>
        <div className='max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center'>
          {/* Texto */}
          <div>
            <h2 className='text-3xl md:text-5xl font-bold leading-tight mb-4'>
              Organize suas tarefas <br className='hidden md:block' />
              <span className='text-blue-600'>sem complicação</span>
            </h2>

            <p className='text-gray-600 mb-6 text-base md:text-lg'>
              Gerencie seu dia com um sistema simples, rápido e eficiente. Tudo
              o que você precisa em um só lugar.
            </p>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Link
                to='/signup'
                className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-center'
              >
                Começar agora
              </Link>

              <Link
                to='/login'
                className='border border-gray-300 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-center'
              >
                Já tenho conta
              </Link>
            </div>
          </div>

          {/* Card preview */}
          <div className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto'>
            <h3 className='font-semibold mb-4 text-gray-700'>Suas tarefas</h3>

            <div className='flex flex-col gap-3'>
              <div className='p-3 border rounded-lg flex justify-between items-center'>
                <span className='text-sm'>Estudar React</span>
                <span className='text-green-500 text-xs font-medium'>Done</span>
              </div>

              <div className='p-3 border rounded-lg flex justify-between items-center'>
                <span className='text-sm'>Fazer projeto</span>
                <span className='text-red-500 text-xs font-medium'>
                  Pending
                </span>
              </div>

              <div className='p-3 border rounded-lg flex justify-between items-center'>
                <span className='text-sm'>Treinar backend</span>
                <span className='text-red-500 text-xs font-medium'>
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-3'>
          <div className='p-6 rounded-xl border hover:shadow-md transition'>
            <h3 className='font-semibold mb-2'>Crie tarefas</h3>
            <p className='text-gray-600 text-sm'>
              Adicione tarefas rapidamente com título e descrição.
            </p>
          </div>

          <div className='p-6 rounded-xl border hover:shadow-md transition'>
            <h3 className='font-semibold mb-2'>Controle status</h3>
            <p className='text-gray-600 text-sm'>
              Marque tarefas como concluídas com um clique.
            </p>
          </div>

          <div className='p-6 rounded-xl border hover:shadow-md transition'>
            <h3 className='font-semibold mb-2'>Edite fácil</h3>
            <p className='text-gray-600 text-sm'>
              Atualize suas tarefas quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='text-center py-6 text-gray-500 text-sm'>
        © 2026 TaskManager
      </footer>
    </div>
  )
}
