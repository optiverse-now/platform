'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useToast } from "@/app/hooks/use-toast"

const Login = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)    

    console.log("try直前")
    try {
      const res = await fetch('http://localhost:4000/api/dashboard/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("Status:", res.status)
      console.log("Status Text:", res.statusText)
      
      const rawResponse = await res.text()
      console.log("Raw Response:", rawResponse)
      
      const data = rawResponse ? JSON.parse(rawResponse) : null
      console.log("Parsed Data:", data)

      if (!res.ok) {
        throw new Error(data?.error || 'ログインに失敗しました')
      }

      if (data.token) {
        console.log("トークン保存前:", data.token)
        localStorage.setItem('token', data.token)
        console.log("トークン保存後:", localStorage.getItem('token'))
        
        toast({
          title: "ログイン成功",
          description: "ダッシュボードにリダイレクトします",
        })
        router.push('/applications/dashboard')
      } else {
        throw new Error('認証に失敗しました')
      }

      console.log("data", data)
      console.log("res", res)

    } catch (err) {
      console.error('Login error:', err)
      toast({
        title: "エラー",
        description: err instanceof Error ? err.message : 'ログインに失敗しました',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">管理者ログイン</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login