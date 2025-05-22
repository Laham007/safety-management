"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Shield, Menu, Bell, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <header className="bg-gradient-to-r from-amber-600 to-amber-500 px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-white" />
              <Link href="/" className="text-xl font-bold text-white hover:opacity-90 transition-opacity">
                SafetyManager
              </Link>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link className="text-sm font-medium text-white hover:text-amber-100 transition-colors" href="/">
                בית
              </Link>
              <Link
                className="text-sm font-medium text-white hover:text-amber-100 transition-colors"
                href="/dashboard"
              >
                לוח בקרה
              </Link>
              <Link
                className="text-sm font-medium text-white hover:text-amber-100 transition-colors"
                href="/incidents"
              >
                אירועים
              </Link>
                  <Link
                    className="text-sm font-medium text-white hover:text-amber-100 transition-colors"
                    href="/inspections"
                  >
                    ביקורות
                  </Link>
                  <Link
                    className="text-sm font-medium text-white hover:text-amber-100 transition-colors"
                    href="/documents"
                  >
                    מסמכים
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-amber-600 rounded-full">
                          <Bell className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <div className="flex flex-col p-2">
                          <h3 className="font-medium text-right mb-2">התראות</h3>
                          <div className="space-y-2">
                            <div className="bg-amber-50 p-2 rounded-md text-right">
                              <p className="text-sm font-medium">ביקורת בטיחות מתוכננת למחר</p>
                              <p className="text-xs text-gray-500">לפני שעה</p>
                            </div>
                            <div className="bg-amber-50 p-2 rounded-md text-right">
                              <p className="text-sm font-medium">אירוע בטיחות חדש דווח</p>
                              <p className="text-xs text-gray-500">לפני 3 שעות</p>
                            </div>
                            <div className="bg-amber-50 p-2 rounded-md text-right">
                              <p className="text-sm font-medium">תזכורת: הדרכת בטיחות ביום ראשון</p>
                              <p className="text-xs text-gray-500">לפני יום</p>
                            </div>
                          </div>
                          <Link href="/notifications" className="text-amber-600 text-sm text-center mt-2">
                            צפה בכל ההתראות
                          </Link>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-amber-600 rounded-full">
                          <User className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/profile">פרופיל</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings">הגדרות</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/logout">התנתק</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Link href="/login">
                    <Button className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-md text-sm font-medium">
                      התחברות
                    </Button>
                  </Link>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-amber-600 md:hidden">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[250px]">
                      <div className="flex flex-col gap-4 mt-6">
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/">
                            בית
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/dashboard">
                            לוח בקרה
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/incidents">
                            אירועים
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/inspections">
                            ביקורות
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/documents">
                            מסמכים
                          </Link>
                        </SheetClose>
                        <div className="border-t border-gray-200 my-2"></div>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/profile">
                            פרופיל
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/settings">
                            הגדרות
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link className="text-right px-2 py-1 hover:bg-amber-50 rounded-md" href="/notifications">
                            התראות
                          </Link>
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      )
    }
