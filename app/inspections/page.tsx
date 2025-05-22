// הוספת פונקציונליות לכפתורים בדף הביקורות

"use client"

import type React from "react"

import { useState } from "react"
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckSquare,
  Search,
  Filter,
  Plus,
  Calendar,
  FileText,
  ClipboardCheck,
  ClipboardList,
  AlertCircle,
} from "lucide-react"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InspectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // בפועל כאן היה מתבצע חיפוש
    alert(`מחפש: ${searchQuery}`)
  }

  const handleReschedule = (inspectionId: number, newDate: string) => {
    // בפועל כאן היה מתבצע תזמון מחדש
    alert(`תזמון מחדש של ביקורת #${inspectionId} לתאריך ${newDate}`)
  }

  const handlePerformInspection = (inspectionId: number) => {
    // בפועל כאן היה מתבצעת הפניה לדף ביצוע ביקורת
    window.location.href = `/inspections/${inspectionId}/perform`
  }

  const handleScheduleFollowUp = (inspectionId: number) => {
    // בפועל כאן היה מתבצע תזמון ביקורת חוזרת
    alert(`תזמון ביקורת חוזרת לביקורת #${inspectionId}`)
  }

  const handleViewReport = (inspectionId: number) => {
    // בפועל כאן היה מתבצעת צפייה בדוח
    window.open(`/inspections/${inspectionId}/report`, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">ביקורות בטיחות</h2>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" /> ביקורת חדשה
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>תזמון ביקורת חדשה</DialogTitle>
                  <DialogDescription>הזן את פרטי הביקורת החדשה</DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="inspection-type" className="text-sm font-medium text-right block">
                      סוג ביקורת
                    </label>
                    <select id="inspection-type" className="w-full border border-amber-200 rounded-md p-2">
                      <option value="periodic">תקופתית</option>
                      <option value="annual">שנתית</option>
                      <option value="quarterly">רבעונית</option>
                      <option value="monthly">חודשית</option>
                      <option value="weekly">שבועית</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="inspection-title" className="text-sm font-medium text-right block">
                      כותרת הביקורת
                    </label>
                    <Input id="inspection-title" className="border-amber-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="inspection-date" className="text-sm font-medium text-right block">
                      תאריך ביקורת
                    </label>
                    <Input id="inspection-date" type="date" className="border-amber-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="inspection-location" className="text-sm font-medium text-right block">
                      מיקום
                    </label>
                    <Input id="inspection-location" className="border-amber-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="inspection-responsible" className="text-sm font-medium text-right block">
                      אחראי ביקורת
                    </label>
                    <Input id="inspection-responsible" className="border-amber-200" />
                  </div>
                </form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">ביטול</Button>
                  </DialogClose>
                  <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => alert("ביקורת חדשה נוצרה בהצלחה")}>
                    צור ביקורת
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <ClipboardList className="h-5 w-5 text-amber-700" />
            </div>
            <div className="text-right">
              <h3 className="font-medium text-amber-800">2 ביקורות מתוכננות השבוע</h3>
              <p className="text-sm text-amber-700">יש להיערך לביצוע הביקורות</p>
            </div>
            <Button variant="link" className="text-amber-700 mr-auto" asChild>
              <Link href="/inspections?filter=this-week">צפה בביקורות השבוע</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center space-x-2 text-right">
          <div className="flex-1 flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חיפוש ביקורות..."
                className="w-full pl-8 bg-white border-amber-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Filter className="mr-2 h-4 w-4" />
                  סינון
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("all")}>כל הביקורות</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("scheduled")}>ביקורות מתוכננות</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("completed")}>ביקורות שהושלמו</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("overdue")}>ביקורות באיחור</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              חפש
            </Button>
          </div>
        </form>

        <Tabs defaultValue="all" className="space-y-4 text-right" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-amber-50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              כל הביקורות
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              מתוכננות
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              הושלמו
            </TabsTrigger>
            <TabsTrigger value="overdue" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              באיחור
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-right">
                          {
                            [
                              "ביקורת בטיחות תקופתית - מחלקת ייצור",
                              "ביקורת מערכות כיבוי אש",
                              "ביקורת ציוד מגן אישי",
                              "ביקורת בטיחות חשמל",
                              "ביקורת עבודה בגובה",
                              "ביקורת מלגזות וציוד הרמה",
                              "ביקורת חומרים מסוכנים",
                              "ביקורת בטיחות כללית",
                            ][i]
                          }
                        </CardTitle>
                        <CardDescription className="text-right">
                          {i % 2 === 0
                            ? `מתוכננת ל-${new Date(Date.now() + i * 86400000 * 3).toLocaleDateString("he-IL")}`
                            : `הושלמה ב-${new Date(Date.now() - i * 86400000 * 2).toLocaleDateString("he-IL")}`}
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                          i % 2 === 0 ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {i % 2 === 0 ? (
                          <>
                            <Calendar className="h-3 w-3" />
                            <span>מתוכננת</span>
                          </>
                        ) : (
                          <>
                            <CheckSquare className="h-3 w-3" />
                            <span>הושלמה</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-right">
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">סוג ביקורת:</span>{" "}
                          <span className="text-gray-600">
                            {["תקופתית", "שנתית", "רבעונית", "חודשית", "שבועית"][i % 5]}
                          </span>
                        </div>
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">אחראי ביקורת:</span>{" "}
                          <span className="text-gray-600">
                            {["יוסי כהן", "רונית לוי", "אבי שמעוני", "מיכל דוד", "עמית ישראלי"][i % 5]}
                          </span>
                        </div>
                      </div>
                      {i % 2 === 1 && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-semibold text-amber-800">ממצאים:</span>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                              Math.floor(Math.random() * 5) > 2
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {Math.floor(Math.random() * 5) > 2 ? (
                              <>
                                <AlertCircle className="h-3 w-3" />
                                <span>{Math.floor(Math.random() * 5)} ליקויים נמצאו</span>
                              </>
                            ) : (
                              <>
                                <CheckSquare className="h-3 w-3" />
                                <span>לא נמצאו ליקויים</span>
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    {i % 2 === 0 ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          onClick={() => handleReschedule(i, new Date().toLocaleDateString())}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          תזמון מחדש
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handlePerformInspection(i)}
                        >
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          בצע ביקורת
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          onClick={() => handleScheduleFollowUp(i)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          תזמן ביקורת חוזרת
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handleViewReport(i)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          צפה בדוח
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">ביקורות מתוכננות</CardTitle>
                <CardDescription className="text-right">רשימת כל הביקורות המתוכננות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-right">תוכן הביקורות המתוכננות יוצג כאן</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">ביקורות שהושלמו</CardTitle>
                <CardDescription className="text-right">רשימת כל הביקורות שהושלמו</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-right">תוכן הביקורות שהושלמו יוצג כאן</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overdue" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">ביקורות באיחור</CardTitle>
                <CardDescription className="text-right">רשימת כל הביקורות שעברו את מועד הביצוע המתוכנן</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-right">תוכן הביקורות באיחור יוצג כאן</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
