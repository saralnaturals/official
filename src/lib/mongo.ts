// Minimal Mongo helper for Next.js API routes
import { MongoClient } from 'mongodb';
// Use provided application code by default. Replace with env var in production.
const uri = process.env.MONGO_API_KEY || '';

const cached: { client: MongoClient | null } = { client: null };

export async function getMongoClient() {
  if (cached.client) return cached.client;
  const client = new MongoClient(uri);
  await client.connect();
  cached.client = client;
  return client;
}
