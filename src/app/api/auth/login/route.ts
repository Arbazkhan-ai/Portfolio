import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (email === 'arbazjani8@gmail.com' && password === 'Arbazkhan@37447') {
            // In a real app, generate a secure HTTP-only cookie or JWT token
            return NextResponse.json({ success: true, message: 'Authenticated' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
