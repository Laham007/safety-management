// מערכת שמירת נתונים בסיסית המשתמשת ב-localStorage
// בהמשך אפשר להחליף את זה במסד נתונים אמיתי

// טיפוסי נתונים
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
}

export interface Incident {
  id: string
  title: string
  description: string
  date: string
  location: string
  severity: "high" | "medium" | "low"
  status: "open" | "in-progress" | "closed"
  reporterId: string
}

export interface Inspection {
  id: string
  title: string
  date: string
  location: string
  status: "scheduled" | "completed" | "overdue"
  findings: string[]
}

export interface Document {
  id: string
  title: string
  type: string
  uploadDate: string
  expiryDate?: string
  fileUrl: string
}

export interface Training {
  id: string
  title: string
  date: string
  participants: string[]
  status: "scheduled" | "completed"
}

// פונקציות שמירה וקריאה מ-localStorage
const STORAGE_KEYS = {
  USERS: "safety-manager-users",
  INCIDENTS: "safety-manager-incidents",
  INSPECTIONS: "safety-manager-inspections",
  DOCUMENTS: "safety-manager-documents",
  TRAININGS: "safety-manager-trainings",
  CURRENT_USER: "safety-manager-current-user",
}

// פונקציה כללית לשמירת נתונים
function saveData<T>(key: string, data: T[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

// פונקציה כללית לקריאת נתונים
function getData<T>(key: string): T[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }
  return []
}

// פונקציות ספציפיות לכל סוג נתונים
export function getUsers(): User[] {
  return getData<User>(STORAGE_KEYS.USERS)
}

export function saveUsers(users: User[]): void {
  saveData(STORAGE_KEYS.USERS, users)
}

export function getIncidents(): Incident[] {
  return getData<Incident>(STORAGE_KEYS.INCIDENTS)
}

export function saveIncidents(incidents: Incident[]): void {
  saveData(STORAGE_KEYS.INCIDENTS, incidents)
}

export function getInspections(): Inspection[] {
  return getData<Inspection>(STORAGE_KEYS.INSPECTIONS)
}

export function saveInspections(inspections: Inspection[]): void {
  saveData(STORAGE_KEYS.INSPECTIONS, inspections)
}

export function getDocuments(): Document[] {
  return getData<Document>(STORAGE_KEYS.DOCUMENTS)
}

export function saveDocuments(documents: Document[]): void {
  saveData(STORAGE_KEYS.DOCUMENTS, documents)
}

export function getTrainings(): Training[] {
  return getData<Training>(STORAGE_KEYS.TRAININGS)
}

export function saveTrainings(trainings: Training[]): void {
  saveData(STORAGE_KEYS.TRAININGS, trainings)
}

// פונקציות לניהול משתמש נוכחי
export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function setCurrentUser(user: User | null): void {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  }
}

// פונקציה לאתחול נתוני דוגמה (רק לצורכי פיתוח)
export function initializeDemoData(): void {
  // בדיקה אם כבר יש נתונים
  if (getUsers().length === 0) {
    // יצירת משתמש אדמין
    const adminUser: User = {
      id: "1",
      name: "מנהל מערכת",
      email: "laham07@gmail.com",
      role: "admin",
    }

    saveUsers([adminUser])

    // יצירת אירועים לדוגמה
    const demoIncidents: Incident[] = [
      {
        id: "1",
        title: "נפילת עובד מסולם",
        description: "עובד נפל מסולם בעת ביצוע עבודות תחזוקה",
        date: new Date().toISOString(),
        location: "מחלקת ייצור",
        severity: "medium",
        status: "open",
        reporterId: "1",
      },
      {
        id: "2",
        title: "התחשמלות קלה",
        description: "עובד התחשמל בעת טיפול בלוח חשמל",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        location: "חדר חשמל",
        severity: "high",
        status: "in-progress",
        reporterId: "1",
      },
    ]

    saveIncidents(demoIncidents)

    // יצירת ביקורות לדוגמה
    const demoInspections: Inspection[] = [
      {
        id: "1",
        title: "ביקורת בטיחות תקופתית - מחלקת ייצור",
        date: new Date(Date.now() + 86400000 * 3).toISOString(),
        location: "מחלקת ייצור",
        status: "scheduled",
        findings: [],
      },
      {
        id: "2",
        title: "ביקורת מערכות כיבוי אש",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        location: "כל המפעל",
        status: "completed",
        findings: ["2 מטפים פגי תוקף", "גלגלון כיבוי אש חסר במחסן"],
      },
    ]

    saveInspections(demoInspections)
  }
}
