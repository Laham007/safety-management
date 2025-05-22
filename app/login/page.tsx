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
import { signIn } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // התחברות באמצעות Supabase
      const { data, error } = await signIn(email, password)

      if (error) {
        throw new Error(error.message || "שגיאה בהתחברות")
      }

      // אם ההתחברות הצליחה, הפנייה לדף הבקרה
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "שגיאה בהתחברות. אנא נסה שנית.")
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
            <CardTitle className="text-2xl">התחברות למערכת</CardTitle>
            <CardDescription>הזן את פרטי ההתחברות שלך כדי להיכנס למערכת ניהול הבטיחות</CardDescription>
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
                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-amber-500 hover:text-amber-600">
                    שכחת סיסמה?
                  </Link>
                  <Label htmlFor="password">סיסמה</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={loading}>
                {loading ? "מתחבר..." : "התחבר"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <span className="text-gray-500">אין לך חשבון? </span>
              <Link href="/register" className="text-amber-500 hover:text-amber-600">
                הירשם עכשיו
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              <p>פרטי התחברות לדוגמה:</p>
              <p>דוא"ל: laham07@gmail.com</p>
              <p>סיסמה: Laham555</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
