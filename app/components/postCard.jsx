import { encodeS3Key, BUCKET_URL } from "@/app/utils/main";
import Image from "next/image";
import Link from "next/link";
export default function PostCard({ post, size, ...props }) {
  return (
    <div className={`hover:brightness-110 relative rounded-lg ${size}`}>
      <Link className="" href={`/post/${post.title}`}>
        <Image
          fill
          className="object-cover rounded-md"
          src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
          alt={`${post.content ? post.content : "Post"}`}
        />
      </Link>
    </div>
  );
}
