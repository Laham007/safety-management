"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeightWorkPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    workerName: "",
    workerId: "",
    trainingDate: "",
    expiryDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 text-right">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/forms">
            <ArrowRight className="ml-2 h-4 w-4" />
            חזרה לרשימת הטפסים
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">אישור להדרכת עובד גובה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">שם החברה</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">שם העובד</label>
              <input
                type="text"
                name="workerName"
                value={formData.workerName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">תעודת זהות</label>
              <input
                type="text"
                name="workerId"
                value={formData.workerId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">תאריך הדרכה</label>
              <input
                type="date"
                name="trainingDate"
                value={formData.trainingDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">תאריך תפוגה</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              שמור טופס
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
