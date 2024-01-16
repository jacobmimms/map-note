import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(request) {
    const { filename } = await request.json()
    try {
        const client = new S3Client({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,

        })

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
        })

        const url = await getSignedUrl(client, command, { expiresIn: 3600 })
        const response = await client.send(command);
        // Assuming response.Body contains the image data
        if (response && response.Body) {
            const image = response.Body.toString('base64');
            return Response.json({ url, image })

        } else {
            return Response.json({ error: "No image found" })
        }
        //return Response.json()
    } catch (error) {
        console.error("Error in get", error)
        return Response.json({ error: error.message })
    }
}