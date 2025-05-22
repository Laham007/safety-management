import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { action, email, password, userData } = await request.json()

    if (action === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ user: data.user })
    }

    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      // יצירת רשומת משתמש בטבלת המשתמשים
      if (data.user) {
        await supabase.from("users").insert([
          {
            id: data.user.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          },
        ])
      }

      return NextResponse.json({ user: data.user })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
