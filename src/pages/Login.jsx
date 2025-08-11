import React, { useState } from 'react'
import { useNavigate } from 'react-router'


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setApiError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (validate()) {
      setLoading(true)
      setApiError('')
      try {
        const res = await fetch('https://officialtaskmanager.onrender.com/api/v1/sign_in', {
          method: 'POST', // <-- changed from 'GET' to 'POST'
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
          credentials:"include"
        })
        let data = {}
        try {
          data = await res.json()
        } catch {
          data = {}
        }
        if (res.ok) {
          // Handle successful login (e.g., save token, redirect)
          navigate('/all_tasks')
        } else {
          setApiError(data.message || 'Login failed')
        }
      } catch (err) {
        setApiError('Network error')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 outline-none ${errors.email ? 'border-[#974FD0]' : 'border-gray-300'}`}
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <p className="text-xs text-[#974FD0] mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 outline-none ${errors.password ? 'border-[#974FD0]' : 'border-gray-300'}`}
              placeholder="Enter your password"
              disabled={loading}
            />
            {errors.password && <p className="text-xs text-[#974FD0] mt-1">{errors.password}</p>}
          </div>
          {apiError && <div className="text-[#974FD0] text-sm text-center">{apiError}</div>}
          <button
            type="submit"
            className="w-full bg-[#974FD0] text-white py-2 rounded font-semibold hover:bg-[#7c3aed] transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm">Don't have an account? </span>
          <a href="/sign_up" className="text-[#974FD0] font-medium hover:underline">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Login