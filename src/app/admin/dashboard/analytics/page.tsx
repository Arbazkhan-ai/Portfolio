'use client';

import { ArrowLeft, BarChart, TrendingUp, Users, Eye, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Traffic Analytics</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Visits" value="124,592" change="+12.5%" icon={<Eye size={20} className="text-blue-500" />} />
                    <StatCard title="Unique Visitors" value="84,231" change="+8.1%" icon={<Users size={20} className="text-purple-500" />} />
                    <StatCard title="Avg. Duration" value="2m 45s" change="-1.2%" icon={<Clock size={20} className="text-orange-500" />} />
                    <StatCard title="Bounce Rate" value="42.3%" change="+0.4%" icon={<TrendingUp size={20} className="text-green-500" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Placeholder */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 h-96 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Visits Over Time</h2>
                            <select className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-1 outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-end justify-between px-4 pb-0 opacity-20">
                                {[...Array(10)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: '10%' }}
                                        animate={{ height: `${Math.random() * 80 + 10}%` }}
                                        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                                        className="w-8 bg-blue-500 rounded-t-lg"
                                    />
                                ))}
                            </div>
                            <span className="z-10 font-mono text-sm">Interactive Chart Component Placeholder</span>
                        </div>
                    </div>

                    {/* Top Sources */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Globe size={18} className="text-blue-500" />
                            Top Sources
                        </h2>
                        <div className="space-y-4">
                            <SourceItem name="Google Search" value="45%" color="bg-blue-500" />
                            <SourceItem name="Direct" value="28%" color="bg-purple-500" />
                            <SourceItem name="LinkedIn" value="15%" color="bg-blue-700" />
                            <SourceItem name="Twitter / X" value="8%" color="bg-black" />
                            <SourceItem name="Other" value="4%" color="bg-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon }: any) {
    const isPositive = change.startsWith('+');
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {change}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}

function SourceItem({ name, value, color }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="flex-1 text-sm font-medium text-gray-700">{name}</span>
            <span className="text-sm font-bold text-gray-900">{value}</span>
        </div>
    );
}


