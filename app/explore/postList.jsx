"use client";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";
import { useMapContext } from "@/app/providers/mapProvider";
import PostCard from "@/app/components/postCard";
import { useState, useEffect } from "react";
import TagInput from "@/app/components/tagInput";

function Post({ post }) {
  const { mapRef } = useMapContext();

  function locatePost(latitude, longitude) {
    mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
  }

  return (
    <div className="flex">
      <PostCard key={post.id} post={post} size={`h-[60px] w-[60px]`} />
      <p>{post.content}</p>
      <button
        onClick={() => locatePost(post.latitude, post.longitude)}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Locate
      </button>
    </div>
  );
}

export default function PostList() {
  const { posts } = useLocationAndPosts();
  const [tags, setTags] = useState({});
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    let searchTags = Object.keys(tags).filter((tag) => tags[tag]);
    console.log(searchTags);
    if (searchTags.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    let newPosts = posts.filter((post) => {
      console.log(post);
      let postTags = post.tags;
      if (!postTags || postTags.length === 0) {
        return false;
      }
      let postTagNames = postTags.map((tag) => tag.name);
      let foundTags = postTagNames.filter((tag) => searchTags.includes(tag));
      return foundTags.length > 0;
    });
    setFilteredPosts(newPosts);
  }, [tags, posts]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-stone-200 rounded-md shadow-black shadow-inner">
      <TagInput
        className={`w-full`}
        tags={tags}
        setTags={setTags}
        placeholder={"Search with tags!"}
        triggerErrorMessage={(error) => console.error(error)}
      />
      <ul className="w-full overflow-y-scroll">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
