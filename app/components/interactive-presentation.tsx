"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Shield, Clock, FileCheck, Users, BarChart } from "lucide-react"

interface Slide {
  title: string
  content: string
  icon: React.ReactNode
  color: string
}

export default function InteractivePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const slides: Slide[] = [
    {
      title: "ניהול בטיחות מתקדם",
      content: "מערכת מקיפה לניהול כל היבטי הבטיחות בארגון שלך, מותאמת במיוחד לדרישות הרגולציה בישראל.",
      icon: <Shield className="h-12 w-12 text-amber-500" />,
      color: "bg-amber-50",
    },
    {
      title: "חיסכון בזמן",
      content: "אוטומציה של תהליכי בטיחות שגרתיים, תזכורות אוטומטיות, וטפסים דיגיטליים מובנים.",
      icon: <Clock className="h-12 w-12 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "ניהול מסמכים ונספחים",
      content: "שמירה מאובטחת של כל מסמכי הבטיחות, ביקורות, ואישורים במקום אחד עם גישה מכל מקום.",
      icon: <FileCheck className="h-12 w-12 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "ניהול הדרכות",
      content: "מעקב אחר הדרכות עובדים, תיעוד נוכחות, ותזכורות לרענון הדרכות נדרשות.",
      icon: <Users className="h-12 w-12 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "דוחות וסטטיסטיקות",
      content: "ניתוח מגמות בטיחות, זיהוי נקודות תורפה, והפקת דוחות מותאמים אישית לצרכי הארגון.",
      icon: <BarChart className="h-12 w-12 text-red-500" />,
      color: "bg-red-50",
    },
  ]

  // החלפת שקופיות אוטומטית
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, slides.length])

  // עצירת החלפה אוטומטית בעת אינטראקציה של המשתמש
  const handleManualNavigation = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const nextSlide = () => {
    handleManualNavigation(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  const prevSlide = () => {
    handleManualNavigation(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="relative overflow-hidden rounded-xl shadow-lg border border-amber-100">
        <div className="relative">
          <Card className={`${slides[currentSlide].color} border-none`}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                <div className="bg-white p-4 rounded-full shadow-md">{slides[currentSlide].icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{slides[currentSlide].title}</h3>
                  <p className="text-gray-700">{slides[currentSlide].content}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-amber-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-amber-200"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center p-2 bg-white border-t border-amber-100">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`mx-1 rounded-full transition-all ${
                currentSlide === index ? "w-3 h-3 bg-amber-500" : "w-2 h-2 bg-amber-200"
              }`}
              onClick={() => handleManualNavigation(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
