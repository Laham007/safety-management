"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Printer, Download, ArrowRight, Upload, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function HeightWorkPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    courseDate: "",
    startDate: "",
    endDate: "",
    location: "",
    instructorName: "",
    instructorLicense: "",
    instructorPhone: "",
    courseType: "initial",
    courseContent: "",
    heightType1: true, // סולמות
    heightType2: true, // פיגומים
    heightType3: false, // סלים מתרוממים
    heightType4: false, // גגות
    heightType5: false, // מקום מוקף
    heightType6: false, // מתקני תקשורת
    heightType7: false, // עצים וגיזום
    medicalApproval: "yes",
    medicalDate: "",
    managerName: "",
    managerPosition: "",
    managerSignature: "",
    date: "",
  })

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "",
      idNumber: "",
      position: "",
      certificateNumber: "",
      expiryDate: "",
      signature: "",
    },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleParticipantChange = (id: number, field: string, value: string) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addParticipant = () => {
    const newId = participants.length > 0 ? Math.max(...participants.map((p) => p.id)) + 1 : 1
    setParticipants([
      ...participants,
      {
        id: newId,
        name: "",
        idNumber: "",
        position: "",
        certificateNumber: "",
        expiryDate: "",
        signature: "",
      },
    ])
  }

  const removeParticipant = (id: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((p) => p.id !== id))
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 text-right">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/training-forms">
            <ArrowRight className="ml-2 h-4 w-4" />
            חזרה לרשימת הטפסים
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">קורס עבודה בגובה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">טופס הדרכה והסמכה לעבודה בגובה</h2>
          <p className="text-sm text-gray-500">לפי תקנות הבטיחות בעבודה (עבודה בגובה), התשס"ז-2007</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">שם החברה/המפעל</Label>
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
            <h3 className="font-bold mb-4">פרטי הקורס</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseDate">תאריך הקורס</Label>
                <Input
                  id="courseDate"
                  name="courseDate"
                  type="date"
                  value={formData.courseDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">תאריך תחילת תוקף</Label>
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
                <Label htmlFor="endDate">תאריך סיום תוקף</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="location">מיקום הקורס</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label>סוג הקורס</Label>
              <RadioGroup
                value={formData.courseType}
                onValueChange={(value) => handleRadioChange("courseType", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="initial" id="initial" />
                  <Label htmlFor="initial" className="mr-2">
                    הסמכה ראשונית
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="refresher" id="refresher" />
                  <Label htmlFor="refresher" className="mr-2">
                    ריענון
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extension" id="extension" />
                  <Label htmlFor="extension" className="mr-2">
                    הרחבת הסמכה
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי המדריך</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructorName">שם המדריך</Label>
                <Input
                  id="instructorName"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructorLicense">מספר רישיון מדריך</Label>
                <Input
                  id="instructorLicense"
                  name="instructorLicense"
                  value={formData.instructorLicense}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructorPhone">טלפון</Label>
                <Input
                  id="instructorPhone"
                  name="instructorPhone"
                  value={formData.instructorPhone}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">תחומי ההסמכה</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>סוגי עבודה בגובה</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType1"
                      checked={formData.heightType1}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType1", checked as boolean)}
                    />
                    <Label htmlFor="heightType1" className="mr-2">
                      עבודה על סולמות
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType2"
                      checked={formData.heightType2}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType2", checked as boolean)}
                    />
                    <Label htmlFor="heightType2" className="mr-2">
                      עבודה על פיגומים
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType3"
                      checked={formData.heightType3}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType3", checked as boolean)}
                    />
                    <Label htmlFor="heightType3" className="mr-2">
                      עבודה מתוך סלים מתרוממים
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType4"
                      checked={formData.heightType4}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType4", checked as boolean)}
                    />
                    <Label htmlFor="heightType4" className="mr-2">
                      עבודה על גגות
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType5"
                      checked={formData.heightType5}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType5", checked as boolean)}
                    />
                    <Label htmlFor="heightType5" className="mr-2">
                      עבודה במקום מוקף
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType6"
                      checked={formData.heightType6}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType6", checked as boolean)}
                    />
                    <Label htmlFor="heightType6" className="mr-2">
                      טיפוס על תרנים/מתקני תקשורת
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heightType7"
                      checked={formData.heightType7}
                      onCheckedChange={(checked) => handleCheckboxChange("heightType7", checked as boolean)}
                    />
                    <Label htmlFor="heightType7" className="mr-2">
                      טיפוס על עצים וגיזום
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseContent">פירוט נוסף של תוכן הקורס</Label>
                <Textarea
                  id="courseContent"
                  name="courseContent"
                  value={formData.courseContent}
                  onChange={handleChange}
                  className="border-amber-200 h-24"
                  placeholder="פירוט נוסף של הנושאים שנלמדו בקורס"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">אישור רפואי</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>האם קיים אישור רפואי לעבודה בגובה?</Label>
                <RadioGroup
                  value={formData.medicalApproval}
                  onValueChange={(value) => handleRadioChange("medicalApproval", value)}
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

              {formData.medicalApproval === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="medicalDate">תאריך האישור הרפואי</Label>
                  <Input
                    id="medicalDate"
                    name="medicalDate"
                    type="date"
                    value={formData.medicalDate}
                    onChange={handleChange}
                    className="border-amber-200 w-full md:w-1/3"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                type="button"
                onClick={addParticipant}
                variant="outline"
                size="sm"
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                הוסף משתתף
              </Button>
              <h3 className="font-bold">רשימת מוסמכים</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="border border-amber-200 p-2 text-right">#</th>
                    <th className="border border-amber-200 p-2 text-right">שם העובד</th>
                    <th className="border border-amber-200 p-2 text-right">מספר ת.ז.</th>
                    <th className="border border-amber-200 p-2 text-right">תפקיד</th>
                    <th className="border border-amber-200 p-2 text-right">מספר תעודה</th>
                    <th className="border border-amber-200 p-2 text-right">תוקף עד</th>
                    <th className="border border-amber-200 p-2 text-right">חתימה</th>
                    <th className="border border-amber-200 p-2 text-right">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr key={participant.id}>
                      <td className="border border-amber-200 p-2 text-center">{index + 1}</td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          value={participant.name}
                          onChange={(e) => handleParticipantChange(participant.id, "name", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          value={participant.idNumber}
                          onChange={(e) => handleParticipantChange(participant.id, "idNumber", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          value={participant.position}
                          onChange={(e) => handleParticipantChange(participant.id, "position", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          value={participant.certificateNumber}
                          onChange={(e) => handleParticipantChange(participant.id, "certificateNumber", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          type="date"
                          value={participant.expiryDate}
                          onChange={(e) => handleParticipantChange(participant.id, "expiryDate", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2">
                        <Input
                          value={participant.signature}
                          onChange={(e) => handleParticipantChange(participant.id, "signature", e.target.value)}
                          className="border-0 focus:ring-0 p-0 h-8"
                        />
                      </td>
                      <td className="border border-amber-200 p-2 text-center">
                        <Button
                          type="button"
                          onClick={() => removeParticipant(participant.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          disabled={participants.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">שם מנהל/אחראי</Label>
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
              <li>תוקף ההסמכה לעבודה בגובה הינו לשנתיים מיום ההדרכה.</li>
              <li>יש לשמור העתק מטופס זה בתיק הבטיחות של החברה.</li>
              <li>יש לתעד את ההדרכה בפנקס ההדרכה של כל עובד.</li>
              <li>יש לוודא כי כל העובדים עברו בדיקה רפואית המאשרת את כשירותם לעבודה בגובה.</li>
              <li>יש לוודא כי המדריך הינו בעל אישור הדרכה בתוקף ממשרד העבודה.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            הדפסה
          </Button>
          <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
            <Upload className="mr-2 h-4 w-4" />
            העלאת קובץ חתום
          </Button>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Download className="mr-2 h-4 w-4" />
          שמירה כ-PDF
        </Button>
      </div>
    </div>
  )
}
