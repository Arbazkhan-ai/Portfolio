'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Inbox, Search, Mail, User, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
    read: boolean;
}

export default function MessagesDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('/api/contact', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                // Sort by date desc
                const sorted = Array.isArray(data) ? data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
                setMessages(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load messages", err);
                setLoading(false);
            });
    }, []);

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar / List View */}
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 sticky top-0 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Inbox</h1>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold">
                        {messages.length}
                    </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search emails..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-400 text-sm">Loading messages...</div>
                    ) : (
                        <div className="space-y-2">
                            {filteredMessages.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 text-sm">No messages found</div>
                            ) : (
                                filteredMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        onClick={() => setSelectedMessage(msg)}
                                        className={`p-4 rounded-xl border cursor-pointer hover:border-blue-300 transition-all text-left group ${selectedMessage?.id === msg.id
                                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                                : 'bg-white border-transparent hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm font-bold truncate pr-2 ${selectedMessage?.id === msg.id ? 'text-blue-700' : 'text-gray-900'}`}>
                                                {msg.name}
                                            </span>
                                            <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{formatDate(msg.date).split(',')[0]}</span>
                                        </div>
                                        <h4 className="text-xs font-medium text-gray-500 mb-1 truncate">
                                            {msg.email}
                                        </h4>
                                        <p className="text-xs text-gray-400 line-clamp-2">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </aside>

            {/* Message Detail View */}
            <main className="flex-1 flex flex-col h-screen bg-gray-50 overflow-y-auto p-8">
                {selectedMessage ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {selectedMessage.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.name}</h2>
                                    <div className="flex items-center gap-4 mt-1 text-gray-500 text-sm">
                                        <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                                            <Mail size={14} />
                                            {selectedMessage.email}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} />
                                            {formatDate(selectedMessage.date)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={async () => {
                                    if(confirm('Are you sure you want to delete this message?')) {
                                        try {
                                            const res = await fetch('/api/contact', {
                                                method: 'DELETE',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ id: selectedMessage.id })
                                            });
                                            if (res.ok) {
                                                setMessages(messages.filter(m => m.id !== selectedMessage.id));
                                                setSelectedMessage(null);
                                            }
                                        } catch (err) {
                                            console.error('Failed to delete message', err);
                                        }
                                    }
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1">
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                {selectedMessage.message}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                            <a href={`mailto:${selectedMessage.email}`} className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                Reply via Email
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Inbox size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-400">No Message Selected</h3>
                        <p className="text-sm text-gray-400 mt-2">Select a conversation from the list to view details.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
