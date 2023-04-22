import { createClient } from 'redis';

const redisURI = process.env.REDIS_URI;

console.warn(redisURI);

const client = createClient({ url: redisURI });

export async function connectRedis() {
    try {
		await client.connect();

		console.log('Redis - Connected successfully');
	} catch (e: unknown) {
		console.log('Redis - No connected');
		throw e;
	}
}

export { client };