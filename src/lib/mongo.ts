// Minimal Mongo helper for Next.js API routes
import { MongoClient } from 'mongodb';

// Use provided application code by default. Replace with env var in production.
const FALLBACK_URI = "mongodb+srv://saralnaturals68_db_user:<db_password>@cluster0.0pk9uwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGODB_URI || FALLBACK_URI;

const cached: { client: MongoClient | null } = { client: null };

export async function getMongoClient() {
  if (cached.client) return cached.client;
  const client = new MongoClient(uri);
  await client.connect();
  cached.client = client;
  return client;
}
