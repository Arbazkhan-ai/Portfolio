'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Home, Settings, User, BarChart, Bell, LayoutDashboard, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/contact');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMessageCount(data.length);
                }
            } catch (error) {
                console.error("Failed to fetch message count");
            }
        };

        fetchMessages();
        // Poll every 30 seconds for new messages
        const interval = setInterval(fetchMessages, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 sticky top-0 h-screen shrink-0">
            <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue)] flex items-center justify-center text-white font-bold text-lg">A</div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Admin<span className="text-[var(--color-accent-blue)]">Panel</span></span>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === '/admin/dashboard'} />
                <NavItem href="/admin/dashboard/projects" icon={<Home size={20} />} label="Projects" active={pathname?.startsWith('/admin/dashboard/projects')} />
                <NavItem href="/admin/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" active={pathname === '/admin/dashboard/messages'} badge={messageCount > 0 ? messageCount : undefined} />
                <NavItem href="/admin/dashboard/analytics" icon={<BarChart size={20} />} label="Analytics" active={pathname === '/admin/dashboard/analytics'} />
                <NavItem href="/admin/dashboard/notifications" icon={<Bell size={20} />} label="Notifications" active={pathname === '/admin/dashboard/notifications'} />
                <NavItem href="/admin/dashboard/profile" icon={<User size={20} />} label="Profile Settings" active={pathname === '/admin/dashboard/profile'} />
                <NavItem href="/admin/dashboard/settings" icon={<Settings size={20} />} label="System Config" active={pathname === '/admin/dashboard/settings'} />
            </nav>

            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

function NavItem({ href, icon, label, active = false, badge }: { href: string, icon: any, label: string, active?: boolean, badge?: number }) {
    return (
        <Link href={href} className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-[var(--color-accent-blue)] font-medium shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {badge}
                </span>
            )}
        </Link>
    );
}
