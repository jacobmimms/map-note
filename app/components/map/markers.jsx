import { encodeS3Key, BUCKET_URL } from "@/app/utils/main";
import PopupMarker from "./popupMarker";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";

export default function Markers() {
  const { posts } = useLocationAndPosts();
  if (posts.length === 0) {
    return null;
  }

  return (
    <>
      {posts.map((post) => {
        if (!post.latitude || !post.longitude) return null;
        return (
          <PopupMarker
            key={post.id}
            id={post.id}
            position={[post.latitude, post.longitude]}
            imageSrc={`${BUCKET_URL}${encodeS3Key(post.title)}`}
            content={post.content}
            link={`post/${encodeS3Key(post.title)}`}
            linkText="View Post"
          />
        );
      })}
    </>
  );
}
