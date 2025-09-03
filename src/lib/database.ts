import clientPromise from './mongodb';
import { User, Investment, OTPVerification } from './models/User';
import { ObjectId } from 'mongodb';

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const user = await db.collection('users').findOne({ email });
  return user as User | null;
}

export async function getUserById(id: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
  return user as User | null;
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.collection('users').insertOne(user);
  return { ...user, _id: result.insertedId.toString() } as User;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const result = await db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...updates, 
        updatedAt: new Date() 
      } 
    }
  );
  
  return result.modifiedCount > 0;
}

export async function deleteUser(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function getAllUsers(): Promise<User[]> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const users = await db.collection('users').find({}).toArray();
  return users.map(user => ({ ...user, _id: user._id.toString() })) as User[];
}

export async function createInvestment(investmentData: Omit<Investment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Investment> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const investment = {
    ...investmentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.collection('investments').insertOne(investment);
  return { ...investment, _id: result.insertedId.toString() } as Investment;
}

export async function getUserInvestments(userId: string): Promise<Investment[]> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const investments = await db.collection('investments').find({ userId }).toArray();
  return investments.map(inv => ({ ...inv, _id: inv._id.toString() })) as Investment[];
}

export async function updateInvestment(id: string, updates: Partial<Investment>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const result = await db.collection('investments').updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...updates, 
        updatedAt: new Date() 
      } 
    }
  );
  
  return result.modifiedCount > 0;
}

export async function getAllInvestments(): Promise<Investment[]> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const investments = await db.collection('investments').find({}).toArray();
  return investments.map(inv => ({ ...inv, _id: inv._id.toString() })) as Investment[];
}

export async function createOTPVerification(otpData: Omit<OTPVerification, '_id' | 'createdAt'>): Promise<OTPVerification> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const otp = {
    ...otpData,
    createdAt: new Date(),
  };
  
  const result = await db.collection('otp_verifications').insertOne(otp);
  return { ...otp, _id: result.insertedId.toString() } as OTPVerification;
}

export async function getOTPVerification(email: string, otp: string, type: string): Promise<OTPVerification | null> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  const otpRecord = await db.collection('otp_verifications').findOne({ 
    email, 
    otp, 
    type,
    verified: false,
    expiresAt: { $gt: new Date() }
  });
  return otpRecord as OTPVerification | null;
}

export async function markOTPAsVerified(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('saral_naturals');
  
  const result = await db.collection('otp_verifications').updateOne(
    { _id: new ObjectId(id) },
    { $set: { verified: true } }
  );
  
  return result.modifiedCount > 0;
}