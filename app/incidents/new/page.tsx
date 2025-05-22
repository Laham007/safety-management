"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, AlertTriangle, Clock, CheckCircle } from "lucide-react"

export default function NewIncidentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      router.push("/incidents")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">דיווח אירוע בטיחות חדש</h2>
          <Button
            variant="outline"
            onClick={() => router.push("/incidents")}
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            חזרה לרשימת האירועים
          </Button>
        </div>

        <Card className="border-amber-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-white border-b border-amber-100">
            <CardTitle className="text-right text-amber-800">פרטי האירוע</CardTitle>
            <CardDescription className="text-right">מלא את כל הפרטים הנדרשים לדיווח על אירוע בטיחות</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="incident-date" className="text-amber-800">
                      תאריך האירוע
                    </Label>
                    <Input
                      id="incident-date"
                      type="date"
                      required
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incident-time" className="text-amber-800">
                      שעת האירוע
                    </Label>
                    <Input
                      id="incident-time"
                      type="time"
                      required
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-location" className="text-amber-800">
                    מיקום האירוע
                  </Label>
                  <Select>
                    <SelectTrigger id="incident-location" className="border-amber-200 focus:ring-amber-500">
                      <SelectValue placeholder="בחר מיקום" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">מחלקת ייצור</SelectItem>
                      <SelectItem value="warehouse">מחסן</SelectItem>
                      <SelectItem value="office">משרדים</SelectItem>
                      <SelectItem value="electrical-room">חדר חשמל</SelectItem>
                      <SelectItem value="yard">חצר המפעל</SelectItem>
                      <SelectItem value="other">אחר</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-title" className="text-amber-800">
                    כותרת האירוע
                  </Label>
                  <Input
                    id="incident-title"
                    placeholder="תיאור קצר של האירוע"
                    required
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-description" className="text-amber-800">
                    תיאור מפורט של האירוע
                  </Label>
                  <Textarea
                    id="incident-description"
                    placeholder="תאר בפירוט את האירוע, כולל מה קרה, מי היה מעורב, ומה היו התוצאות"
                    rows={5}
                    required
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-amber-800">חומרת האירוע</Label>
                  <RadioGroup defaultValue="medium" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="severity-high" className="flex items-center cursor-pointer ml-2">
                        <RadioGroupItem value="high" id="severity-high" className="text-amber-500 border-amber-300" />
                        <span className="mr-2">חמור</span>
                      </Label>
                      <div className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>חמור</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="severity-medium" className="flex items-center cursor-pointer ml-2">
                        <RadioGroupItem
                          value="medium"
                          id="severity-medium"
                          className="text-amber-500 border-amber-300"
                        />
                        <span className="mr-2">בינוני</span>
                      </Label>
                      <div className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>בינוני</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="severity-low" className="flex items-center cursor-pointer ml-2">
                        <RadioGroupItem value="low" id="severity-low" className="text-amber-500 border-amber-300" />
                        <span className="mr-2">קל</span>
                      </Label>
                      <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>קל</span>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-amber-800">האם היו נפגעים?</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="injured-yes" className="flex items-center cursor-pointer ml-2">
                        <RadioGroupItem value="yes" id="injured-yes" className="text-amber-500 border-amber-300" />
                        <span className="mr-2">כן</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="injured-no" className="flex items-center cursor-pointer ml-2">
                        <RadioGroupItem value="no" id="injured-no" className="text-amber-500 border-amber-300" />
                        <span className="mr-2">לא</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-reporter" className="text-amber-800">
                    שם המדווח
                  </Label>
                  <Input
                    id="incident-reporter"
                    placeholder="שם מלא"
                    required
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-photos" className="text-amber-800">
                    צרף תמונות (אופציונלי)
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="incident-photos"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-200 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-amber-500" />
                        <p className="mb-2 text-sm text-amber-700">
                          <span className="font-semibold">לחץ להעלאת קבצים</span> או גרור לכאן
                        </p>
                        <p className="text-xs text-amber-600">PNG, JPG או PDF (מקס' 10MB)</p>
                      </div>
                      <Input id="incident-photos" type="file" multiple className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-amber-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/incidents")}
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  ביטול
                </Button>
                <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600">
                  {loading ? "שולח..." : "שלח דיווח"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
