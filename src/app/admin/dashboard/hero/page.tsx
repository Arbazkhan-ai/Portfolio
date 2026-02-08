'use client';

import { useState, useEffect } from 'react';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeroEditor() {
    const [data, setData] = useState({
        role: "",
        headlineHighlight: "",
        headlineMain: "",
        subheadlineStart: "",
        subheadlineHighlight1: "",
        subheadlineHighlight2: "",
        ctaProject: "",
        ctaContact: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/content/hero')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setMessage("Changes saved successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Failed to save changes.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading editor...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Hero Section</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-[var(--color-accent-blue)] text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Role Label" name="role" value={data.role} onChange={handleChange} />
                        <InputField label="Headline Start" name="headlineHighlight" value={data.headlineHighlight} onChange={handleChange} />
                        <InputField label="Headline Main" name="headlineMain" value={data.headlineMain} onChange={handleChange} />
                        <InputField label="Subheadline Start" name="subheadlineStart" value={data.subheadlineStart} onChange={handleChange} />
                        <InputField label="Subheadline Highlight 1" name="subheadlineHighlight1" value={data.subheadlineHighlight1} onChange={handleChange} />
                        <InputField label="Subheadline Highlight 2" name="subheadlineHighlight2" value={data.subheadlineHighlight2} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                        <InputField label="CTA Project Button" name="ctaProject" value={data.ctaProject} onChange={handleChange} />
                        <InputField label="CTA Contact Button" name="ctaContact" value={data.ctaContact} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
        </div>
    );
}
