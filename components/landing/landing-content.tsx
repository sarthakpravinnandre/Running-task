'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Layout, Zap, Shield, CheckCircle2, Star, Box } from 'lucide-react'
import ThreeScene from './three-scene'

const InteractiveCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl bg-slate-900/40 border border-slate-800/60 p-8 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function LandingContent() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <div className="relative min-h-screen text-slate-200 overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* 3D Background */}
      <ThreeScene />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Layout size={24} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">TaskManager</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <Link href="/auth/sign-up" className="bg-white text-slate-900 text-sm font-black px-6 py-2.5 rounded-full hover:bg-slate-200 transition-all shadow-lg">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            Next-Gen Project Management
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            The Future of Work <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              in Full 3D
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Beautifully crafted project management with interactive 3D visualizations. Built for high-performance teams and modern creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/sign-up" className="group w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center gap-3">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto bg-white/5 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl flex items-center justify-center">
              Watch Demo
            </Link>
          </div>
        </motion.div>

        {/* Floating 3D Element Container */}
        <div className="mt-20 w-full max-w-5xl h-64 relative flex items-center justify-center">
           {/* This area is visually enhanced by the ThreeScene background */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Everything you need.</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Premium Power Features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <InteractiveCard>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Ultra Fast</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Experience zero-latency interactions with our optimized Next.js 15 engine. Built for high-speed workflows.
            </p>
          </InteractiveCard>

          <InteractiveCard>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Enterprise Secure</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Bank-grade security with role-based access control and encrypted data storage as standard.
            </p>
          </InteractiveCard>

          <InteractiveCard>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Real-time Sync</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Always stay up to date. Your team sees what you see, exactly when you see it. No refreshes needed.
            </p>
          </InteractiveCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#020617]/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Layout size={18} />
            </div>
            <span className="text-lg font-black text-white tracking-tighter">TaskManager</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            © 2026 TaskManager Platform. Built for the future of work.
          </div>
          <div className="flex gap-6">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Box size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Zap size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
