import { createClient } from 'redis';
import { NextResponse } from 'next/server';

let redis = null;

// Initialize Redis client once
async function getRedisClient() {
  if (redis) {
    return redis;
  }

  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not set');
  }

  redis = await createClient({ url: process.env.REDIS_URL }).connect();
  return redis;
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing card ID' },
        { status: 400 }
      );
    }

    // Get Redis client
    const client = await getRedisClient();

    // Retrieve from Redis
    const data = await client.get(`card:${id}`);
    
    if (!data) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    // Parse if it's a string
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    
    return NextResponse.json(parsedData);
    
  } catch (error) {
    console.error('Error retrieving card:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve card' },
      { status: 500 }
    );
  }
}

// Cleanup on shutdown (optional but recommended)
process.on('SIGTERM', async () => {
  if (redis) {
    await redis.quit();
  }
});