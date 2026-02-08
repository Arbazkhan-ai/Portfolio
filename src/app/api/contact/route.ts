import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/messages.json');

const getMessages = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch {
        return [];
    }
};

export async function GET() {
    try {
        const messages = getMessages();
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();
        const messages = getMessages();

        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toISOString(),
            read: false
        };

        const updatedMessages = [newMessage, ...messages];

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedMessages, null, 4));

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
