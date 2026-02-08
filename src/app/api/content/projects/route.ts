import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

// Helper to ensure data file exists
const dataFilePath = path.join(process.cwd(), 'src/data/projects.json');
const getProjects = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
};

export async function GET() {
    try {
        const projects = getProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProject = await request.json();
        const projects = getProjects();

        // Generate new ID
        const maxId = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) : 0;
        const projectWithId = { ...newProject, id: maxId + 1 };

        const updatedProjects = [...projects, projectWithId];

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedProjects, null, 4));

        return NextResponse.json({ success: true, project: projectWithId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}
