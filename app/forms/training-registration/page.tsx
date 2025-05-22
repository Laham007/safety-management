"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Printer, Download, ArrowRight, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function TrainingRegistrationPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    trainingType: "",
    trainingDate: "",
    startTime: "",
    endTime: "",
    location: "",
    instructorName: "",
    instructorPosition: "",
    instructorPhone: "",
    trainingContent: "",
    managerName: "",
    managerPosition: "",
    managerSignature: "",
    date: "",
  })

  const [participants, setParticipants] = useState([
    { id: 1, name: "", idNumber: "", department: "", position: "", signature: "" },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleParticipantChange = (id: number, field: string, value: string) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addParticipant = () => {
    const newId = participants.length > 0 ? Math.max(...participants.map((p) => p.id)) + 1 : 1
    setParticipants([
      ...participants,
      { id: newId, name: "", idNumber: "", department: "", position: "", signature: "" },
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
          <Link href="/forms">
            <ArrowRight className="ml-2 h-4 w-4" />
            חזרה לרשימת הטפסים
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">טופס רישום הדרכה</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md print:shadow-none">
        <div className="text-center mb-6 border-b border-amber-200 pb-4">
          <h2 className="text-xl font-bold">טופס רישום הדרכת בטיחות</h2>
          <p className="text-sm text-gray-500">
            לפי תקנות ארגון הפיקוח על העבודה (מסירת מידע והדרכת עובדים), התשנ"ט-1999
          </p>
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

          <div className="border-t border-amber-200 pt-4">
            <h3 className="font-bold mb-4">פרטי ההדרכה</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trainingType">נושא ההדרכה</Label>
                <Input
                  id="trainingType"
                  name="trainingType"
                  value={formData.trainingType}
                  onChange={handleChange}
                  className="border-amber-200"
                  placeholder="בטיחות כללית, עבודה בגובה, כיבוי אש וכו'"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingDate">תאריך ההדרכה</Label>
                <Input
                  id="trainingDate"
                  name="trainingDate"
                  type="date"
                  value={formData.trainingDate}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">שעת התחלה</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">שעת סיום</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">מיקום ההדרכה</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border-amber-200"
                />
              </div>
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
                <Label htmlFor="instructorPosition">תפקיד</Label>
                <Input
                  id="instructorPosition"
                  name="instructorPosition"
                  value={formData.instructorPosition}
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
            <h3 className="font-bold mb-4">תוכן ההדרכה</h3>

            <div className="space-y-2">
              <Label htmlFor="trainingContent">נושאים שנלמדו בהדרכה</Label>
              <Textarea
                id="trainingContent"
                name="trainingContent"
                value={formData.trainingContent}
                onChange={handleChange}
                className="border-amber-200 h-24"
                placeholder="פירוט הנושאים שנלמדו בהדרכה"
              />
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
              <h3 className="font-bold">רשימת משתתפים</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="border border-amber-200 p-2 text-right">#</th>
                    <th className="border border-amber-200 p-2 text-right">שם העובד</th>
                    <th className="border border-amber-200 p-2 text-right">מספר ת.ז.</th>
                    <th className="border border-amber-200 p-2 text-right">מחלקה</th>
                    <th className="border border-amber-200 p-2 text-right">תפקיד</th>
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
                          value={participant.department}
                          onChange={(e) => handleParticipantChange(participant.id, "department", e.target.value)}
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
              <li>יש לשמור העתק מטופס זה בתיק הבטיחות של החברה.</li>
              <li>יש לתעד את ההדרכה בפנקס ההדרכה של כל עובד.</li>
              <li>יש לבצע הדרכות רענון בהתאם לדרישות החוק ולפחות אחת לשנה.</li>
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
