// הוספת פונקציונליות לכפתורים בדף המסמכים

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Filter, Plus, Download, Eye, FileCheck, FilePlus2, FileWarning } from "lucide-react"
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

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // בפועל כאן היה מתבצע חיפוש
    alert(`מחפש: ${searchQuery}`)
  }

  const handleDownload = (docId: number) => {
    // בפועל כאן היה מתבצעת הורדה
    alert(`מוריד מסמך #${docId}`)
  }

  const handleViewDocument = (docId: number) => {
    // בפועל כאן היה מתבצעת צפייה במסמך
    window.open(`/documents/${docId}/view`, "_blank")
  }

  const handleUploadDocument = (formData: FormData) => {
    // בפועל כאן היה מתבצעת העלאת מסמך
    alert("מסמך הועלה בהצלחה")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">מסמכי בטיחות</h2>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" /> העלאת מסמך חדש
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>העלאת מסמך חדש</DialogTitle>
                  <DialogDescription>בחר את סוג המסמך והעלה את הקובץ</DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="doc-type" className="text-sm font-medium text-right block">
                      סוג מסמך
                    </label>
                    <select id="doc-type" className="w-full border border-amber-200 rounded-md p-2">
                      <option value="procedure">נוהל</option>
                      <option value="training">הדרכה</option>
                      <option value="report">דוח</option>
                      <option value="certificate">תעודה</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="doc-title" className="text-sm font-medium text-right block">
                      כותרת המסמך
                    </label>
                    <Input id="doc-title" className="border-amber-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="doc-file" className="text-sm font-medium text-right block">
                      קובץ
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="doc-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-200 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FilePlus2 className="w-8 h-8 mb-2 text-amber-500" />
                          <p className="mb-2 text-sm text-amber-700">
                            <span className="font-semibold">לחץ להעלאת קובץ</span> או גרור לכאן
                          </p>
                          <p className="text-xs text-amber-600">PDF, DOCX, XLSX או JPG (מקס' 10MB)</p>
                        </div>
                        <Input id="doc-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">ביטול</Button>
                  </DialogClose>
                  <Button
                    className="bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleUploadDocument(new FormData())}
                  >
                    העלה מסמך
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <FileWarning className="h-5 w-5 text-amber-700" />
            </div>
            <div className="text-right">
              <h3 className="font-medium text-amber-800">2 מסמכים פגי תוקף</h3>
              <p className="text-sm text-amber-700">יש לעדכן את המסמכים בהקדם</p>
            </div>
            <Button variant="link" className="text-amber-700 mr-auto" asChild>
              <Link href="/documents?filter=expired">צפה במסמכים פגי תוקף</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center space-x-2 text-right">
          <div className="flex-1 flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חיפוש מסמכים..."
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
                <DropdownMenuItem onClick={() => setActiveTab("all")}>כל המסמכים</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("procedures")}>נהלים</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("training")}>הדרכות</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("reports")}>דוחות</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("certificates")}>תעודות</DropdownMenuItem>
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
              כל המסמכים
            </TabsTrigger>
            <TabsTrigger value="procedures" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              נהלים
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              הדרכות
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
              דוחות
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              תעודות
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-right">
                          {
                            [
                              "נוהל בטיחות כללי",
                              "נוהל עבודה בגובה",
                              "הדרכת בטיחות אש",
                              "דוח ביקורת שנתית",
                              "תעודת הסמכה - עבודה בגובה",
                              "נוהל טיפול בחומרים מסוכנים",
                              "הדרכת עזרה ראשונה",
                              "דוח תאונות עבודה",
                              "תעודת ממונה בטיחות",
                            ][i]
                          }
                        </CardTitle>
                        <CardDescription className="text-right">
                          עודכן ב-{new Date(Date.now() - i * 86400000 * 7).toLocaleDateString("he-IL")}
                        </CardDescription>
                      </div>
                      <div className="bg-amber-50 p-2 rounded-full">
                        {i % 4 === 0 ? (
                          <FileText className="h-5 w-5 text-amber-500" />
                        ) : i % 4 === 1 ? (
                          <FileCheck className="h-5 w-5 text-green-500" />
                        ) : i % 4 === 2 ? (
                          <FilePlus2 className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileWarning className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-right">
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">סוג:</span>{" "}
                          <span className="text-gray-600">
                            {["נוהל", "נוהל", "הדרכה", "דוח", "תעודה", "נוהל", "הדרכה", "דוח", "תעודה"][i]}
                          </span>
                        </div>
                        <div className="bg-amber-50 p-2 rounded-md">
                          <span className="font-semibold text-amber-800">גודל:</span>{" "}
                          <span className="text-gray-600">{Math.floor(Math.random() * 10) + 1} MB</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="font-semibold text-amber-800">הועלה ע"י:</span>{" "}
                        {["יוסי כהן", "רונית לוי", "אבי שמעוני", "מיכל דוד", "עמית ישראלי"][i % 5]}
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            i % 3 === 0
                              ? "bg-green-100 text-green-800"
                              : i % 3 === 1
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {i % 3 === 0 ? "בתוקף" : i % 3 === 1 ? "עומד לפוג" : "פג תוקף"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => handleDownload(1000 + i)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      הורדה
                    </Button>
                    <Button
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600"
                      onClick={() => handleViewDocument(1000 + i)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      צפייה
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="procedures" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">נהלי בטיחות</CardTitle>
                <CardDescription className="text-right">רשימת כל נהלי הבטיחות במערכת</CardDescription>
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
                          onClick={() => handleDownload(2000 + i)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          הורדה
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handleViewDocument(2000 + i)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          צפייה
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">
                          {["נוהל בטיחות כללי", "נוהל עבודה בגובה", "נוהל טיפול בחומרים מסוכנים"][i]}
                        </div>
                        <div className="text-sm text-gray-500">
                          עודכן ב-{new Date(Date.now() - i * 86400000 * 10).toLocaleDateString("he-IL")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="training" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">חומרי הדרכה</CardTitle>
                <CardDescription className="text-right">רשימת כל חומרי ההדרכה במערכת</CardDescription>
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
                          onClick={() => handleDownload(3000 + i)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          הורדה
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handleViewDocument(3000 + i)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          צפייה
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">
                          {["הדרכת בטיחות אש", "הדרכת עזרה ראשונה", "הדרכת ציוד מגן אישי"][i]}
                        </div>
                        <div className="text-sm text-gray-500">
                          עודכן ב-{new Date(Date.now() - i * 86400000 * 15).toLocaleDateString("he-IL")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">דוחות בטיחות</CardTitle>
                <CardDescription className="text-right">רשימת כל דוחות הבטיחות במערכת</CardDescription>
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
                          onClick={() => handleDownload(4000 + i)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          הורדה
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handleViewDocument(4000 + i)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          צפייה
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">
                          {["דוח ביקורת שנתית", "דוח תאונות עבודה", "דוח ביקורת רבעונית"][i]}
                        </div>
                        <div className="text-sm text-gray-500">
                          עודכן ב-{new Date(Date.now() - i * 86400000 * 20).toLocaleDateString("he-IL")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="certificates" className="space-y-4">
            <Card className="border-amber-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">תעודות והסמכות</CardTitle>
                <CardDescription className="text-right">רשימת כל התעודות וההסמכות במערכת</CardDescription>
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
                          onClick={() => handleDownload(5000 + i)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          הורדה
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => handleViewDocument(5000 + i)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          צפייה
                        </Button>
                      </div>
                      <div>
                        <div className="font-medium">
                          {["תעודת הסמכה - עבודה בגובה", "תעודת ממונה בטיחות", "תעודת מגיש עזרה ראשונה"][i]}
                        </div>
                        <div className="text-sm text-gray-500">
                          עודכן ב-{new Date(Date.now() - i * 86400000 * 25).toLocaleDateString("he-IL")}
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
