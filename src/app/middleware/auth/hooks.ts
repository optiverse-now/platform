'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async (token: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:4000/api/dashboard/protected/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return res.ok
    } catch {
      return false
    }
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      router.push('/applications/dashboard/login')
      return false
    }

    const isValid = await verifyAuth(token)
    if (!isValid) {
      setIsAuthenticated(false)
      setIsLoading(false)
      localStorage.removeItem('token')
      router.push('/applications/dashboard/login')
      return false
    }

    setIsAuthenticated(true)
    setIsLoading(false)
    return true
  }

  return { isAuthenticated, isLoading, checkAuth }
}