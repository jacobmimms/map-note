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

export const BUCKET_URL = 'https://mimms-pictures.s3.amazonaws.com/'