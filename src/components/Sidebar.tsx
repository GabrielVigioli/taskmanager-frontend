type SidebarType = {
  handleLogout: () => void
}

export function Sidebar ({ handleLogout }: SidebarType) {
  return (
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
  )
}
