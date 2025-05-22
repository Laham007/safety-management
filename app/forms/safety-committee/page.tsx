"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Printer, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SafetyCommitteePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    employeeCount: "",
    committeeDate: "",
    chairmanName: "",
    chairmanPosition: "",
    memberName1: "",
    memberPosition1: "",
    memberName2: "",
    memberPosition2: "",
    memberName3: "",
    memberPosition3: "",
    memberName4: "",
    memberPosition4: "",
    memberName5: "",
    memberPosition5: "",
    managerName: "",
    managerPosition: "",
    managerSignature: "",
    date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrint = () => {
    window.print()
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
        <h1 className="text-2xl font-bold">הודעה על הקמת ועדת בטיחות</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">הודעה על הקמת ועדת בטיחות</h2>
          <p className="text-sm text-gray-500">
            לפי תקנות ארגון הפיקוח על העבודה (ועדות בטיחות ונאמני בטיחות), התשכ"ו-1966
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">שם המפעל/החברה</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">כתובת</Label>
              <Input
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyPhone">טלפון</Label>
              <Input
                id="companyPhone"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">דוא"ל</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeCount">מספר העובדים במפעל</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="committeeDate">תאריך הקמת הועדה</Label>
              <Input
                id="committeeDate"
                name="committeeDate"
                type="date"
                value={formData.committeeDate}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">הרכב ועדת הבטיחות</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chairmanName">שם יו"ר הועדה</Label>
                  <Input
                    id="chairmanName"
                    name="chairmanName"
                    value={formData.chairmanName}
                    onChange={handleChange}
                    className="border-amber-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chairmanPosition">תפקיד</Label>
                  <Input
                    id="chairmanPosition"
                    name="chairmanPosition"
                    value={formData.chairmanPosition}
                    onChange={handleChange}
                    className="border-amber-200"
                  />
                </div>
              </div>

              <h4 className="font-semibold mt-4">חברי הועדה:</h4>

              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`memberName${index}`}>שם החבר</Label>
                    <Input
                      id={`memberName${index}`}
                      name={`memberName${index}`}
                      value={formData[`memberName${index}` as keyof typeof formData]}
                      onChange={handleChange}
                      className="border-amber-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`memberPosition${index}`}>תפקיד</Label>
                    <Input
                      id={`memberPosition${index}`}
                      name={`memberPosition${index}`}
                      value={formData[`memberPosition${index}` as keyof typeof formData]}
                      onChange={handleChange}
                      className="border-amber-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">שם מנהל המפעל</Label>
                <Input
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerPosition">תפקיד</Label>
                <Input
                  id="managerPosition"
                  name="managerPosition"
                  value={formData.managerPosition}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="managerSignature">חתימה</Label>
                <Input
                  id="managerSignature"
                  name="managerSignature"
                  value={formData.managerSignature}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">תאריך</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4 text-sm text-gray-500">
            <p>הערות:</p>
            <ol className="list-decimal mr-5 space-y-1">
              <li>יש לשלוח העתק מטופס זה למפקח עבודה אזורי.</li>
              <li>יש לעדכן את הטופס בכל שינוי בהרכב ועדת הבטיחות.</li>
              <li>ועדת הבטיחות תתכנס לפחות אחת לחודשיים.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          הדפסה
        </Button>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Download className="mr-2 h-4 w-4" />
          שמירה כ-PDF
        </Button>
      </div>
    </div>
  )
}
