"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Printer, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SafetyTrusteePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    trusteeName: "",
    trusteeId: "",
    trusteePosition: "",
    trusteeDepartment: "",
    trusteePhone: "",
    trusteeEmail: "",
    appointmentDate: "",
    expiryDate: "",
    trainingDate: "",
    trainingProvider: "",
    managerName: "",
    managerPosition: "",
    managerSignature: "",
    trusteeSignature: "",
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
        <h1 className="text-2xl font-bold">כתב מינוי לנאמן בטיחות</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">כתב מינוי לנאמן בטיחות</h2>
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

          <div className="space-y-2">
            <Label htmlFor="companyPhone">טלפון</Label>
            <Input
              id="companyPhone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              className="border-amber-200 w-full md:w-1/2"
            />
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי נאמן הבטיחות</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trusteeName">שם נאמן הבטיחות</Label>
                <Input
                  id="trusteeName"
                  name="trusteeName"
                  value={formData.trusteeName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trusteeId">מספר תעודת זהות</Label>
                <Input
                  id="trusteeId"
                  name="trusteeId"
                  value={formData.trusteeId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="trusteePosition">תפקיד</Label>
                <Input
                  id="trusteePosition"
                  name="trusteePosition"
                  value={formData.trusteePosition}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trusteeDepartment">מחלקה</Label>
                <Input
                  id="trusteeDepartment"
                  name="trusteeDepartment"
                  value={formData.trusteeDepartment}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="trusteePhone">טלפון</Label>
                <Input
                  id="trusteePhone"
                  name="trusteePhone"
                  value={formData.trusteePhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trusteeEmail">דוא"ל</Label>
                <Input
                  id="trusteeEmail"
                  name="trusteeEmail"
                  value={formData.trusteeEmail}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">תוקף המינוי</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentDate">תאריך תחילת המינוי</Label>
                <Input
                  id="appointmentDate"
                  name="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">תאריך סיום המינוי</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">הכשרה</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trainingDate">תאריך הכשרה אחרונה</Label>
                <Input
                  id="trainingDate"
                  name="trainingDate"
                  type="date"
                  value={formData.trainingDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingProvider">גורם מכשיר</Label>
                <Input
                  id="trainingProvider"
                  name="trainingProvider"
                  value={formData.trainingProvider}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <p className="mb-4">
              אני החתום מטה ממנה בזאת את מר/גב' {formData.trusteeName || "_________________"}
              לשמש כנאמן בטיחות במפעל/בחברה, בהתאם לתקנות ארגון הפיקוח על העבודה (ועדות בטיחות ונאמני בטיחות),
              התשכ"ו-1966.
            </p>

            <p className="mb-4">תפקידי נאמן הבטיחות:</p>

            <ol className="list-decimal mr-5 space-y-1 mb-4">
              <li>לסייר במקומות העבודה ולעמוד על תנאי הבטיחות והגיהות.</li>
              <li>להתריע על ליקויי בטיחות בפני המעסיק.</li>
              <li>לוודא סילוק מפגעי בטיחות.</li>
              <li>להדריך את העובדים לבטיחות בעבודה.</li>
              <li>לבדוק נסיבות תאונות עבודה ולהציע למעסיק צעדים למניעת הישנותן.</li>
              <li>לדווח לוועדת הבטיחות או לממונה על הבטיחות על כל מפגע בטיחותי.</li>
            </ol>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">שם מנהל המפעל/החברה</Label>
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
                <Label htmlFor="managerSignature">חתימת המנהל</Label>
                <Input
                  id="managerSignature"
                  name="managerSignature"
                  value={formData.managerSignature}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trusteeSignature">חתימת נאמן הבטיחות</Label>
                <Input
                  id="trusteeSignature"
                  name="trusteeSignature"
                  value={formData.trusteeSignature}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="date">תאריך</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="border-amber-200 w-full md:w-1/3"
              />
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4 text-sm text-gray-500">
            <p>הערות:</p>
            <ol className="list-decimal mr-5 space-y-1">
              <li>יש לשלוח העתק מטופס זה למפקח עבודה אזורי.</li>
              <li>יש לוודא כי נאמן הבטיחות עבר הכשרה מתאימה.</li>
              <li>יש לשמור העתק מכתב מינוי זה בתיק הבטיחות של החברה.</li>
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
