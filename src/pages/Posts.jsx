import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const getPosts = () => {
      fetch("https://codebuddy.review/posts")
        .then((response) => response.json())
        .then((result) => setPosts(result.data));
    };

    getPosts();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="space-y-4 rounded-lg bg-white p-7 shadow-lg">
            <div className="flex items-center gap-2">
              <img src={post.avatar} className="size-10 rounded-full"></img>
              <h2 className="text-2xl font-bold">
                {post.firstName} {post.lastName}
              </h2>
            </div>
            <img src={post.image}></img>
            <p className="text-gray-700">{post.writeup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
