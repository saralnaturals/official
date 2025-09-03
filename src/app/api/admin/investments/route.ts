import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAllInvestments, getUserById } from '@/lib/database';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const investments = await getAllInvestments();
    
    // Enrich investments with user data
    const enrichedInvestments = await Promise.all(
      investments.map(async (investment) => {
        const user = await getUserById(investment.userId);
        return {
          ...investment,
          userName: user?.name || 'Unknown',
          userEmail: user?.email || 'Unknown',
        };
      })
    );

    return NextResponse.json({
      success: true,
      investments: enrichedInvestments,
    });
  } catch (error) {
    console.error('Get investments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}