export function encodeS3Key(key) {
    try {
        const encodedKey = encodeURIComponent(key).replace(/%20/g, '+');
        return encodedKey;
    } catch (error) {
        console.error('Error encoding S3 key:', error);
        return null;
    }
}

export function decodeS3Key(key) {
    try {
        const decodedKey = decodeURIComponent(key).replace(/\+/g, ' ');
        return decodedKey;
    } catch (error) {
        console.error('Error decoding S3 key:', error);
        return null;
    }
}

export function calculateDistance(p1, p2) {
    // return infinity if either point is null
    if (!p1 || !p2) return Infinity;
    const { latitude: lat1, longitude: lon1 } = p1;
    const { latitude: lat2, longitude: lon2 } = p2;

    // calculates distance between two lat/lon pairs in meters
    const R = 6371e3; // Earth radius in meters
    const rad = Math.PI / 180;
    const deltaLat = (lat2 - lat1) * rad;
    const deltaLon = (lon2 - lon1) * rad;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

export async function getNearbyPosts({latitude, longitude}) {
    let posts = [];
    try {
        posts = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ nearby: true, latitude, longitude }),
        });
        posts = await posts.json();
    } catch (error) {
        console.error('fetching posts failed', error);
        posts = [];
    }
    return posts;
}

export const BUCKET_URL = 'https://mimms-pictures.s3.amazonaws.com/'