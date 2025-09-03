import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserInvestments } from '@/lib/database';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const investments = await getUserInvestments(session.userId);
    
    return NextResponse.json({
      success: true,
      investments,
    });
  } catch (error) {
    console.error('Get user investments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}