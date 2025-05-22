"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { he } from "date-fns/locale"
import { CalendarIcon, Search, Filter, Plus, Download, FileCheck, FileWarning, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

// סוגי הנספחים/ביקורות
const ATTACHMENT_TYPES = [
  { id: "fire_equipment", name: "ביקורת ציוד כיבוי אש מטלטל" },
  { id: "sprinklers", name: "ביקורת מתזים שנתית" },
  { id: "electrical_cabinets", name: "ביקורת ארונות חשמל" },
  { id: "emergency_lighting", name: "ביקורת תאורת חירום" },
  { id: "fire_alarms", name: "ביקורת מערכות גילוי אש" },
  { id: "first_aid", name: "ביקורת ציוד עזרה ראשונה" },
  { id: "ladders", name: "ביקורת סולמות" },
  { id: "lifting_equipment", name: "ביקורת ציוד הרמה" },
  { id: "ppe", name: "ביקורת ציוד מגן אישי" },
  { id: "safety_signs", name: "ביקורת שילוט בטיחות" },
]

interface Attachment {
  id: string
  title: string
  type: string
  description: string
  inspection_date: string
  next_inspection_date: string
  inspector_name: string
  file_url?: string
  file_name?: string
  created_at: string
}

export default function AttachmentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [loading, setLoading] = useState(true)
  const [inspectionDate, setInspectionDate] = useState<Date | undefined>(new Date())
  const [nextInspectionDate, setNextInspectionDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() + 12)),
  )
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    inspector_name: "",
  })

  // טעינת הנספחים בעת טעינת הדף
  useState(() => {
    fetchAttachments()
  })

  // פונקציה לטעינת הנספחים מ-Supabase
  const fetchAttachments = async () => {
    try {
      setLoading(true)
      // בסביבת פיתוח, נשתמש בנתונים מדומים
      if (!supabase) {
        const mockData: Attachment[] = Array.from({ length: 8 }).map((_, i) => ({
          id: `att-${i + 1}`,
          title: `${ATTACHMENT_TYPES[i % ATTACHMENT_TYPES.length].name} - ${i + 1}`,
          type: ATTACHMENT_TYPES[i % ATTACHMENT_TYPES.length].id,
          description: `תיאור לביקורת ${ATTACHMENT_TYPES[i % ATTACHMENT_TYPES.length].name}`,
          inspection_date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
          next_inspection_date: new Date(Date.now() + (12 - i) * 30 * 24 * 60 * 60 * 1000).toISOString(),
          inspector_name: ["יוסי כהן", "רונית לוי", "אבי שמעוני", "מיכל דוד"][i % 4],
          created_at: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
        }))
        setAttachments(mockData)
        setLoading(false)
        return
      }

      // בסביבת ייצור, נשתמש ב-Supabase
      const { data, error } = await supabase.from("attachments").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching attachments:", error)
        toast({
          title: "שגיאה בטעינת נספחים",
          description: error.message,
          variant: "destructive",
        })
      } else {
        setAttachments(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // פונקציה להעלאת קובץ ל-Supabase Storage
  const uploadFile = async (file: File) => {
    if (!supabase) {
      console.error("Supabase client not initialized")
      return null
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `attachments/${fileName}`

    const { data, error } = await supabase.storage.from("files").upload(filePath, file)

    if (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "שגיאה בהעלאת קובץ",
        description: error.message,
        variant: "destructive",
      })
      return null
    }

    // קבלת URL לקובץ
    const { data: urlData } = supabase.storage.from("files").getPublicUrl(filePath)

    return {
      url: urlData.publicUrl,
      name: file.name,
    }
  }

  // פונקציה להוספת נספח חדש
  const handleAddAttachment = async () => {
    try {
      if (!formData.title || !formData.type || !inspectionDate) {
        toast({
          title: "שגיאה",
          description: "נא למלא את כל השדות החובה",
          variant: "destructive",
        })
        return
      }

      let fileData = null
      if (selectedFile) {
        fileData = await uploadFile(selectedFile)
      }

      const newAttachment = {
        title: formData.title,
        type: formData.type,
        description: formData.description,
        inspection_date: inspectionDate.toISOString(),
        next_inspection_date: nextInspectionDate?.toISOString() || "",
        inspector_name: formData.inspector_name,
        file_url: fileData?.url,
        file_name: fileData?.name,
      }

      // בסביבת פיתוח, נוסיף את הנספח למערך המקומי
      if (!supabase) {
        const mockAttachment: Attachment = {
          ...newAttachment,
          id: `att-${attachments.length + 1}`,
          created_at: new Date().toISOString(),
        }
        setAttachments([mockAttachment, ...attachments])
        toast({
          title: "נספח נוסף בהצלחה",
          description: "הנספח נוסף למערכת בהצלחה",
        })
        resetForm()
        return
      }

      // בסביבת ייצור, נשמור ב-Supabase
      const { data, error } = await supabase.from("attachments").insert([newAttachment]).select()

      if (error) {
        console.error("Error adding attachment:", error)
        toast({
          title: "שגיאה בהוספת נספח",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "נספח נוסף בהצלחה",
          description: "הנספח נוסף למערכת בהצלחה",
        })
        fetchAttachments()
        resetForm()
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהוספת הנספח",
        variant: "destructive",
      })
    }
  }

  // פונקציה למחיקת נספח
  const handleDeleteAttachment = async (id: string) => {
    try {
      // בסביבת פיתוח, נמחק מהמערך המקומי
      if (!supabase) {
        setAttachments(attachments.filter((att) => att.id !== id))
        toast({
          title: "נספח נמחק בהצלחה",
          description: "הנספח הוסר מהמערכת",
        })
        return
      }

      // בסביבת ייצור, נמחק מ-Supabase
      const { error } = await supabase.from("attachments").delete().eq("id", id)

      if (error) {
        console.error("Error deleting attachment:", error)
        toast({
          title: "שגיאה במחיקת נספח",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "נספח נמחק בהצלחה",
          description: "הנספח הוסר מהמערכת",
        })
        fetchAttachments()
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה במחיקת הנספח",
        variant: "destructive",
      })
    }
  }

  // פונקציה להורדת קובץ
  const handleDownloadFile = (url?: string, fileName?: string) => {
    if (!url) {
      toast({
        title: "שגיאה",
        description: "אין קובץ להורדה",
        variant: "destructive",
      })
      return
    }

    const link = document.createElement("a")
    link.href = url
    link.download = fileName || "attachment"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // פונקציה לאיפוס הטופס
  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      description: "",
      inspector_name: "",
    })
    setInspectionDate(new Date())
    setNextInspectionDate(new Date(new Date().setMonth(new Date().getMonth() + 12)))
    setSelectedFile(null)
  }

  // פונקציה לסינון נספחים לפי סוג
  const filteredAttachments = attachments.filter((attachment) => {
    if (activeTab !== "all" && attachment.type !== activeTab) {
      return false
    }
    if (searchQuery) {
      return (
        attachment.title.includes(searchQuery) ||
        attachment.description.includes(searchQuery) ||
        attachment.inspector_name.includes(searchQuery)
      )
    }
    return true
  })

  // פונקציה לטיפול בשינוי קובץ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">נספחים וביקורות</h2>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" /> הוספת נספח חדש
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>הוספת נספח או ביקורת חדשה</DialogTitle>
                  <DialogDescription>הזן את פרטי הנספח או הביקורת</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right col-span-1">
                      כותרת <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right col-span-1">
                      סוג ביקורת <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="בחר סוג ביקורת" />
                      </SelectTrigger>
                      <SelectContent>
                        {ATTACHMENT_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right col-span-1">
                      תיאור
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="inspection-date" className="text-right col-span-1">
                      תאריך ביקורת <span className="text-red-500">*</span>
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-right ${!inspectionDate && "text-muted-foreground"}`}
                          >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {inspectionDate ? (
                              format(inspectionDate, "dd/MM/yyyy", { locale: he })
                            ) : (
                              <span>בחר תאריך</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={inspectionDate} onSelect={setInspectionDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="next-inspection-date" className="text-right col-span-1">
                      תאריך ביקורת הבא
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-right ${
                              !nextInspectionDate && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {nextInspectionDate ? (
                              format(nextInspectionDate, "dd/MM/yyyy", { locale: he })
                            ) : (
                              <span>בחר תאריך</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={nextInspectionDate}
                            onSelect={setNextInspectionDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="inspector" className="text-right col-span-1">
                      שם הבודק
                    </Label>
                    <Input
                      id="inspector"
                      value={formData.inspector_name}
                      onChange={(e) => setFormData({ ...formData, inspector_name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right col-span-1">
                      קובץ
                    </Label>
                    <div className="col-span-3">
                      <Input id="file" type="file" onChange={handleFileChange} />
                      {selectedFile && (
                        <p className="mt-2 text-sm text-gray-500">
                          נבחר: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>
                    איפוס
                  </Button>
                  <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleAddAttachment}>
                    הוסף נספח
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
              <h3 className="font-medium text-amber-800">3 ביקורות עומדות לפוג</h3>
              <p className="text-sm text-amber-700">יש לתזמן ביקורות חדשות בהקדם</p>
            </div>
            <Button variant="link" className="text-amber-700 mr-auto" asChild>
              <Link href="/attachments?filter=expiring">צפה בביקורות שעומדות לפוג</Link>
            </Button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            // כאן יהיה קוד החיפוש
          }}
          className="flex items-center space-x-2 text-right"
        >
          <div className="flex-1 flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חיפוש נספחים וביקורות..."
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
                <DropdownMenuItem onClick={() => setActiveTab("all")}>כל הנספחים</DropdownMenuItem>
                {ATTACHMENT_TYPES.map((type) => (
                  <DropdownMenuItem key={type.id} onClick={() => setActiveTab(type.id)}>
                    {type.name}
                  </DropdownMenuItem>
                ))}
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
              כל הנספחים
            </TabsTrigger>
            {ATTACHMENT_TYPES.slice(0, 5).map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
              >
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="text-center p-8">טוען נתונים...</div>
            ) : filteredAttachments.length === 0 ? (
              <div className="text-center p-8">לא נמצאו נספחים</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAttachments.map((attachment) => {
                  // חישוב אם הביקורת פגה או עומדת לפוג
                  const nextInspection = attachment.next_inspection_date
                    ? new Date(attachment.next_inspection_date)
                    : null
                  const now = new Date()
                  const isExpired = nextInspection ? nextInspection < now : false
                  const isExpiring =
                    nextInspection && !isExpired ? nextInspection < new Date(now.setMonth(now.getMonth() + 1)) : false

                  // מציאת שם הסוג
                  const typeObj = ATTACHMENT_TYPES.find((t) => t.id === attachment.type)
                  const typeName = typeObj ? typeObj.name : attachment.type

                  return (
                    <Card key={attachment.id} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-right">{attachment.title}</CardTitle>
                            <CardDescription className="text-right">
                              {new Date(attachment.inspection_date).toLocaleDateString("he-IL")}
                            </CardDescription>
                          </div>
                          <div className="bg-amber-50 p-2 rounded-full">
                            {isExpired ? (
                              <FileWarning className="h-5 w-5 text-red-500" />
                            ) : isExpiring ? (
                              <FileWarning className="h-5 w-5 text-amber-500" />
                            ) : (
                              <FileCheck className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-right">
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-amber-50 p-2 rounded-md">
                              <span className="font-semibold text-amber-800">סוג:</span>{" "}
                              <span className="text-gray-600">{typeName}</span>
                            </div>
                            <div className="bg-amber-50 p-2 rounded-md">
                              <span className="font-semibold text-amber-800">בודק:</span>{" "}
                              <span className="text-gray-600">{attachment.inspector_name || "לא צוין"}</span>
                            </div>
                          </div>
                          {attachment.next_inspection_date && (
                            <div className="mt-2 text-sm">
                              <span className="font-semibold text-amber-800">ביקורת הבאה:</span>{" "}
                              {new Date(attachment.next_inspection_date).toLocaleDateString("he-IL")}
                            </div>
                          )}
                          {attachment.description && (
                            <div className="mt-2 text-sm text-gray-600">{attachment.description}</div>
                          )}
                          <div className="mt-2">
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full ${
                                isExpired
                                  ? "bg-red-100 text-red-800"
                                  : isExpiring
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {isExpired ? "פג תוקף" : isExpiring ? "עומד לפוג" : "בתוקף"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteAttachment(attachment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          מחיקה
                        </Button>
                        {attachment.file_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                            onClick={() => handleDownloadFile(attachment.file_url, attachment.file_name)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            הורדה
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
          {ATTACHMENT_TYPES.map((type) => (
            <TabsContent key={type.id} value={type.id} className="space-y-4">
              {loading ? (
                <div className="text-center p-8">טוען נתונים...</div>
              ) : filteredAttachments.length === 0 ? (
                <div className="text-center p-8">לא נמצאו נספחים מסוג {type.name}</div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAttachments.map((attachment) => {
                    // חישוב אם הביקורת פגה או עומדת לפוג
                    const nextInspection = attachment.next_inspection_date
                      ? new Date(attachment.next_inspection_date)
                      : null
                    const now = new Date()
                    const isExpired = nextInspection ? nextInspection < now : false
                    const isExpiring =
                      nextInspection && !isExpired ? nextInspection < new Date(now.setMonth(now.getMonth() + 1)) : false

                    return (
                      <Card
                        key={attachment.id}
                        className="border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-right">{attachment.title}</CardTitle>
                              <CardDescription className="text-right">
                                {new Date(attachment.inspection_date).toLocaleDateString("he-IL")}
                              </CardDescription>
                            </div>
                            <div className="bg-amber-50 p-2 rounded-full">
                              {isExpired ? (
                                <FileWarning className="h-5 w-5 text-red-500" />
                              ) : isExpiring ? (
                                <FileWarning className="h-5 w-5 text-amber-500" />
                              ) : (
                                <FileCheck className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-right">
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-amber-50 p-2 rounded-md">
                                <span className="font-semibold text-amber-800">בודק:</span>{" "}
                                <span className="text-gray-600">{attachment.inspector_name || "לא צוין"}</span>
                              </div>
                              <div className="bg-amber-50 p-2 rounded-md">
                                <span className="font-semibold text-amber-800">ביקורת הבאה:</span>{" "}
                                <span className="text-gray-600">
                                  {attachment.next_inspection_date
                                    ? new Date(attachment.next_inspection_date).toLocaleDateString("he-IL")
                                    : "לא צוין"}
                                </span>
                              </div>
                            </div>
                            {attachment.description && (
                              <div className="mt-2 text-sm text-gray-600">{attachment.description}</div>
                            )}
                            <div className="mt-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  isExpired
                                    ? "bg-red-100 text-red-800"
                                    : isExpiring
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {isExpired ? "פג תוקף" : isExpiring ? "עומד לפוג" : "בתוקף"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteAttachment(attachment.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            מחיקה
                          </Button>
                          {attachment.file_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-200 text-amber-700 hover:bg-amber-50"
                              onClick={() => handleDownloadFile(attachment.file_url, attachment.file_name)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              הורדה
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
