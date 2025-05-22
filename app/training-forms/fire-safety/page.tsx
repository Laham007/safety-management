"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function FireSafetyPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    trainingDate: "",
    location: "",
    instructorName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">טופס הדרכת בטיחות אש</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="companyName">שם החברה</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="trainingDate">תאריך ההדרכה</Label>
          <Input
            id="trainingDate"
            name="trainingDate"
            type="date"
            value={formData.trainingDate}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">מיקום</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="instructorName">שם המדריך</Label>
          <Input
            id="instructorName"
            name="instructorName"
            value={formData.instructorName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/training-forms">
              חזרה
            </Link>
          </Button>
          <Button type="submit">
            שמור
          </Button>
        </div>
      </form>
    </div>
  )
}
