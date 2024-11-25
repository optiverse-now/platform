'use client'
import React, { useEffect } from 'react'
import { useAuth } from './hooks'

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated, isLoading, checkAuth } = useAuth()

    useEffect(() => {
      checkAuth()
    }, [checkAuth])

    if (isLoading) return <div>Loading...</div>
    if (!isAuthenticated) return null

    return <WrappedComponent {...props} />
  }
} 