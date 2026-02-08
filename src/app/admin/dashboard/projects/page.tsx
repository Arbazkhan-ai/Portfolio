'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Plus, Trash2, Edit2, Link as LinkIcon, Image as ImageIcon, X, Loader2, Upload } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsDashboard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>(null); // For editing

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        image: "",
        link: ""
    });
    const [uploading, setUploading] = useState(false);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/content/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle Delete
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`/api/content/projects/${id}`, { method: 'DELETE' });
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            alert("Failed to delete project");
        }
    };

    // Handle Submit (Add/Edit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentProject ? 'PUT' : 'POST';
            const url = currentProject ? `/api/content/projects/${currentProject.id}` : '/api/content/projects';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchProjects();
                closeModal();
            } else {
                alert("Failed to save project");
            }
        } catch (error) {
            alert("Error saving project");
        }
    };

    // Handle File Upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, image: result.path }));
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            alert("Upload error");
        } finally {
            setUploading(false);
        }
    };

    const openModal = (project?: any) => {
        if (project) {
            setCurrentProject(project);
            setFormData({
                title: project.title,
                category: project.category,
                description: project.description,
                image: project.image,
                link: project.link
            });
        } else {
            setCurrentProject(null);
            setFormData({ title: "", category: "", description: "", image: "", link: "" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const filteredProjects = projects.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="px-6 py-2 bg-[var(--color-accent-blue)] text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={18} />
                        New Project
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                    />
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                    </div>
                ) : (
                    /* Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                            >
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                            <ImageIcon size={40} />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 p-1 rounded-lg backdrop-blur-sm">
                                        <button onClick={() => openModal(project)} className="p-2 bg-white rounded-lg text-blue-600 hover:text-blue-700 shadow-sm transition-transform hover:scale-105">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 bg-white rounded-lg text-red-600 hover:text-red-700 shadow-sm transition-transform hover:scale-105"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit mb-2 uppercase tracking-wide">
                                        {project.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">{project.description}</p>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-gray-400 flex items-center gap-1 hover:text-blue-600 transition-colors mt-auto"
                                    >
                                        <LinkIcon size={14} />
                                        Visit Link
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No projects found. Create one to get started!
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">{currentProject ? 'Edit Project' : 'New Project'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        required
                                        placeholder="e.g. AI, Web, Mobile"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                                            {formData.image ? (
                                                <img src={formData.image} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={24} /></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="file-upload"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                                            >
                                                {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                                                {uploading ? 'Uploading...' : 'Upload Image'}
                                            </label>
                                            <p className="text-xs text-gray-400 mt-2">Recommended: 1200x800px (JPG, PNG)</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={closeModal} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[var(--color-accent-blue)] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        {currentProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
