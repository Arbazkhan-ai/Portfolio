import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        await fs.promises.writeFile(
            path.join(uploadDir, filename),
            buffer
        );

        return NextResponse.json({
            success: true,
            filename,
            path: `/uploads/${filename}`
        });

    } catch (error) {
        console.log("Error occurred ", error);
        return NextResponse.json({ message: "Failed", status: 500 });
    }
}
