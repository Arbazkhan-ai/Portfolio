'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, User, BarChart, ArrowRight, Settings, Bell, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <main className="p-8 min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Header */}
            <header className="flex justify-between items-center mb-10 relative z-10 block">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="section-label mb-3">Control Panel</div>
                    <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">Dashboard <span className="text-gradient-blue">Overview</span></h1>
                    <p className="text-gray-400 flex items-center gap-2">
                        Welcome back, Commander. 
                        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                            <Activity size={12} className="animate-pulse" />
                            System Operational
                        </span>
                    </p>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    <button className="p-3 glass rounded-full text-gray-300 hover:text-[var(--color-text-primary)] hover:bg-black/5 transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse blur-[1px]"></span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-3 glass rounded-full text-gray-300 hover:text-[var(--color-text-primary)] hover:bg-black/5 transition-colors">
                        <Settings size={20} />
                    </button>
                    <div className="h-10 w-px bg-black/10 mx-2"></div>
                    <div className="flex items-center gap-3 glass pl-2 pr-4 py-2 rounded-full border border-black/5 cursor-pointer hover:bg-black/5 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[var(--color-text-primary)] font-bold shadow-[0_0_15px_rgba(79,141,255,0.4)]">AK</div>
                        <div className="hidden md:block text-sm">
                            <div className="font-semibold text-[var(--color-text-primary)]">Arbaz Khan</div>
                            <div className="text-xs text-blue-400">Admin</div>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
                <StatCard title="Total Views" value="12,450" change="+12%" icon={<Activity size={20} />} delay={0.1} />
                <StatCard title="Project Clicks" value="843" change="+5.4%" icon={<LayoutDashboard size={20} />} delay={0.2} />
                <StatCard title="Contact Requests" value="28" change="+2 new" highlight icon={<User size={20} />} delay={0.3} />
            </div>

            {/* Content Management Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-8 relative z-10"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Manage Content</h2>
                        <p className="text-gray-400 text-sm mt-1">Select a module to edit your portfolio components.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard 
                        href="/admin/dashboard/hero" 
                        icon={<LayoutDashboard size={28} />} 
                        title="Hero Section" 
                        description="Edit headline, subtext, and CTAs." 
                        color="blue" 
                    />
                    <DashboardCard 
                        href="/admin/dashboard/profile" 
                        icon={<User size={28} />} 
                        title="Profile & Bio" 
                        description="Manage personal details and links." 
                        color="purple" 
                    />
                    <DashboardCard 
                        href="/admin/dashboard/projects" 
                        icon={<BarChart size={28} />} 
                        title="Projects" 
                        description="Add, edit, or remove portfolio items." 
                        color="pink" 
                    />
                </div>
            </motion.div>
        </main>
    );
}

function StatCard({ title, value, change, highlight = false, icon, delay }: { title: string, value: string, change: string, highlight?: boolean, icon: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-2xl glass-card card-hover-glow relative overflow-hidden group ${
                highlight ? 'border-blue-500/30 card-glow-blue' : 'border-black/5'
            }`}
        >
            {highlight && (
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
            )}
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl inline-flex ${highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-black/5 text-gray-400 group-hover:text-[var(--color-text-primary)] group-hover:bg-black/10 transition-colors'}`}>
                    {icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    highlight 
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/20' 
                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                    {change}
                </span>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
                <div className={`text-4xl font-bold font-display tracking-tight ${highlight ? 'text-[var(--color-text-primary)]' : 'text-gray-100'}`}>
                    {value}
                </div>
            </div>
        </motion.div>
    );
}

function DashboardCard({ href, icon, title, description, color }: { href: string, icon: React.ReactNode, title: string, description: string, color: 'blue' | 'purple' | 'pink' }) {
    const colorMap = {
        blue: 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-[var(--color-text-primary)] border-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        purple: 'text-purple-400 bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-[var(--color-text-primary)] border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        pink: 'text-pink-400 bg-pink-500/10 group-hover:bg-pink-500 group-hover:text-[var(--color-text-primary)] border-pink-500/20 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.4)]'
    };
    
    return (
        <Link href={href}>
            <motion.div 
                whileHover={{ y: -5 }}
                className={`group p-6 glass-card rounded-xl border border-black/5 hover:border-black/10 transition-all flex flex-col items-start gap-5 h-full relative overflow-hidden`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`p-4 rounded-xl transition-all duration-300 border ${colorMap[color]}`}>
                    {icon}
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-[var(--color-text-primary)] transition-colors mb-2 flex items-center justify-between">
                        {title}
                        <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--color-text-primary)]" />
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}

