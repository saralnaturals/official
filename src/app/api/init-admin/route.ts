import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/database';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await getUserByEmail('products.saralnaturals@gmail.com');
    if (existingAdmin) {
      return NextResponse.json({ 
        success: true, 
        message: 'Admin user already exists' 
      });
    }

    // Create admin user
    const hashedPassword = await hashPassword('Test@123');
    
    await createUser({
      email: 'products.saralnaturals@gmail.com',
      password: hashedPassword,
      name: 'Saral Naturals Admin',
      role: 'admin',
      investments: [],
      isEmailVerified: true,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created successfully',
      credentials: {
        email: 'products.saralnaturals@gmail.com',
        password: 'Test@123'
      }
    });
  } catch (error) {
    console.error('Error initializing admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}