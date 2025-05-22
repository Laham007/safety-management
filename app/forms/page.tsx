"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Printer, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const forms = [
    {
      id: "safety-committee",
      title: "הודעה על הקמת ועדת בטיחות",
      description: "טופס הודעה על הקמת ועדת בטיחות במקום העבודה",
      path: "/forms/safety-committee",
    },
    {
      id: "lifting-equipment",
      title: "כתב מינוי למכונות הרמה",
      description: "כתב מינוי למפעיל מכונות הרמה",
      path: "/forms/lifting-equipment",
    },
    {
      id: "accident-report",
      title: "דיווח על תאונת עבודה או מחלת מקצוע",
      description: "טופס דיווח על תאונת עבודה או מחלת מקצוע",
      path: "/forms/accident-report",
    },
    {
      id: "work-manager",
      title: "כתב מינוי למנהל עבודה",
      description: "כתב מינוי למנהל עבודה באתר בנייה",
      path: "/forms/work-manager",
    },
    {
      id: "safety-trustee",
      title: "כתב מינוי לנאמן בטיחות",
      description: "כתב מינוי לנאמן בטיחות במקום העבודה",
      path: "/forms/safety-trustee",
    },
    {
      id: "construction-notice",
      title: "הודעה על פעולות בנייה",
      description: "טופס הודעה על פעולות בנייה למפקח עבודה אזורי",
      path: "/forms/construction-notice",
    },
    {
      id: "training-registration",
      title: "טופס רישום הדרכה",
      description: "טופס לרישום הדרכת בטיחות לעובדים",
      path: "/forms/training-registration",
    },
    {
      id: "height-work",
      title: "אישור להדרכת עובד גובה",
      description: "אישור על הדרכת עובד לעבודה בגובה",
      path: "/forms/height-work",
    },
    {
      id: "safety-officer",
      title: "הודעה על מינוי ממונה בטיחות",
      description: "טופס הודעה על מינוי ממונה על הבטיחות",
      path: "/forms/safety-officer",
    },
    {
      id: "qualified-person",
      title: "כתב מינוי לאדם כשיר",
      description: "כתב מינוי לאדם כשיר לבדיקות תקופתיות",
      path: "/forms/qualified-person",
    },
    {
      id: "insurance-form-250",
      title: "טופס ביטוח לאומי 250",
      description: "בקשה למתן טיפול רפואי לנפגע בעבודה",
      path: "/forms/insurance-form-250",
    },
  ]

  const filteredForms = forms.filter(
    (form) => form.title.includes(searchQuery) || form.description.includes(searchQuery),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 text-right">
      <h1 className="text-3xl font-bold mb-6">טפסי בטיחות</h1>

      <div className="mb-6">
        <div className="relative w-full max-w-md mr-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="חיפוש טפסים..."
            className="pl-10 pr-4 border-amber-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-amber-50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            כל הטפסים
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            כתבי מינוי
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            דיווחים
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            הדרכות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((form) => (
              <Card key={form.id} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-right">{form.title}</CardTitle>
                  <CardDescription className="text-right">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <FileText className="h-16 w-16 text-amber-300" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                  <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <Printer className="mr-2 h-4 w-4" />
                    הדפסה
                  </Button>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                    <Link href={form.path}>
                      <FileText className="mr-2 h-4 w-4" />
                      צפייה
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms
              .filter((form) =>
                ["lifting-equipment", "work-manager", "safety-trustee", "safety-officer", "qualified-person"].includes(
                  form.id,
                ),
              )
              .map((form) => (
                <Card key={form.id} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-right">{form.title}</CardTitle>
                    <CardDescription className="text-right">{form.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <FileText className="h-16 w-16 text-amber-300" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Printer className="mr-2 h-4 w-4" />
                      הדפסה
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                      <Link href={form.path}>
                        <FileText className="mr-2 h-4 w-4" />
                        צפייה
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms
              .filter((form) =>
                ["accident-report", "construction-notice", "safety-committee", "insurance-form-250"].includes(form.id),
              )
              .map((form) => (
                <Card key={form.id} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-right">{form.title}</CardTitle>
                    <CardDescription className="text-right">{form.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <FileText className="h-16 w-16 text-amber-300" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Printer className="mr-2 h-4 w-4" />
                      הדפסה
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                      <Link href={form.path}>
                        <FileText className="mr-2 h-4 w-4" />
                        צפייה
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms
              .filter((form) => ["training-registration", "height-work"].includes(form.id))
              .map((form) => (
                <Card key={form.id} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-right">{form.title}</CardTitle>
                    <CardDescription className="text-right">{form.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <FileText className="h-16 w-16 text-amber-300" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                    <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Printer className="mr-2 h-4 w-4" />
                      הדפסה
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                      <Link href={form.path}>
                        <FileText className="mr-2 h-4 w-4" />
                        צפייה
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
