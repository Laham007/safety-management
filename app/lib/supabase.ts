import { createClient } from "@supabase/supabase-js"

// סוגי נתונים
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  created_at?: string
}

export interface Incident {
  id: string
  title: string
  description: string
  date: string
  location: string
  severity: "high" | "medium" | "low"
  status: "open" | "in-progress" | "closed"
  reporter_id: string
  created_at?: string
}

export interface Inspection {
  id: string
  title: string
  date: string
  location: string
  status: "scheduled" | "completed" | "overdue"
  findings: string[]
  created_at?: string
}

export interface Document {
  id: string
  title: string
  type: string
  upload_date: string
  expiry_date?: string
  file_url: string
  created_at?: string
}

export interface Training {
  id: string
  title: string
  date: string
  participants: string[]
  status: "scheduled" | "completed"
  created_at?: string
}

// יצירת לקוח Supabase
// הערה: בסביבת פיתוח, אנחנו משתמשים ב-localStorage כגיבוי
// בסביבת ייצור, יש להחליף את המפתחות האלה במפתחות האמיתיים שלך מ-Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-supabase-anon-key"

// בדיקה אם אנחנו בסביבת דפדפן
const isBrowser = typeof window !== "undefined"

// יצירת לקוח Supabase רק בסביבת דפדפן
const supabase = isBrowser ? createClient(supabaseUrl, supabaseKey) : null

// פונקציות לעבודה עם Supabase
export async function signIn(email: string, password: string) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUp(email: string, password: string, userData: Omit<User, "id">) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  })

  if (!error && data.user) {
    // יצירת רשומת משתמש בטבלת המשתמשים
    await supabase.from("users").insert([
      {
        id: data.user.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    ])
  }

  return { data, error }
}

export async function signOut() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.auth.signOut()
}

export async function getCurrentUser() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return null
  }

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    // קבלת מידע נוסף על המשתמש מטבלת המשתמשים
    const { data: userData } = await supabase.from("users").select("*").eq("id", data.user.id).single()

    return userData
  }

  return null
}

// פונקציות לעבודה עם אירועים
export async function getIncidents() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return []
  }

  const { data } = await supabase.from("incidents").select("*").order("date", { ascending: false })

  return data || []
}

export async function createIncident(incident: Omit<Incident, "id" | "created_at">) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.from("incidents").insert([incident])
}

export async function updateIncident(id: string, updates: Partial<Incident>) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.from("incidents").update(updates).eq("id", id)
}

// פונקציות לעבודה עם ביקורות
export async function getInspections() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return []
  }

  const { data } = await supabase.from("inspections").select("*").order("date", { ascending: false })

  return data || []
}

export async function createInspection(inspection: Omit<Inspection, "id" | "created_at">) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.from("inspections").insert([inspection])
}

// פונקציות לעבודה עם מסמכים
export async function getDocuments() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return []
  }

  const { data } = await supabase.from("documents").select("*").order("upload_date", { ascending: false })

  return data || []
}

export async function uploadDocument(file: File, path: string) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.storage.from("documents").upload(path, file)
}

export async function createDocument(document: Omit<Document, "id" | "created_at">) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.from("documents").insert([document])
}

// פונקציות לעבודה עם הדרכות
export async function getTrainings() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return []
  }

  const { data } = await supabase.from("trainings").select("*").order("date", { ascending: false })

  return data || []
}

export async function createTraining(training: Omit<Training, "id" | "created_at">) {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return { error: { message: "Supabase client not initialized" } }
  }

  return supabase.from("trainings").insert([training])
}

// פונקציה לאתחול נתוני דוגמה (רק לצורכי פיתוח)
export async function initializeDemoData() {
  if (!supabase) {
    console.error("Supabase client not initialized")
    return
  }

  // בדיקה אם כבר יש נתונים
  const { data: existingUsers } = await supabase.from("users").select("id").limit(1)

  if (existingUsers && existingUsers.length === 0) {
    // יצירת משתמש אדמין
    const adminUser = {
      name: "מנהל מערכת",
      email: "laham07@gmail.com",
      role: "admin" as const,
    }

    // רישום המשתמש
    await signUp("laham07@gmail.com", "Laham555", adminUser)

    // יצירת אירועים לדוגמה
    const demoIncidents = [
      {
        title: "נפילת עובד מסולם",
        description: "עובד נפל מסולם בעת ביצוע עבודות תחזוקה",
        date: new Date().toISOString(),
        location: "מחלקת ייצור",
        severity: "medium" as const,
        status: "open" as const,
        reporter_id: "1",
      },
      {
        title: "התחשמלות קלה",
        description: "עובד התחשמל בעת טיפול בלוח חשמל",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        location: "חדר חשמל",
        severity: "high" as const,
        status: "in-progress" as const,
        reporter_id: "1",
      },
    ]

    for (const incident of demoIncidents) {
      await createIncident(incident)
    }

    // יצירת ביקורות לדוגמה
    const demoInspections = [
      {
        title: "ביקורת בטיחות תקופתית - מחלקת ייצור",
        date: new Date(Date.now() + 86400000 * 3).toISOString(),
        location: "מחלקת ייצור",
        status: "scheduled" as const,
        findings: [],
      },
      {
        title: "ביקורת מערכות כיבוי אש",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        location: "כל המפעל",
        status: "completed" as const,
        findings: ["2 מטפים פגי תוקף", "גלגלון כיבוי אש חסר במחסן"],
      },
    ]

    for (const inspection of demoInspections) {
      await createInspection(inspection)
    }
  }
}

// ייצוא לקוח Supabase לשימוש ישיר
export { supabase }
