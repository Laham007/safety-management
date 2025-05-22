"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Printer, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ConstructionNoticePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyId: "",
    projectName: "",
    projectAddress: "",
    projectType: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    workersCount: "",
    hasExcavation: "no",
    excavationDepth: "",
    hasDemolition: "no",
    demolitionDetails: "",
    hasScaffolding: "no",
    scaffoldingHeight: "",
    contractorName: "",
    contractorId: "",
    contractorAddress: "",
    contractorPhone: "",
    managerName: "",
    managerId: "",
    managerPhone: "",
    safetyOfficerName: "",
    safetyOfficerId: "",
    safetyOfficerPhone: "",
    reporterName: "",
    reporterPosition: "",
    reporterSignature: "",
    date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
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
        <h1 className="text-2xl font-bold">הודעה על פעולות בנייה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">הודעה על פעולות בנייה</h2>
          <p className="text-sm text-gray-500">לפי תקנות הבטיחות בעבודה (עבודות בנייה), התשמ"ח-1988</p>
        </div>

        <div className="space-y-6">
          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי מבצע הבנייה</h3>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          </div>

          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי הפרויקט</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">שם הפרויקט</Label>
                <Input
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectAddress">כתובת האתר</Label>
                <Input
                  id="projectAddress"
                  name="projectAddress"
                  value={formData.projectAddress}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="projectType">סוג העבודה</Label>
              <Input
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="border-amber-200"
                placeholder="בנייה חדשה, שיפוץ, הריסה וכו'"
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="projectDescription">תיאור העבודה</Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="border-amber-200"
                placeholder="תיאור מפורט של העבודות המתוכננות"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">תאריך התחלה</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">תאריך סיום משוער</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workersCount">מספר עובדים משוער</Label>
                <Input
                  id="workersCount"
                  name="workersCount"
                  value={formData.workersCount}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי העבודות המיוחדות</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>האם תתבצע עבודת חפירה?</Label>
                <RadioGroup
                  value={formData.hasExcavation}
                  onValueChange={(value) => handleRadioChange("hasExcavation", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="excavation-yes" />
                    <Label htmlFor="excavation-yes" className="mr-2">
                      כן
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="excavation-no" />
                    <Label htmlFor="excavation-no" className="mr-2">
                      לא
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasExcavation === "yes" && (
                <div className="space-y-2 mr-8">
                  <Label htmlFor="excavationDepth">עומק החפירה (במטרים)</Label>
                  <Input
                    id="excavationDepth"
                    name="excavationDepth"
                    value={formData.excavationDepth}
                    onChange={handleChange}
                    className="border-amber-200 w-full md:w-1/3"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>האם תתבצע עבודת הריסה?</Label>
                <RadioGroup
                  value={formData.hasDemolition}
                  onValueChange={(value) => handleRadioChange("hasDemolition", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="demolition-yes" />
                    <Label htmlFor="demolition-yes" className="mr-2">
                      כן
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="demolition-no" />
                    <Label htmlFor="demolition-no" className="mr-2">
                      לא
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasDemolition === "yes" && (
                <div className="space-y-2 mr-8">
                  <Label htmlFor="demolitionDetails">פרטי ההריסה</Label>
                  <Input
                    id="demolitionDetails"
                    name="demolitionDetails"
                    value={formData.demolitionDetails}
                    onChange={handleChange}
                    className="border-amber-200"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>האם יוקמו פיגומים?</Label>
                <RadioGroup
                  value={formData.hasScaffolding}
                  onValueChange={(value) => handleRadioChange("hasScaffolding", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="scaffolding-yes" />
                    <Label htmlFor="scaffolding-yes" className="mr-2">
                      כן
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="scaffolding-no" />
                    <Label htmlFor="scaffolding-no" className="mr-2">
                      לא
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.hasScaffolding === "yes" && (
                <div className="space-y-2 mr-8">
                  <Label htmlFor="scaffoldingHeight">גובה הפיגומים (במטרים)</Label>
                  <Input
                    id="scaffoldingHeight"
                    name="scaffoldingHeight"
                    value={formData.scaffoldingHeight}
                    onChange={handleChange}
                    className="border-amber-200 w-full md:w-1/3"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי הקבלן הראשי</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractorName">שם הקבלן</Label>
                <Input
                  id="contractorName"
                  name="contractorName"
                  value={formData.contractorName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractorId">ח.פ/ע.מ</Label>
                <Input
                  id="contractorId"
                  name="contractorId"
                  value={formData.contractorId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="contractorAddress">כתובת</Label>
                <Input
                  id="contractorAddress"
                  name="contractorAddress"
                  value={formData.contractorAddress}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractorPhone">טלפון</Label>
                <Input
                  id="contractorPhone"
                  name="contractorPhone"
                  value={formData.contractorPhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי מנהל העבודה</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
          </div>

          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-bold mb-4">פרטי ממונה הבטיחות</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="safetyOfficerName">שם ממונה הבטיחות</Label>
                <Input
                  id="safetyOfficerName"
                  name="safetyOfficerName"
                  value={formData.safetyOfficerName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safetyOfficerId">מספר תעודת זהות</Label>
                <Input
                  id="safetyOfficerId"
                  name="safetyOfficerId"
                  value={formData.safetyOfficerId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safetyOfficerPhone">טלפון</Label>
                <Input
                  id="safetyOfficerPhone"
                  name="safetyOfficerPhone"
                  value={formData.safetyOfficerPhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">שם ממלא הטופס</Label>
                <Input
                  id="reporterName"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reporterPosition">תפקיד</Label>
                <Input
                  id="reporterPosition"
                  name="reporterPosition"
                  value={formData.reporterPosition}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="reporterSignature">חתימה</Label>
                <Input
                  id="reporterSignature"
                  name="reporterSignature"
                  value={formData.reporterSignature}
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
              <li>יש לשלוח טופס זה למפקח עבודה אזורי לפחות 7 ימים לפני תחילת העבודה.</li>
              <li>יש לצרף לטופס זה את כתב המינוי של מנהל העבודה.</li>
              <li>יש לשמור העתק מטופס זה באתר הבנייה ובמשרדי החברה.</li>
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
