"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, Shield, Clock, FileText, Users, BarChart } from "lucide-react"
import InteractivePresentation from "./components/interactive-presentation"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // בדיקה אם המשתמש מחובר
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("safety-manager-current-user")
      setIsLoggedIn(!!user)
    }

    checkLoginStatus()
    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-800">מערכת ניהול בטיחות מתקדמת</h1>
          <p className="text-xl mb-8 text-gray-700">
            פתרון מקיף לניהול כל היבטי הבטיחות בארגון שלך, מותאם במיוחד לדרישות הרגולציה בישראל
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" size="lg" asChild>
                <Link href="/dashboard">
                  כניסה למערכת <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" size="lg" asChild>
                  <Link href="/login">
                    התחברות <ArrowRight className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-amber-500 text-amber-700" size="lg">
                  הרשמה לניסיון
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Presentation Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-800">למה לבחור במערכת שלנו?</h2>
          <InteractivePresentation />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">פתרון מקיף לניהול הבטיחות</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">ניהול אירועי בטיחות</CardTitle>
                <CardDescription className="text-right">
                  תיעוד, חקירה ומעקב אחר אירועי בטיחות ו"כמעט ונפגע"
                </CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>דיווח מהיר על אירועים</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ניתוח גורמי שורש</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>מעקב אחר פעולות מתקנות</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700" asChild>
                  <Link href="/incidents">למידע נוסף</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">ביקורות ומבדקים</CardTitle>
                <CardDescription className="text-right">תכנון, ביצוע ותיעוד ביקורות בטיחות תקופתיות</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>רשימות תיוג מובנות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>תזכורות אוטומטיות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>מעקב אחר ליקויים</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700" asChild>
                  <Link href="/inspections">למידע נוסף</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">ניהול מסמכים ונספחים</CardTitle>
                <CardDescription className="text-right">שמירה וניהול של כל מסמכי הבטיחות במקום אחד</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ארכיון דיגיטלי</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>התראות על מסמכים פגי תוקף</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>חיפוש מתקדם</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700" asChild>
                  <Link href="/documents">למידע נוסף</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">ניהול הדרכות</CardTitle>
                <CardDescription className="text-right">תכנון, ביצוע ותיעוד הדרכות בטיחות לעובדים</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>מעקב אחר נוכחות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>תזכורות לרענון הדרכות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ספריית תכני הדרכה</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700" asChild>
                  <Link href="/training-forms">למידע נוסף</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">דוחות וסטטיסטיקות</CardTitle>
                <CardDescription className="text-right">ניתוח מגמות וזיהוי נקודות לשיפור בבטיחות</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>דוחות מובנים</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>גרפים אינטראקטיביים</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ייצוא נתונים</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700">
                  למידע נוסף
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-right">נספחים וביקורות</CardTitle>
                <CardDescription className="text-right">ניהול ביקורות תקופתיות ונספחים נדרשים</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ביקורות ציוד כיבוי אש</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>ביקורות מתזים ומערכות חשמל</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>התראות על ביקורות נדרשות</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700" asChild>
                  <Link href="/attachments">למידע נוסף</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-amber-800">מוכנים להתחיל?</h2>
          <p className="text-xl mb-8 text-gray-700">
            הצטרפו לאלפי ארגונים שכבר משתמשים במערכת שלנו לניהול הבטיחות בצורה יעילה ומתקדמת
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" size="lg" asChild>
                <Link href="/dashboard">
                  כניסה למערכת <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" size="lg" asChild>
                  <Link href="/login">
                    התחברות <ArrowRight className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-amber-500 text-amber-700" size="lg">
                  תיאום הדגמה
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">מערכת ניהול בטיחות</h3>
            <p className="text-gray-300">פתרון מקיף לניהול הבטיחות בארגון שלך</p>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white">
                  התחברות
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white">
                  הרשמה
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">צור קשר</h3>
            <p className="text-gray-300">טלפון: 0503884700</p>
            <p className="text-gray-300">דוא"ל: info@safety-system.co.il</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} מערכת ניהול בטיחות. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  )
}
