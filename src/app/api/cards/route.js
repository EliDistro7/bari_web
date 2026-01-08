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

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, data } = body;
    
    if (!id || !data) {
      return NextResponse.json(
        { error: 'Missing id or data' },
        { status: 400 }
      );
    }

    // Validate data structure
    if (typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Data must be an object' },
        { status: 400 }
      );
    }

    // Get Redis client
    const client = await getRedisClient();

    // Save to Redis with 1 year expiration (31536000 seconds)
    await client.setEx(`card:${id}`, 31536000, JSON.stringify(data));
    
    return NextResponse.json({ 
      success: true, 
      id,
      url: `/c/${id}` 
    });
    
  } catch (error) {
    console.error('Error saving card:', error.message);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to save card',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
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