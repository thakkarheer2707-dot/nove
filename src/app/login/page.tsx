"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Eye, EyeOff, ArrowRight, Mail, Lock, X, Check, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Login Simulated Flow
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Automatically sign in the user
      setAuthUser(data.user);
      
      if (data.isAdmin) {
        localStorage.setItem("nove_admin", JSON.stringify(data.user));
        router.push("/admin");
      } else {
        router.push("/store");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInSubmit = async (email: string, name?: string) => {
    setGoogleError("");
    setGoogleLoading(true);

    try {
      const res = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Google authentication failed.");
      }

      // Successful Google Auth
      setAuthUser(data.user);
      setShowGooglePrompt(false);

      if (data.isAdmin) {
        localStorage.setItem("nove_admin", JSON.stringify(data.user));
        router.push("/admin");
      } else {
        router.push("/store");
      }
    } catch (err: any) {
      setGoogleError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-300/40 via-gray-200/10 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-300/50 via-gray-200/10 to-transparent"
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href="/" className="text-3xl font-serif text-[#1d1d1f] tracking-widest">NOVE</Link>
          <p className="text-gray-400 mt-2 font-light">The luxury you deserve.</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[40px] p-10 shadow-[0_8px_60px_rgba(0,0,0,0.08)]"
        >
          {/* Tab Toggle */}
          <div className="flex bg-[#fbfbfd] rounded-2xl p-1 mb-8">
            {(["login", "signup"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setMode(tab);
                  setError("");
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  mode === tab
                    ? "bg-white text-[#1d1d1f] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-red-600 font-medium leading-tight">{error}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "signup" ? -20 : 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {mode === "signup" && (
                <div>
                  <label className="text-sm text-gray-500 font-medium block mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl px-5 py-4 pl-12 text-[#1d1d1f] placeholder:text-gray-300 focus:border-gray-300 focus:outline-none transition-colors"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-500 font-medium block mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl px-5 py-4 pl-12 text-[#1d1d1f] placeholder:text-gray-300 focus:border-gray-300 focus:outline-none transition-colors"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500 font-medium">Password</label>
                  {mode === "login" && (
                    <Link href="#" className="text-xs text-gray-400 hover:text-[#1d1d1f] transition-colors">Forgot password?</Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl px-5 py-4 pl-12 pr-12 text-[#1d1d1f] placeholder:text-gray-300 focus:border-gray-300 focus:outline-none transition-colors"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <Lock size={18} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 bg-[#1d1d1f] text-white py-5 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all mt-2 group disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-sm text-gray-300 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="flex flex-col gap-3">
            {/* Social Login */}
            <button 
              type="button"
              onClick={() => setShowGooglePrompt(true)}
              className="w-full flex items-center justify-center gap-3 bg-[#fbfbfd] border border-gray-100 rounded-2xl py-4 text-[#1d1d1f] font-medium hover:border-gray-200 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button 
              type="button"
              onClick={() => {
                loginAsGuest();
                router.push("/store");
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#1d1d1f] hover:bg-black text-white rounded-2xl py-4 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Browse as Guest
            </button>
          </div>
        </motion.div>

        <p className="text-center text-gray-400 text-sm mt-8">
          By continuing, you agree to NOVE&apos;s{" "}
          <Link href="#" className="underline hover:text-[#1d1d1f] transition-colors">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="underline hover:text-[#1d1d1f] transition-colors">Privacy Policy</Link>.
        </p>
      </div>

      {/* ── GOOGLE SIGN-IN INTERACTIVE MODAL OVERLAY ── */}
      <AnimatePresence>
        {showGooglePrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!googleLoading) setShowGooglePrompt(false); }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-6 md:inset-auto md:w-[480px] bg-white rounded-[32px] shadow-2xl z-[101] flex flex-col overflow-hidden max-h-[90vh] self-center justify-self-center border border-gray-100"
            >
              {/* Google Brand Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-sans text-sm font-semibold tracking-tight text-gray-700">Sign in with Google</span>
                </div>
                <button 
                  onClick={() => setShowGooglePrompt(false)} 
                  disabled={googleLoading}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="text-center">
                  <h3 className="font-serif text-2xl text-[#1d1d1f] tracking-wide mb-2">Welcome to NOVE</h3>
                  <p className="text-sm text-gray-400 font-light">To continue, Google will share your name and email with NOVE.</p>
                </div>

                {googleError && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-semibold leading-relaxed">
                    {googleError}
                  </div>
                )}

                {/* Account Selection */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Choose an Account</p>
                  
                  {/* Heer Thakkar profile */}
                  <button
                    type="button"
                    onClick={() => handleGoogleSignInSubmit("Thakkarheer2707@gmail.com", "Heer Thakkar")}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-2xl hover:bg-white transition-all text-left group disabled:opacity-75 cursor-pointer shadow-sm mb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-600 text-sm">
                        H
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">Heer Thakkar</p>
                        <p className="text-xs text-gray-400">Thakkarheer2707@gmail.com</p>
                      </div>
                    </div>
                    {googleLoading ? <Loader2 size={16} className="animate-spin text-gray-300" /> : <ArrowRight size={16} className="text-gray-300 group-hover:translate-x-1 group-hover:text-black transition-all" />}
                  </button>

                  {/* Nove Admin profile */}
                  <button
                    type="button"
                    onClick={() => handleGoogleSignInSubmit("admin@nove.in", "Nove Admin")}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-2xl hover:bg-white transition-all text-left group disabled:opacity-75 cursor-pointer shadow-sm mb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-sm">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">Nove Admin (Store Owner)</p>
                        <p className="text-xs text-gray-400">admin@nove.in</p>
                      </div>
                    </div>
                    {googleLoading ? <Loader2 size={16} className="animate-spin text-gray-300" /> : <ArrowRight size={16} className="text-gray-300 group-hover:translate-x-1 group-hover:text-black transition-all" />}
                  </button>

                  {/* Primary user account option */}
                  <button
                    type="button"
                    onClick={() => handleGoogleSignInSubmit("hemrajsinh6212@gmail.com", "hemraj")}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-2xl hover:bg-white transition-all text-left group disabled:opacity-75 cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">hemraj</p>
                        <p className="text-xs text-gray-400">hemrajsinh6212@gmail.com</p>
                      </div>
                    </div>
                    {googleLoading ? <Loader2 size={16} className="animate-spin text-gray-300" /> : <ArrowRight size={16} className="text-gray-300 group-hover:translate-x-1 group-hover:text-black transition-all" />}
                  </button>

                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Or use another account</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Manual Account Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Google Email</label>
                      <input
                        type="email"
                        placeholder="your.google@email.com"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        disabled={googleLoading}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-[#1d1d1f] placeholder:text-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={googleName}
                        onChange={(e) => setGoogleName(e.target.value)}
                        disabled={googleLoading}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-[#1d1d1f] placeholder:text-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none transition-all"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (googleEmail.includes("@")) {
                          handleGoogleSignInSubmit(googleEmail, googleName);
                        } else {
                          setGoogleError("Please enter a valid Google email address.");
                        }
                      }}
                      disabled={googleLoading || !googleEmail}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                    >
                      {googleLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign In with Google"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
