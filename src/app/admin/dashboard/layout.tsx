'use client';

import { Sidebar } from '@/components/admin/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] flex font-sans text-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-screen overflow-y-auto relative z-10">
                <div className="grid-bg"></div>
                <div className="noise-overlay"></div>
                {children}
            </div>
        </div>
    );
}
