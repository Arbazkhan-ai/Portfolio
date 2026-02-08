'use client';

import { ArrowLeft, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

const notifications = [
    { id: 1, type: 'alert', title: "Security Alert", message: "New login detected from unknown device (India, Bangalore).", time: "2 hours ago" },
    { id: 2, type: 'success', title: "Deployment Successful", message: "Project \"Quantum NN\" was successfully deployed to production.", time: "4 hours ago" },
    { id: 3, type: 'info', title: "System Maintenance", message: "Scheduled maintenance window starts at 02:00 UTC.", time: "Yesterday" },
    { id: 4, type: 'success', title: "Message Received", message: "You have a new message from OpenAI Recruitment.", time: "Yesterday" },
];

export default function NotificationsDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    </div>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Mark all as read</button>
                </div>

                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div key={notif.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-all cursor-pointer">
                            <div className={`p-2 rounded-lg shrink-0 ${notif.type === 'alert' ? 'bg-red-50 text-red-500' :
                                    notif.type === 'success' ? 'bg-green-50 text-green-500' :
                                        'bg-blue-50 text-blue-500'
                                }`}>
                                {notif.type === 'alert' ? <AlertTriangle size={20} /> :
                                    notif.type === 'success' ? <CheckCircle size={20} /> :
                                        <Info size={20} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900">{notif.title}</h3>
                                    <span className="text-xs text-gray-400">{notif.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
