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
                const res = await fetch('/api/contact', { cache: 'no-store' });
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
        <aside className="w-64 glass-card border-r border-white/5 hidden md:flex flex-col p-6 sticky top-0 h-screen shrink-0 relative overflow-hidden z-20">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-10 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(79,141,255,0.4)]">A</div>
                <span className="text-xl font-bold text-white tracking-tight font-display">Admin<span className="text-gradient-blue">Panel</span></span>
            </div>

            <nav className="flex-1 space-y-2 relative z-10 w-full">
                <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === '/admin/dashboard'} />
                <NavItem href="/admin/dashboard/projects" icon={<Home size={20} />} label="Projects" active={pathname?.startsWith('/admin/dashboard/projects')} />
                <NavItem href="/admin/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" active={pathname === '/admin/dashboard/messages'} badge={messageCount > 0 ? messageCount : undefined} />
                <NavItem href="/admin/dashboard/analytics" icon={<BarChart size={20} />} label="Analytics" active={pathname === '/admin/dashboard/analytics'} />
                <NavItem href="/admin/dashboard/notifications" icon={<Bell size={20} />} label="Notifications" active={pathname === '/admin/dashboard/notifications'} />
                <NavItem href="/admin/dashboard/profile" icon={<User size={20} />} label="Profile Settings" active={pathname === '/admin/dashboard/profile'} />
                <NavItem href="/admin/dashboard/settings" icon={<Settings size={20} />} label="System Config" active={pathname === '/admin/dashboard/settings'} />
            </nav>

            <div className="pt-6 border-t border-white/10 relative z-10 w-full">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors text-sm font-medium border border-transparent hover:border-red-500/30"
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
        <Link href={href} className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all border ${active ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(79,141,255,0.1)] font-medium' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200 hover:border-white/10'}`}>
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && (
                <span className="bg-red-500/80 border border-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                    {badge}
                </span>
            )}
        </Link>
    );
}
