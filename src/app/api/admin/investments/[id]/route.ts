import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateInvestment } from '@/lib/database';
import { z } from 'zod';

const UpdateInvestmentSchema = z.object({
  profitShare: z.number().min(0).max(100).optional(),
  status: z.enum(['active', 'completed', 'cancelled']).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const updates = UpdateInvestmentSchema.parse(body);

    const success = await updateInvestment(params.id, updates);
    if (!success) {
      return NextResponse.json(
        { error: 'Investment not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update investment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}