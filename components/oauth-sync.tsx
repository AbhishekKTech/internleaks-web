"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export function OAuthSync() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // If login with Google is successful
    if (status === "authenticated" && session?.user) {
      const token = localStorage.getItem("internleaks_token")
      
      // If the Spring Boot token is not yet in LocalStorage
      if (!token) {
        axios.post(`${API_BASE_URL}/api/v1/auth/social`, {
          name: session.user!.name,
          email: session.user!.email
        }).then(res => {
          // Save token and credits returned from backend
          localStorage.setItem("internleaks_token", res.data.token)
          localStorage.setItem("internleaks_credits", res.data.credits.toString())
          localStorage.setItem("internleaks_user_email", session.user!.email!)
          
          // Reload page so header can update credits
          window.location.reload()
        }).catch(err => console.error("OAuth Sync Error:", err))
      }
    }
  }, [status, session])

  return null; // Yeh component UI mein kuch nahi dikhayega, background mein kaam karega
}