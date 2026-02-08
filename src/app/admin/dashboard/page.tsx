'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, User, BarChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <main className="p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Arbaz. System status: <span className="text-green-500 font-medium">Operational</span></p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AK</div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Views" value="12,450" change="+12%" />
                <StatCard title="Project Clicks" value="843" change="+5.4%" />
                <StatCard title="Contact Requests" value="28" change="+2 new" highlight />
            </div>

            {/* Content Management Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Manage Content</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/dashboard/hero" className="group p-6 border border-gray-100 rounded-xl hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-start gap-4 bg-gray-50 hover:bg-white text-left">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Hero Section</h3>
                            <p className="text-sm text-gray-500 mt-1">Edit headline, subtext, and CTAs.</p>
                        </div>
                    </Link>

                    <Link href="/admin/dashboard/profile" className="group p-6 border border-gray-100 rounded-xl hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-start gap-4 bg-gray-50 hover:bg-white text-left">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Profile & Bio</h3>
                            <p className="text-sm text-gray-500 mt-1">Manage personal details and links.</p>
                        </div>
                    </Link>

                    <Link href="/admin/dashboard/projects" className="group p-6 border border-gray-100 rounded-xl hover:border-green-500 hover:shadow-md transition-all flex flex-col items-start gap-4 bg-gray-50 hover:bg-white text-left">
                        <div className="bg-green-100 text-green-600 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <BarChart size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">Projects</h3>
                            <p className="text-sm text-gray-500 mt-1">Add, edit, or remove portfolio items.</p>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}

function StatCard({ title, value, change, highlight = false }: { title: string, value: string, change: string, highlight?: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl border ${highlight ? 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20' : 'bg-white border-gray-100 shadow-sm'}`}
        >
            <h3 className={`text-sm font-medium ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>{title}</h3>
            <div className="mt-4 flex items-end justify-between">
                <span className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${highlight ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
                    {change}
                </span>
            </div>
        </motion.div>
    );
}

