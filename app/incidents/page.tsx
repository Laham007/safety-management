// הוספת פונקציונליות לכפתורים בדף האירועים

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search, Plus, AlertTriangle, Clock, CheckCircle } from "lucide-react"
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

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // בפועל כאן היה מתבצע חיפוש
    alert(`מחפש: ${searchQuery}`)
  }

  const handleUpdateStatus = (incidentId: number, newStatus: string) => {
    // בפועל כאן היה מתבצע עדכון סטטוס
    alert(`עדכון סטטוס אירוע #${incidentId} ל-${newStatus}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">אירועי בטיחות</h2>
          <div className="flex items-center space-x-2">
            <Link href="/incidents/new">
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="mr-2 h-4 w-4" /> דיווח אירוע חדש
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
            </div>
            <div className="text-right">
              <h3 className="font-medium text-amber-800">3 אירועי בטיחות חדשים</h3>
              <p className="text-sm text-amber-700">נוספו השבוע וממתינים לטיפול</p>
            </div>
            <Button variant="link" className="text-amber-700 mr-auto" asChild>
              <Link href="/incidents?filter=new">צפה באירועים חדשים</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center space-x-2 text-right">
          <div className="flex-1 flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חיפוש אירועים..."
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
                <DropdownMenuItem onClick={() => setActiveTab("all")}>כל האירועים</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("open")}>אירועים פתוחים</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("closed")}>אירועים סגורים</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("critical")}>אירועים חמורים</DropdownMenuItem>
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
              כל האירועים
            </TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              פתוחים
            </TabsTrigger>
            <TabsTrigger value="closed" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              סגורים
            </TabsTrigger>
            <TabsTrigger value="critical" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              חמורים
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-right">אירוע בטיחות #{i + 1001}</CardTitle>
                        <CardDescription className="text-right">
                          דווח ב-{new Date(Date.now() - i * 86400000 * 3).toLocaleDateString("he-IL")}
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                          i % 3 === 0
                            ? "bg-red-100 text-red-800"
                            : i % 3 === 1
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {i % 3 === 0 ? (
                          <>
                            <AlertTriangle className="h-3 w-3" />
                            <span>חמור</span>
                          </>
                        ) : i % 3 === 1 ? (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>בינוני</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>קל</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-right">
                      <p className="text-sm">
                        {
                          [
                            "נפילת עובד מסולם בעת ביצוע עבודות תחזוקה",
                            "התחשמלות קלה בעת טיפול בלוח חשמל",
                            "החלקה על רצפה רטובה במסדרון",
                            "פציעה קלה בעת הרמת ציוד כבד",
                            "כמעט תאונה - נפילת חפץ מגובה",
                          ][i % 5]
                        }
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">מיקום:</span>{" "}
                          {["מחלקת ייצור", "מחסן", "משרדים", "חדר חשמל", "חצר המפעל"][i % 5]}
                        </div>
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">מדווח:</span>{" "}
                          {["יוסי כהן", "רונית לוי", "אבי שמעוני", "מיכל דוד", "עמית ישראלי"][i % 5]}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="font-semibold text-amber-800">סטטוס:</span>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            i % 2 === 0 ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {i % 2 === 0 ? "פתוח - בטיפול" : "סגור - טופל"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          עדכן סטטוס
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>עדכון סטטוס אירוע</DialogTitle>
                          <DialogDescription>בחר את הסטטוס החדש עבור אירוע #{i + 1001}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => handleUpdateStatus(i + 1001, "פתוח - בטיפול")}
                          >
                            פתוח - בטיפול
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => handleUpdateStatus(i + 1001, "בבדיקה")}
                          >
                            בבדיקה
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => handleUpdateStatus(i + 1001, "הועבר לגורם מטפל")}
                          >
                            הועבר לגורם מטפל
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => handleUpdateStatus(i + 1001, "סגור - טופל")}
                          >
                            סגור - טופל
                          </Button>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">ביטול</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                      <Link href={`/incidents/${i + 1001}`}>צפה בפרטים מלאים</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="open" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">אירועים פתוחים</CardTitle>
                <CardDescription className="text-right">רשימת האירועים הפתוחים שטרם טופלו</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-amber-100 pb-4 text-right"
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          asChild
                        >
                          <Link href={`/incidents/${2001 + i}`}>צפה בפרטים</Link>
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">אירוע בטיחות #{2001 + i}</div>
                        <div className="text-sm text-gray-500">דווח לפני {Math.floor(Math.random() * 10) + 1} ימים</div>
                        <div className="text-sm mt-1">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              i % 3 === 0
                                ? "bg-red-100 text-red-800"
                                : i % 3 === 1
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {i % 3 === 0 ? "חמור" : i % 3 === 1 ? "בינוני" : "קל"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="closed" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">אירועים סגורים</CardTitle>
                <CardDescription className="text-right">רשימת האירועים שטופלו ונסגרו</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-amber-100 pb-4 text-right"
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          asChild
                        >
                          <Link href={`/incidents/${3001 + i}`}>צפה בפרטים</Link>
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">אירוע בטיחות #{3001 + i}</div>
                        <div className="text-sm text-gray-500">טופל לפני {Math.floor(Math.random() * 30) + 1} ימים</div>
                        <div className="text-sm mt-1">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            סגור - טופל
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="critical" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">אירועים חמורים</CardTitle>
                <CardDescription className="text-right">רשימת האירועים החמורים שדורשים טיפול מיידי</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-amber-100 pb-4 text-right"
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          asChild
                        >
                          <Link href={`/incidents/${4001 + i}`}>צפה בפרטים</Link>
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white" size="sm">
                          טיפול מיידי
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">אירוע בטיחות #{4001 + i}</div>
                        <div className="text-sm text-gray-500">דווח לפני {Math.floor(Math.random() * 5) + 1} ימים</div>
                        <div className="text-sm mt-1">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>חמור</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
