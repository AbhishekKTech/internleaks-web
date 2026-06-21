"use client"

import { useState } from "react"
import { ShieldAlert, Sparkles, X, User, LayoutDashboard, Settings, LogOut, ShieldCheck, ScanLine, FileText } from "lucide-react"

type View = "landing" | "wizard" | "analyzing" | "result" | "wall"

interface NavbarProps {
  activeTab: "scanner" | "wall"
  credits: number
  isLoggedIn?: boolean
  userEmail?: string
  userName?: string 
  onNavigate: (view: View) => void
  onOpenAuth?: () => void
  onLogout?: () => void
  onOpenDashboard?: () => void
  onOpenEditProfile?: () => void
}

export function Navbar({ activeTab, credits, isLoggedIn = false, userEmail = "", userName = "", onNavigate, onOpenAuth, onLogout, onOpenDashboard, onOpenEditProfile }: NavbarProps) {
  const [showCreditsTooltip, setShowCreditsTooltip] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const displayName = userName ? userName : (userEmail ? userEmail.split("@")[0] : "User")

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        
        {/* Left: Logo */}
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0">
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/15 ring-1 ring-[#8b5cf6]/40">
            <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 text-[#8b5cf6]" />
          </span>
          <span className="text-[14px] sm:text-lg font-bold tracking-tight text-white">
            INTERN<span className="text-[#8b5cf6]">LEAKS</span>
          </span>
        </button>

        {/* Center Tabs: DESKTOP ONLY */}
        <nav className="hidden sm:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md shrink-0">
          <button
            onClick={() => onNavigate("landing")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "scanner" ? "bg-[#8b5cf6] text-white" : "text-white/60 hover:text-white"
            }`}
          >
            Scanner
          </button>
          
          <button
            onClick={() => onNavigate("wall")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "wall" ? "bg-[#8b5cf6] text-white" : "text-white/60 hover:text-white"
            }`}
          >
            Scam Wall
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* MOBILE ONLY: Dynamic Icon Button */}
          <button
            onClick={() => onNavigate(activeTab === "scanner" ? "wall" : "landing")}
            className="sm:hidden flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
            title={activeTab === "scanner" ? "Go to Scam Wall" : "Go to Scanner"}
          >
            {activeTab === "scanner" ? (
              <FileText className="h-[18px] w-[18px] text-[#a78bfa]" /> // FileText for Scam Wall
            ) : (
              <ScanLine className="h-[18px] w-[18px] text-[#a78bfa]" /> // ScanLine for Scanner
            )}
          </button>
          
          {/* CREDITS BUTTON */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCreditsTooltip(!showCreditsTooltip)
                setShowProfileMenu(false)
              }}
              className="flex items-center gap-1 sm:gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-2.5 py-1.5 sm:px-3 sm:py-1.5 backdrop-blur-md transition-colors hover:bg-[#8b5cf6]/20"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8b5cf6]" />
              <span className="text-[13px] sm:text-sm font-semibold text-white">
                <span className="hidden sm:inline">Credits: </span>{credits}
              </span>
            </button>

            {/* Credits Tooltip */}
            {showCreditsTooltip && (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-white/10 bg-[#0B0F19] p-4 shadow-2xl ring-1 ring-black/50">
                <button onClick={() => setShowCreditsTooltip(false)} className="absolute right-3 top-3 text-white/40 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
                <h4 className="mb-2 text-sm font-bold text-white">Credits Plan</h4>
                <p className="text-xs leading-relaxed text-white/70">
                  You have <strong>{credits} credits</strong> remaining.
                </p>
                {isLoggedIn ? (
                  <button onClick={() => { setShowCreditsTooltip(false); alert("Razorpay Integration Coming Soon!"); }} className="mt-4 w-full rounded-lg bg-white/10 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 border border-white/20">
                    Buy More Credits
                  </button>
                ) : (
                  <button onClick={() => { setShowCreditsTooltip(false); if (onOpenAuth) onOpenAuth(); }} className="mt-4 w-full rounded-lg bg-[#8b5cf6] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7c3aed]">
                    Login / Register
                  </button>
                )}
              </div>
            )}
          </div>

          {/* PROFILE BUTTON */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowCreditsTooltip(false)
                }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 sm:py-1 sm:pl-1 sm:pr-3 transition-colors hover:bg-white/10"
              >
                <div className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#8b5cf6]">
                  <User className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-white" />
                </div>
                <span className="hidden max-w-[100px] truncate text-sm font-medium text-white sm:block">
                  {displayName}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#0B0F19] shadow-2xl ring-1 ring-black/50">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="truncate text-xs text-white/50">Signed in as</p>
                    <p className="truncate text-sm font-medium text-white">{userEmail}</p>
                  </div>
                  
                  <div className="p-1">
                    <button
                      onClick={() => { setShowProfileMenu(false); if (onOpenDashboard) onOpenDashboard(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </button>
                    
                    <button
                      onClick={() => { setShowProfileMenu(false); if (onOpenEditProfile) onOpenEditProfile(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Settings className="h-4 w-4" /> Edit Profile
                    </button>
                  </div>
                  
                  <div className="border-t border-white/10 p-1">
                    <button
                      onClick={() => { setShowProfileMenu(false); if (onLogout) onLogout(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>

                  {userEmail === "admin@example.com" && (
                    <button
                      onClick={() => {
                        onNavigate("admin" as any)
                        setShowProfileMenu(false)
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#8b5cf6] transition-colors hover:bg-white/5 hover:text-[#a78bfa]"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin Panel
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}