'use client';

import { ArrowLeft, Moon, Sun, Monitor, Bell, Shield, Lock, Eye } from 'lucide-react';
import Link from 'next/link';

export default function SystemSettings() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    {/* Appearance */}
                    <Section title="Appearance" icon={<Monitor size={20} className="text-purple-500" />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ThemeOption title="Light" icon={<Sun size={18} />} active />
                            <ThemeOption title="Dark" icon={<Moon size={18} />} />
                            <ThemeOption title="System" icon={<Monitor size={18} />} />
                        </div>
                    </Section>

                    {/* Notifications */}
                    <Section title="Notifications" icon={<Bell size={20} className="text-amber-500" />}>
                        <div className="space-y-4">
                            <ToggleSetting label="Email Notifications for New Messages" enabled />
                            <ToggleSetting label="Push Notifications for Security Alerts" enabled />
                            <ToggleSetting label="Weekly Digest" />
                        </div>
                    </Section>

                    {/* Security */}
                    <Section title="Security & Privacy" icon={<Shield size={20} className="text-green-500" />}>
                        <div className="space-y-4">
                            <ToggleSetting label="Two-Factor Authentication (2FA)" />
                            <ChangePassword />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            </div>
            <div className="pl-8">{children}</div>
        </div>
    );
}

function ThemeOption({ title, icon, active = false }: { title: string, icon: any, active?: boolean }) {
    return (
        <div className={`p-4 rounded-lg border flex flex-col items-center gap-2 cursor-pointer transition-all ${active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            <div className={`p-2 rounded-full ${active ? 'bg-blue-200' : 'bg-white'}`}>{icon}</div>
            <span className="font-medium text-sm">{title}</span>
        </div>
    );
}

function ToggleSetting({ label, enabled = false }: { label: string, enabled?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg cursor-pointer">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${enabled ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
        </div>
    );
}

function ChangePassword() {
    return (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
            <div className="flex items-center gap-3">
                <Lock size={20} className="text-gray-400" />
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                    <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                </div>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:underline">Update</button>
        </div>
    );
}
