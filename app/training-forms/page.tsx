"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Download, Upload, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TrainingFormsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const trainingForms = [
    {
      id: "general-safety",
      title: "הדרכת בטיחות כללית",
      description: "טופס הדרכת בטיחות כללית לעובדים חדשים וותיקים",
      category: "general",
      path: "/training-forms/general-safety",
    },
    {
      id: "height-work",
      title: "קורס עבודה בגובה",
      description: "טופס הדרכה והסמכה לעבודה בגובה",
      category: "specialized",
      path: "/training-forms/height-work",
    },
    {
      id: "fire-safety",
      title: "הדרכות אש",
      description: "טופס הדרכה בנושא בטיחות אש ומניעת שריפות",
      category: "emergency",
      path: "/training-forms/fire-safety",
    },
    {
      id: "hazardous-materials",
      title: "קורס חומרים מסוכנים",
      description: "טופס הדרכה לעבודה עם חומרים מסוכנים",
      category: "specialized",
      path: "/training-forms/hazardous-materials",
    },
    {
      id: "ergonomics",
      title: "הדרכות ארגונומיה",
      description: "טופס הדרכה בנושא ארגונומיה ומניעת פגיעות שלד-שריר",
      category: "general",
      path: "/training-forms/ergonomics",
    },
    {
      id: "forklift-refresher",
      title: "הדרכות ריענון מלגזה",
      description: "טופס הדרכת ריענון למפעילי מלגזה",
      category: "specialized",
      path: "/training-forms/forklift-refresher",
    },
    {
      id: "emergency-team",
      title: "הדרכת צוות חירום",
      description: "טופס הדרכה לצוותי חירום ותגובה ראשונית",
      category: "emergency",
      path: "/training-forms/emergency-team",
    },
    {
      id: "construction-site",
      title: "הדרכת עובדים באתר בניה",
      description: "טופס הדרכת בטיחות לעובדים באתר בניה",
      category: "specialized",
      path: "/training-forms/construction-site",
    },
    {
      id: "first-aid",
      title: "קורס מגיש עזרה ראשונה",
      description: "טופס הדרכה והסמכה למגישי עזרה ראשונה",
      category: "emergency",
      path: "/training-forms/first-aid",
    },
    {
      id: "office-safety",
      title: "הדרכות בטיחות לעובדי משרד",
      description: "טופס הדרכת בטיחות ייעודית לעובדי משרד",
      category: "general",
      path: "/training-forms/office-safety",
    },
    {
      id: "electrical-safety",
      title: "הדרכת בטיחות בחשמל",
      description: "טופס הדרכה בנושא בטיחות בעבודה עם חשמל",
      category: "specialized",
      path: "/training-forms/electrical-safety",
    },
  ]

  const filteredForms = trainingForms.filter(
    (form) =>
      (form.title.includes(searchQuery) || form.description.includes(searchQuery)) &&
      (activeTab === "all" || form.category === activeTab),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 text-right">
      <h1 className="text-3xl font-bold mb-6">טפסי הדרכות בטיחות</h1>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-amber-700" />
          </div>
          <div className="text-right">
            <h3 className="font-medium text-amber-800">מערכת ניהול טפסי הדרכות</h3>
            <p className="text-sm text-amber-700">כאן תוכל למצוא, להוריד ולהעלות טפסי הדרכות בטיחות לפי נושאים שונים</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="חיפוש טפסי הדרכה..."
            className="pl-10 pr-4 border-amber-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
              <Filter className="mr-2 h-4 w-4" />
              סינון לפי קטגוריה
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setActiveTab("all")}>כל ההדרכות</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("general")}>הדרכות כלליות</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("specialized")}>הדרכות מקצועיות</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("emergency")}>הדרכות חירום</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Upload className="mr-2 h-4 w-4" />
          העלאת טופס חדש
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-amber-50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            כל ההדרכות
          </TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            הדרכות כלליות
          </TabsTrigger>
          <TabsTrigger value="specialized" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            הדרכות מקצועיות
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
            הדרכות חירום
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
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
                    <Download className="mr-2 h-4 w-4" />
                    הורדה
                  </Button>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                    <Link href={form.path}>
                      <FileText className="mr-2 h-4 w-4" />
                      צפייה ועריכה
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
