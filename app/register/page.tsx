"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/supabase"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // בדיקת תקינות הסיסמה
    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות")
      return
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים")
      return
    }

    setLoading(true)

    try {
      // רישום באמצעות Supabase
      const { data, error } = await signUp(email, password, {
        name,
        email,
        role: "user",
      })

      if (error) {
        throw new Error(error.message || "שגיאה ברישום")
      }

      // אם הרישום הצליח, הפנייה לדף ההתחברות
      router.push("/login?registered=true")
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "שגיאה ברישום. אנא נסה שנית.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-3 rounded-full">
            <Shield className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        <Card className="border-amber-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">הרשמה למערכת</CardTitle>
            <CardDescription>צור חשבון חדש כדי להתחיל להשתמש במערכת ניהול הבטיחות</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 text-right">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-right">
                <Label htmlFor="name">שם מלא</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="ישראל ישראלי"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="email">דואר אלקטרוני</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="password">סיסמה</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="confirmPassword">אימות סיסמה</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={loading}>
                {loading ? "נרשם..." : "הירשם"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              <span className="text-gray-500">כבר יש לך חשבון? </span>
              <Link href="/login" className="text-amber-500 hover:text-amber-600">
                התחבר כאן
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
