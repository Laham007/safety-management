"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { HardHat, Download } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { getCurrentUser, getIncidents, getInspections } from "@/lib/supabase"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [incidents, setIncidents] = useState<any[]>([])
  const [inspections, setInspections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // בדיקה אם המשתמש מחובר וטעינת נתונים
  useEffect(() => {
    async function loadData() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/login")
          return
        }

        setUser(currentUser)

        // טעינת אירועים וביקורות
        const incidentsResponse = await getIncidents()
        const inspectionsResponse = await getInspections()

        // בדיקה אם התשובה מכילה את השדה data
        const incidentsData = incidentsResponse?.data || []
        const inspectionsData = inspectionsResponse?.data || []

        setIncidents(incidentsData)
        setInspections(inspectionsData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleExportReport = () => {
    // בפועל כאן היה מתבצע ייצוא של הדוח
    alert("מייצא דוח...")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-500">טוען נתונים...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">לוח בקרה</h2>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Download className="mr-2 h-4 w-4" />
                  ייצוא דוח
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>ייצוא דוח</DialogTitle>
                  <DialogDescription>בחר את סוג הדוח שברצונך לייצא</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleExportReport} className="w-full justify-center">
                      דוח PDF
                    </Button>
                    <Button variant="outline" onClick={handleExportReport} className="w-full justify-center">
                      דוח Excel
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleExportReport} className="w-full justify-center">
                      דוח חודשי
                    </Button>
                    <Button variant="outline" onClick={handleExportReport} className="w-full justify-center">
                      דוח שנתי
                    </Button>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      סגור
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <HardHat className="h-5 w-5 text-amber-700" />
            </div>
            <div className="text-right">
              <h3 className="font-medium text-amber-800">ברוך הבא, {user?.name || "מנהל הבטיחות"}</h3>
              <p className="text-sm text-amber-700">יש לך 3 משימות בטיחות לטיפול היום</p>
            </div>
            <Button variant="link" className="text-amber-700 mr-auto" asChild>
              <Link href="/tasks">צפה במשימות</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4 text-right" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-amber-50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              סקירה כללית
            </TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              אירועים
            </TabsTrigger>
            <TabsTrigger
              value="inspections"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              ביקורות
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              הדרכות
            </TabsTrigger>
          </TabsList>

          {/* תוכן הטאבים נשאר כפי שהוא */}
        </Tabs>
      </div>
    </div>
  )
}
