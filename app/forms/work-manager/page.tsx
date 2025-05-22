"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Printer, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WorkManagerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyId: "",
    siteAddress: "",
    siteDescription: "",
    managerName: "",
    managerId: "",
    managerPhone: "",
    managerEmail: "",
    managerCertificate: "",
    certificateDate: "",
    appointmentDate: "",
    employerName: "",
    employerPosition: "",
    employerSignature: "",
    managerSignature: "",
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
        <h1 className="text-2xl font-bold">כתב מינוי למנהל עבודה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">כתב מינוי למנהל עבודה באתר בנייה</h2>
          <p className="text-sm text-gray-500">לפי תקנות הבטיחות בעבודה (עבודות בנייה), התשמ"ח-1988</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">שם החברה/הקבלן</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">כתובת החברה</Label>
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
              <Label htmlFor="companyId">ח.פ/ע.מ</Label>
              <Input
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי אתר הבנייה</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteAddress">כתובת האתר</Label>
                <Input
                  id="siteAddress"
                  name="siteAddress"
                  value={formData.siteAddress}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">תיאור העבודה</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleChange}
                  className="border-amber-200"
                  placeholder="תיאור קצר של העבודות המתבצעות באתר"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי מנהל העבודה</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">שם מנהל העבודה</Label>
                <Input
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerId">מספר תעודת זהות</Label>
                <Input
                  id="managerId"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="managerPhone">טלפון</Label>
                <Input
                  id="managerPhone"
                  name="managerPhone"
                  value={formData.managerPhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerEmail">דוא"ל</Label>
                <Input
                  id="managerEmail"
                  name="managerEmail"
                  value={formData.managerEmail}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="managerCertificate">מספר תעודת הסמכה</Label>
                <Input
                  id="managerCertificate"
                  name="managerCertificate"
                  value={formData.managerCertificate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificateDate">תאריך הסמכה</Label>
                <Input
                  id="certificateDate"
                  name="certificateDate"
                  type="date"
                  value={formData.certificateDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <p className="mb-4">
              אני החתום מטה ממנה בזאת את מר/גב' {formData.managerName || "_________________"}
              לשמש כמנהל עבודה באתר הבנייה המפורט לעיל, החל מתאריך {formData.appointmentDate || "_________________"}.
            </p>

            <p className="mb-4">
              מנהל העבודה יהיה אחראי לביצוע העבודות באתר בהתאם לתקנות הבטיחות בעבודה (עבודות בנייה), התשמ"ח-1988, ולכל
              דין אחר הנוגע לבטיחות בעבודה.
            </p>

            <div className="space-y-2 mt-4">
              <Label htmlFor="appointmentDate">תאריך תחילת המינוי</Label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="border-amber-200 w-full md:w-1/3"
              />
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employerName">שם המעסיק/הקבלן</Label>
                <Input
                  id="employerName"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employerPosition">תפקיד</Label>
                <Input
                  id="employerPosition"
                  name="employerPosition"
                  value={formData.employerPosition}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="employerSignature">חתימת המעסיק</Label>
                <Input
                  id="employerSignature"
                  name="employerSignature"
                  value={formData.employerSignature}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerSignature">חתימת מנהל העבודה</Label>
                <Input
                  id="managerSignature"
                  name="managerSignature"
                  value={formData.managerSignature}
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
              <li>יש לשלוח העתק מטופס זה למפקח עבודה אזורי תוך 7 ימים ממועד המינוי.</li>
              <li>יש לוודא כי למנהל העבודה יש תעודת הסמכה בתוקף ממשרד העבודה והרווחה.</li>
              <li>יש לשמור העתק מכתב מינוי זה באתר הבנייה ובמשרדי החברה.</li>
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
