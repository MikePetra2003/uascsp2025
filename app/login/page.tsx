'use client'
import { login } from '@/app/auth/action'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

async function handleSubmit(formData: FormData) {
  setLoading(true)
  setError(null)

  const result = await login(formData)
  if (result?.error) {
    setError(result.error)
    setLoading(false)
}
}


return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Karyawan</h2>

{error && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
    {error}
</div>
)}

<form action={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input name="email" type="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
    </div>

<div>
  <label className="block text-sm font-medium text-gray-700">Password</label>
  <input name="password" type="password" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
  </div>
  
  <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? 'Processing...' : 'Login'}
  </button>
  </form>
  
  <p className="mt-4 text-center text-sm">
    Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar di sini</a>
    </p>
    </div>
    </div>
)
}