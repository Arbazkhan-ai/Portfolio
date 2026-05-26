'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Link as LinkIcon, Briefcase, Loader2, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ProfileSettings() {
    const [data, setData] = useState({
        name: "",
        title: "",
        bio: "",
        github: "",
        linkedin: "",
        website: "",
        avatar: "/profilee.png"
    });
    const [originalAvatar, setOriginalAvatar] = useState("/profilee.png");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch('/api/content/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch profile", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            alert("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                setData(prev => ({ ...prev, avatar: result.path }));
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            alert("Upload error");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-[var(--color-accent-blue)] text-[var(--color-text-primary)] rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    {/* Cover & Avatar */}
                    <div className="h-40 bg-blue-50 rounded-lg relative mb-12">
                        <div className="absolute -bottom-10 left-8 flex items-end">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-100 overflow-hidden relative group">
                                <img src={data.avatar || "/profilee.png"} alt="Profile" className="w-full h-full object-cover" />

                                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                                    {uploading ? <Loader2 className="animate-spin text-[var(--color-text-primary)]" size={20} /> : <span className="text-xs text-[var(--color-text-primary)] font-medium">Change</span>}
                                </label>
                            </div>
                            <div className="ml-4 mb-2">
                                <h2 className="text-xl font-bold text-gray-900">{data.name || "Your Name"}</h2>
                                <p className="text-sm text-gray-500">{data.title || "Your Title"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Briefcase size={18} className="text-blue-500" />
                                Professional Details
                            </h3>
                            <div className="h-px bg-gray-100 w-full mb-6" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                rows={4}
                                name="bio"
                                value={data.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <LinkIcon size={18} className="text-blue-500" />
                                Social Links
                            </h3>
                            <div className="h-px bg-gray-100 w-full mb-6" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                            <input
                                type="url"
                                name="github"
                                value={data.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={data.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                            <input
                                type="url"
                                name="website"
                                value={data.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
