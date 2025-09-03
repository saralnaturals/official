import clientPromise from '../lib/mongodb';
import { hashPassword } from '../lib/auth';

async function initializeAdmin() {
  try {
    const client = await clientPromise;
    const db = client.db('saral_naturals');

    // Check if admin already exists
    const existingAdmin = await db.collection('users').findOne({ 
      email: 'products.saralnaturals@gmail.com' 
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword('Test@123');
    
    const adminUser = {
      email: 'products.saralnaturals@gmail.com',
      password: hashedPassword,
      name: 'Saral Naturals Admin',
      role: 'admin',
      investments: [],
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('users').insertOne(adminUser);
    console.log('Admin user created successfully');
    console.log('Email: products.saralnaturals@gmail.com');
    console.log('Password: Test@123');

  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// Run if called directly
if (require.main === module) {
  initializeAdmin().then(() => process.exit(0));
}

export { initializeAdmin };