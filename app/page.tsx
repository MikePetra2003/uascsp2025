import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Employee<span className="text-blue-600">Portal</span>
          </h1>
          <p className="mt-4 text-gray-500">
            Sistem informasi dan manajemen profil karyawan terpadu.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/login" 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Masuk ke Akun (Login)
          </Link>
          
          <Link 
            href="/register" 
            className="w-full py-3 px-4 bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-600 font-semibold rounded-lg transition duration-200"
          >
            Daftar Akun Baru
          </Link>
        </div>

        {/* Footer Kecil */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} UAS Client Side Programming.
          </p>
        </div>

      </div>
    </div>
  )
}