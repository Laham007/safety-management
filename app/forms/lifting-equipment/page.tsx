"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Printer, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LiftingEquipmentPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    operatorName: "",
    operatorId: "",
    equipmentType: "",
    equipmentModel: "",
    equipmentSerial: "",
    appointmentDate: "",
    expiryDate: "",
    managerName: "",
    managerPosition: "",
    managerSignature: "",
    operatorSignature: "",
    date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <h1 className="text-2xl font-bold">כתב מינוי למפעיל מכונות הרמה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">כתב מינוי למפעיל מכונות הרמה</h2>
          <p className="text-sm text-gray-500">לפי פקודת הבטיחות בעבודה [נוסח חדש], התש"ל-1970</p>
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

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי המפעיל</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operatorName">שם המפעיל</Label>
                <Input
                  id="operatorName"
                  name="operatorName"
                  value={formData.operatorName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatorId">מספר תעודת זהות</Label>
                <Input
                  id="operatorId"
                  name="operatorId"
                  value={formData.operatorId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי מכונת ההרמה</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="equipmentType">סוג המכונה</Label>
                <Input
                  id="equipmentType"
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="border-amber-200"
                  placeholder="עגורן צריח / עגורן נייד / מלגזה וכו'"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipmentModel">דגם</Label>
                <Input
                  id="equipmentModel"
                  name="equipmentModel"
                  value={formData.equipmentModel}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipmentSerial">מספר סידורי</Label>
                <Input
                  id="equipmentSerial"
                  name="equipmentSerial"
                  value={formData.equipmentSerial}
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
            <p className="mb-4">
              אני החתום מטה ממנה בזאת את העובד הנ"ל לשמש כמפעיל מכונת הרמה מהסוג המצוין לעיל, לאחר שהוכיח כי הוא בעל
              הכשרה מתאימה ומיומנות מספקת להפעלת המכונה בבטחה.
            </p>

            <p className="mb-4">
              המפעיל מתחייב להפעיל את המכונה בהתאם להוראות היצרן, נהלי הבטיחות של החברה, ובהתאם לכל דין.
            </p>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">שם מנהל העבודה/הממונה</Label>
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
                <Label htmlFor="managerSignature">חתימת הממונה</Label>
                <Input
                  id="managerSignature"
                  name="managerSignature"
                  value={formData.managerSignature}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatorSignature">חתימת המפעיל</Label>
                <Input
                  id="operatorSignature"
                  name="operatorSignature"
                  value={formData.operatorSignature}
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
              <li>יש לשמור העתק מכתב מינוי זה בתיק הבטיחות של החברה.</li>
              <li>יש לוודא כי למפעיל יש תעודת הסמכה בתוקף להפעלת מכונת ההרמה הספציפית.</li>
              <li>יש לחדש את המינוי בהתאם לתוקף תעודת ההסמכה של המפעיל.</li>
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
