import { createClient } from '@/utils/supabase/server'
import { logout } from '../auth/action'

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. Ambil data User [cite: 42]
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Fetch data dummy 'announcements' [cite: 45, 47]
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Sederhana */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Employee Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          
          {/* Fitur Logout [cite: 49, 50] */}
          <form action={logout}>
             <button type="submit" className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
               Logout
             </button>
          </form>
        </div>
      </nav>

      {/* Konten Dashboard */}
      <main className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Announcements</h2>
        
        <div className="grid gap-4">
          {announcements?.map((item) => (
            <div key={item.id} className="p-6 bg-white rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.content}</p>
              <span className="text-xs text-gray-400 mt-4 block">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}

          {(!announcements || announcements.length === 0) && (
            <p className="text-gray-500">No announcements available.</p>
          )}
        </div>
      </main>
    </div>
  )
}