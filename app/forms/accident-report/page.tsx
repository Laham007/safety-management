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

export default function AccidentReportPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    accidentDate: "",
    accidentTime: "",
    accidentLocation: "",
    injuredName: "",
    injuredId: "",
    injuredGender: "male",
    injuredAge: "",
    injuredPosition: "",
    injuredAddress: "",
    injuredPhone: "",
    accidentType: "injury",
    injuryType: "",
    injuryLocation: "",
    medicalCare: "yes",
    hospitalName: "",
    workDaysLost: "",
    accidentDescription: "",
    accidentCause: "",
    preventiveMeasures: "",
    reporterName: "",
    reporterPosition: "",
    reporterSignature: "",
    reportDate: "",
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
        <h1 className="text-2xl font-bold">דיווח על תאונת עבודה או מחלת מקצוע</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">דיווח על תאונת עבודה או מחלת מקצוע</h2>
          <p className="text-sm text-gray-500">לפי פקודת תאונות ומחלות משלח-יד (הודעה), 1945</p>
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

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי האירוע</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accidentDate">תאריך האירוע</Label>
                <Input
                  id="accidentDate"
                  name="accidentDate"
                  type="date"
                  value={formData.accidentDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accidentTime">שעת האירוע</Label>
                <Input
                  id="accidentTime"
                  name="accidentTime"
                  type="time"
                  value={formData.accidentTime}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accidentLocation">מיקום האירוע</Label>
                <Input
                  id="accidentLocation"
                  name="accidentLocation"
                  value={formData.accidentLocation}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי הנפגע</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="injuredName">שם הנפגע</Label>
                <Input
                  id="injuredName"
                  name="injuredName"
                  value={formData.injuredName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuredId">מספר תעודת זהות</Label>
                <Input
                  id="injuredId"
                  name="injuredId"
                  value={formData.injuredId}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>מגדר</Label>
                <RadioGroup
                  value={formData.injuredGender}
                  onValueChange={(value) => handleRadioChange("injuredGender", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="mr-2">
                      זכר
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="mr-2">
                      נקבה
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuredAge">גיל</Label>
                <Input
                  id="injuredAge"
                  name="injuredAge"
                  value={formData.injuredAge}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuredPosition">תפקיד</Label>
                <Input
                  id="injuredPosition"
                  name="injuredPosition"
                  value={formData.injuredPosition}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="injuredAddress">כתובת</Label>
                <Input
                  id="injuredAddress"
                  name="injuredAddress"
                  value={formData.injuredAddress}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuredPhone">טלפון</Label>
                <Input
                  id="injuredPhone"
                  name="injuredPhone"
                  value={formData.injuredPhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי הפגיעה</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>סוג האירוע</Label>
                <RadioGroup
                  value={formData.accidentType}
                  onValueChange={(value) => handleRadioChange("accidentType", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="injury" id="injury" />
                    <Label htmlFor="injury" className="mr-2">
                      תאונת עבודה
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disease" id="disease" />
                    <Label htmlFor="disease" className="mr-2">
                      מחלת מקצוע
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="near-miss" id="near-miss" />
                    <Label htmlFor="near-miss" className="mr-2">
                      כמעט תאונה
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="injuryType">סוג הפגיעה</Label>
                  <Input
                    id="injuryType"
                    name="injuryType"
                    value={formData.injuryType}
                    onChange={handleChange}
                    className="border-amber-200"
                    placeholder="חתך, שבר, כוויה וכו'"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="injuryLocation">איבר שנפגע</Label>
                  <Input
                    id="injuryLocation"
                    name="injuryLocation"
                    value={formData.injuryLocation}
                    onChange={handleChange}
                    className="border-amber-200"
                    placeholder="יד, רגל, ראש וכו'"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>האם ניתן טיפול רפואי?</Label>
                <RadioGroup
                  value={formData.medicalCare}
                  onValueChange={(value) => handleRadioChange("medicalCare", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="medical-yes" />
                    <Label htmlFor="medical-yes" className="mr-2">
                      כן
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="medical-no" />
                    <Label htmlFor="medical-no" className="mr-2">
                      לא
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospitalName">שם בית החולים/מרפאה</Label>
                  <Input
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="border-amber-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workDaysLost">ימי עבודה שאבדו (אם ידוע)</Label>
                  <Input
                    id="workDaysLost"
                    name="workDaysLost"
                    value={formData.workDaysLost}
                    onChange={handleChange}
                    className="border-amber-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">תיאור האירוע</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accidentDescription">תיאור מפורט של האירוע</Label>
                <Textarea
                  id="accidentDescription"
                  name="accidentDescription"
                  value={formData.accidentDescription}
                  onChange={handleChange}
                  className="border-amber-200 h-24"
                  placeholder="תאר בפירוט את האירוע, כולל מה קרה, מי היה מעורב, ומה היו התוצאות"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accidentCause">גורמי האירוע (אם ידועים)</Label>
                <Textarea
                  id="accidentCause"
                  name="accidentCause"
                  value={formData.accidentCause}
                  onChange={handleChange}
                  className="border-amber-200 h-24"
                  placeholder="ציין את הגורמים שהובילו לאירוע"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preventiveMeasures">אמצעי מניעה שננקטו או מומלצים</Label>
                <Textarea
                  id="preventiveMeasures"
                  name="preventiveMeasures"
                  value={formData.preventiveMeasures}
                  onChange={handleChange}
                  className="border-amber-200 h-24"
                  placeholder="פרט אילו אמצעים ננקטו או מומלצים למניעת הישנות האירוע"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
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
                <Label htmlFor="reportDate">תאריך הדיווח</Label>
                <Input
                  id="reportDate"
                  name="reportDate"
                  type="date"
                  value={formData.reportDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4 text-sm text-gray-500">
            <p>הערות:</p>
            <ol className="list-decimal mr-5 space-y-1">
              <li>יש לדווח על תאונת עבודה למפקח עבודה אזורי תוך 3 ימים מיום האירוע.</li>
              <li>
                יש לדווח למוסד לביטוח לאומי באמצעות טופס בל/250 על כל תאונה שגרמה לאי-כושר עבודה של יותר מ-3 ימים.
              </li>
              <li>יש לשמור העתק מטופס זה בתיק הבטיחות של החברה.</li>
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
