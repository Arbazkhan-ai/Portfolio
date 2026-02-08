import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

// Helper to ensure data file exists
const dataFilePath = path.join(process.cwd(), 'src/data/projects.json');
const getProjects = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const projects = getProjects();

        const updatedProjects = projects.filter((p: any) => p.id !== id);

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedProjects, null, 4));

        return NextResponse.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const updatedProject = await request.json();
        const projects = getProjects();

        const updatedProjects = projects.map((p: any) => p.id === id ? { ...p, ...updatedProject } : p);

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedProjects, null, 4));

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}
